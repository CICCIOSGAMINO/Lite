import { LitElement, html, css } from 'lit'
import { Router } from '@vaadin/router'

import { PendingContainer } from './components/pending-container'
import { sharedStyles } from './styles/shared-styles.js'
import './views/home-view'

class AppLite extends PendingContainer(LitElement) {
  static get styles () {
    return [
      sharedStyles,
      css`
        :host {
          /* set the sidenav animations vars open / close aside */
          --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1);
          --duration: .6s;
          /* header height */
          --header-height: 4rem;
          
          min-height: 100vh;
          display: grid;
          /* handle the aside, content with grid stack layout, 
            one row [stack] / two columns (desktop version) */
          grid: [stack] 1fr / min-content [stack] 1fr;
        }

        #sidenav-open {
          display: grid;
          /* grid template with two columns, one for the nav and the other 
            for the a link (#sidenav-close) that handle the remain space, aside
            wll be composed of two part: nav (menu with items) and the a link
            #sidenav-close for close the aside when click on that part */
          grid-template-columns: [nav] 3fr [escape] 1fr;
        }

        #sidenav-button, #sidenav-close {
          user-select: none;
          touch-action: manipulation;
        }

        /* mobile width 640px */
        @media (max-width: 640px) {
          aside, main {
            grid-area: stack;
          }

          #sidenav-open {
            position: sticky;
            top: 0;
            max-height: 100vh;
            overflow: hidden auto;
            overscroll-behavior: contain;
            visibility: hidden; /* not keyboard accessible when closed */
            will-change: transform;
            transform: translateX(-110vw);
            transition:
              transform var(--duration) var(--easeOutExpo),
              visibility 0s linear var(--duration);
          }

          #sidenav-open[active] {
            visibility: visible;
            transform: translateX(0);
            transition: transform var(--duration) var(--easeOutExpo);
          }
        }

        @media (min-width: 640px) {
          #sidenav-button, #sidenav-close {
            display: none;
          }
        }

        nav {
          display: inline-flex;
          flex-direction: column;
          padding: 2rem;
          font-size: 1.25rem;
        }
        nav > h4 {
          text-transform: uppercase;
          color: #e2e2e2;
        }
        nav > h4:not(:first-child) {
          margin-block-start: 2rem;
        }
        nav > a {
          text-decoration: none;
          line-height: 1.25;
        }

        @media (max-width: 640px) {
          nav {
            background-color: #303030;
            /* shadow the nav / aside block */
            border-inline-end:1px var(--surface1);
            box-shadow: 5px 0 40px rgba(0,0,0,.45);
            font-size: 1.5rem;
          }
        }

        /*  Header  */
        header {
          padding: 0 3rem;
          
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          /* set the min header block size */
          min-block-size: var(--header-height);
          margin-block-end: 1rem;
          /* TODO */
          background-color: purple;
        }

        .hamburger {
          --size: 3.5rem;
          block-size: var(--size);
          inline-size: var(--size);
        }
        .hamburger > svg > line {
          stroke: #333;
          /* fill: #333; */
        }

        /*  Main  */
      `
    ]
  }
  // properties
  static get properties () {
    return {
      title: String,
      offline: Boolean,
      asideIsOpen: Boolean
    }
  }

  constructor () {
    super()
    // init
    this.asideIsOpen = false
    this.offline = !navigator.onLine

    this._goingOnline = this._goingOnline.bind(this)
    this._goingOffline = this._goingOffline.bind(this)
  }

  /*
  connectedCallback () {
    super.connectedCallback()

    window.addEventListener('online', this._goingOnline)
    window.addEventListener('offline', this._goingOffline)
  }

  disconnectedCallback () {
    window.removeEventListener('online', this._goingOnline)
    window.removeEventListener('offline', this._goingOffline)

    super.disconnectedCallback()
  } */

  firstUpdated () {
    this.#initRouter()

    // TEST - listening for nav click
    const nav = this.renderRoot.querySelector('nav')
    nav.addEventListener('click', () => {
      console.log('@CLICK')
      this.#handleDrawer()
    })
  }

  #initRouter () {
    const content = this.renderRoot.querySelector('#content')
    const router = new Router(content)

    router.setRoutes([
      {
        path: '/',
        component: 'home-view'
      },
      {
        path: '/one',
        component: 'one-view',
        action: () =>
          import('./views/one-view')
      },
      {
        path: '/two',
        component: 'two-view',
        action: () =>
          import('./views/two-view')
      },
      {
        path: '/three',
        component: 'three-view',
        action: () =>
          import('./views/three-view')
      },
      {
        path: '(.*)',
        component: 'not-found-view',
        action: () =>
          import('./views/not-found-view')
      }
    ])
  }

  // handle back online
  _goingOnline () {
    this.offline = false
    const snack = this.shadowRoot.querySelector('snack-bar')
  }

  // handle going Offline
  _goingOffline () {
    this.offline = true
    const snack = this.shadowRoot.querySelector('snack-bar')
  }

  // open / close aside nav (drawer)
  #handleDrawer () {
    this.asideIsOpen = !this.asideIsOpen
  }

  // TODO - Test Async tasks
  _firePendingState () {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
    const event = new CustomEvent('pending-state', {
      detail: {
        title: 'Async task',
        promise
      }
    })
    this.dispatchEvent(event)
  }

  render () {
    return html`
      <!-- Progress Bar for Async tasks
      <mwc-linear-progress 
        indeterminate 
        .closed="${!this._hasPendingChildren}">
      </mwc-linear-progress> -->

      <!-- aside -->
      <aside id="sidenav-open" ?active=${this.asideIsOpen}>
        <nav>
          <h4>My</h4>
          <a href="#">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Preferences</a>
          <a href="#">Archive</a>

          <h4>Settings</h4>
          <a href="#">Accessibility</a>
          <a href="#">Theme</a>
          <a href="#">Admin</a>

          <h4>Pages</h4>
          <a href="/">Home</a>
          <a href="/one">One</a>
          <a href="/two">Two</a>
          <a href="/three">Three</a>
          <a href="/xxx">Not Found</a>
        </nav>

        <!--
        <a href="#sidenav-open"
          id="sidenav-close"
          title="Close Menu"
          aria-label="Close Menu"
          @click=${window.history.back}></a> -->
        <button 
          style="background: transparent;" @click=${this.#handleDrawer}>
          X Close
        </button>
      </aside>

      <!-- Whole -->
      <main>
        <!-- Header -->
        <header>
          <!-- <a href="#sidenav-open" 
            id="sidenav-button"
            class="hamburger"
            title="Open Menu"
            aria-label="Open Menu"> -->
            <button 
              class="hamburger" 
              title="Open Menu"
              aria-label="Open Menu"
              @click=${this.#handleDrawer}>
              <!--
              <svg viewBox="0 0 50 40" role="presentation" focusable="false" aria-label="trigram for heaven symbol">
                <line x1="0" x2="100%" y1="10%" y2="10%" />
                <line x1="0" x2="100%" y1="50%" y2="50%" />
                <line x1="0" x2="100%" y1="90%" y2="90%" />
              </svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
              </svg>
            </button>
          <!-- </a> -->
          <h1>Lite - WebApp</h1>
          <h1>Other Stuff</h1>
        </header>

        <!-- Pages content -->
        <div id="content">

        </div>
      </main>
    `
  }

  /* no shadowed (encapsulated CSS unavailable)
  createRenderRoot () {
    return this
  } */
}

window.customElements.define('app-lite', AppLite)
