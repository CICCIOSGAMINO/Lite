import { LitElement, html, css } from 'lit'
import { Router } from '@vaadin/router'

import { PendingContainer } from './components/pending-container'
import { sharedStyles } from './styles/shared-styles.js'

import '@cicciosgamino/color-scheme-button'
import '@cicciosgamino/github-button'
import './views/home-view'

class AppLite extends PendingContainer(LitElement) {
  static get styles () {
    return [
      sharedStyles,
      css`
        :host {
          --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1); /* sidenav animation */
          --duration: .6s;  /* sidenav animation */

          /* header block size (height) for mobile and desktop */
          --mobile-header-block-size: 6.4rem;  
          --dk-header-block-size: 7.2rem;
          /* header button size mobile / dk */
          --mobile-header-button-size: 4rem;  
          --dk-header-button-size: 4.2rem;
          
          min-height: 100vh;
          display: grid;
          /* handle the aside, content with grid stack layout, 
            one row [stack] / two columns (desktop version) */
          grid: [stack] 1fr / min-content [stack] 1fr;
        }

        aside {
          z-index: 10;
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

          #sidenav-close {
            background: transparent;
          }

          main[aside] {
            /* choose the background of content when aside open */
            background-color: rgba(0,0,0,.45);
            filter: blur(10px);
            z-index: 0;
          }
        }

        nav {
          display: inline-flex;
          flex-direction: column;
          padding: 2rem;
          font-size: 1.25rem;

          background-color: #303030;
          /* shadow the nav / aside block */
          border-inline-end:1px var(--surface1);
          box-shadow: 5px 0 40px rgba(0,0,0,.45);
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

        #version {
          position: absolute;
          bottom: var(--std-margin);
        }

        /*  Header  */
        header {
          padding-left: 2.1rem;
          padding-right: 5rem;
          /* padding: 0 3rem; */
          
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          block-size: var(--mobile-header-block-size);
          margin-block-end: 1rem;
          gap: 3rem;
          /* TODO
          background-color: purple; */
        }

        /* ------------------ Menu button animation ----------------- */
        #sidenav-button {
          /* TODO */
          width: 27px;
          height: 27px;
        }
        #sidenav-button svg rect {
          fill: var(--text1);
        }
        button:hover #menu-bar-one,
        button:focus #menu-bar-one,
        svg:hover > #menu-bar-one,
        svg:focus > #menu-bar-one {
          animation: vibrant-first-bar 1s linear infinite none;
        }
        button:hover #menu-bar-two,
        button:focus #menu-bar-two,
        svg:hover > #menu-bar-two,
        svg:focus > #menu-bar-two {
          animation: vibrant-second-bar 1s linear infinite none;
        }
        @keyframes vibrant-first-bar {
          0% { width: 70% }
          25% { width: 50% }
          50% { width: 30% }
          75% { width: 50% }
          100% { width: 70% }
        }
        @keyframes vibrant-second-bar {
          0% { width: 50% }
          25% { width: 70% }
          50% { width: 100% }
          75% { width: 70% }
          100% { width: 50% }
        }

        color-scheme-button {
          width: var(--mobile-header-button-size);
          height: var(--mobile-header-button-size);
          --icon-color: var(--text1);
        }

        github-button {
          width: var(--mobile-header-button-size);
          height: var(--mobile-header-button-size);
          --icon-color: var(--text1);
        }

        /* -------------------------- Desktop ----------------------- */
        @media (min-width: 640px) {
          #sidenav-button, #sidenav-close {
            display: none;
          }

          nav {
            position: relative;

            background-color: inherit;
            /* shadow the nav / aside block */
            border-inline-end:1px var(--surface1);
            box-shadow: none;
          }

          header {
            block-size: var(--dk-header-block-size);
          }

          color-scheme-button {
            width: var(--dk-header-button-size);
            height: var(--dk-header-button-size);
          }
          
          github-button {
            width: var(--dk-header-button-size);
            height: var(--dk-header-button-size);
          }
        }
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

          <p id="version">${window.webAppVersion}</p>
        </nav>

        <button
          id="sidenav-close"
          title="Close Menu"
          aria-label="Close Menu"
          @click=${this.#handleDrawer}>
          X Close
        </button>
      </aside>

      <!-- Whole -->
      <main ?aside=${this.asideIsOpen}>
        <!-- Header -->
        <header>

          <!-- menu button -->
          <button id="sidenav-button" aria-label="Menu"
            title="menu" @click=${this.#handleDrawer}>
            <svg class="big" width="27" height="27" 
              role="img" aria-hidden="true" focusable="false">
              <rect id="menu-bar-one" width="70%" height="15%"></rect>
              <rect id="menu-bar-two" y="43%" width="50%" height="15%"></rect>
              <rect y="85%" width="90%" height="15%"></rect>
            </svg>
          </button>

          <h1>Lite</h1>
          <h1>WebApp</h1>

          <color-scheme-button 
            title="Toggle Theme"
            aria-label="Toggle Theme">
          </color-scheme-button>

          <github-button 
            link="/CICCIOSGAMINO/Lite.git">
          </github-button>

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
