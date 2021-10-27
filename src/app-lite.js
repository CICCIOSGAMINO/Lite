import { LitElement, html, css } from 'lit'
import { Router } from '@vaadin/router'

import { PendingContainer } from './components/pending-container'
import { sharedStyles } from './styles/shared-styles.js'

import '@cicciosgamino/snack-bar'
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
          /* header button size */
          --mobile-header-button-size: 4rem;  
          --dk-header-button-size: 4.2rem;
          /* header menu button size (only mobile)
          --menu-button-size: 3.3rem; */
          --menu-button-size: 2.7rem;
          
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
          padding-left: 1.7rem;
          padding-right: 1.7rem;
          
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          block-size: var(--mobile-header-block-size);
          margin-block-end: 1rem;
          gap: 1rem;
          /* TODO
          background-color: purple; */
        }

        /* ------------------ Menu button animation ----------------- */
        #sidenav-button {
          padding: 0;
          margin: 0;
          width: var(--menu-button-size);
          height: var(--menu-button-size);
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

        .company-logo {
          width: var(--mobile-header-button-size);
          height: var(--mobile-header-button-size);
        }

        #little_thunder {
          fill: var(--text1);
        }

        .title {
          /* title grow more space than others */
          flex-grow: 3;
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
      mobileLayout: Boolean,
      asideIsOpen: Boolean
    }
  }

  constructor () {
    super()
    // init
    this.asideIsOpen = false
    this.offline = !navigator.onLine
    this.mobileLayout = 
      window.innerWidth < 640
  }

  connectedCallback () {
    super.connectedCallback()
    // online / offline
    window.addEventListener('online', this.#goingOnline)
    window.addEventListener('offline', this.#goingOffline)
    // match the media query
    window.matchMedia('(min-width: 640px)')
      .addEventListener('change', this.#handleResizeToDesktop)
    window.matchMedia('(max-width: 639px)')
      .addEventListener('change', this.#handleResizeToMobile)

  }

  disconnectedCallback () {
    window.removeEventListener('online', this.#goingOnline)
    window.removeEventListener('offline', this.#goingOffline)
    super.disconnectedCallback()
  }

  firstUpdated () {
    this.#initRouter()

    // TODO - listening for nav click
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
  #goingOnline = () => {
    this.offline = false
    console.log(`@ONLINE`)
    this.#showSnackBar('Online')
  }

  // handle going Offline
  #goingOffline = () => {
    this.offline = true
    console.log(`@OFFLINE`)
    this.#showSnackBar('Offline')
  }

  #showSnackBar (title) {
    const snack = 
      this.renderRoot.querySelector('snack-bar')
    snack.title = title
    snack.setAttribute('active', '')
  }

  // open / close aside nav (drawer)
  #handleDrawer () {
    this.asideIsOpen = !this.asideIsOpen
  }

  #handleResizeToDesktop = (e) => {
    if (e.matches) {
      this.mobileLayout = false
      console.log(`@MOBILE >> ${this.mobileLayout}`)
    }
  }

  #handleResizeToMobile = (e) => {
    if (e.matches) {
      this.mobileLayout = true
    }
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
            <svg viewBox="0 0 100 100" role="img"
              aria-hidden="true" focusable="false">
              <rect id="menu-bar-one" width="70%" height="15%"></rect>
              <rect id="menu-bar-two" y="43%" width="50%" height="15%"></rect>
              <rect y="85%" width="90%" height="15%"></rect>
            </svg>
          </button>

          <div class="company-logo">
            <!-- Inline SVG logo -->
            <svg viewBox="0 0 1024 1024">
              <g transform="matrix(34.483325,0,0,34.483325,-8904.4735,-10800.524)" fill-rule="evenodd" stroke-width=".0289995">
                <path id="big_thunder" d="m271.88453 315.15989-2.32432 10.66526h4.78263l-2.83303 10.57301 14.29708-14.29708h-6.73552l3.30434-7.09188z" fill="#c33fde">
                <title>Big Thunder</title>
                </path>
                <path id="little_thunder" d="m265.44531 318.05273-3.55273 13.25782h5.89844l-2.49415 9.30664 2.60743 0.69922 3.40429-12.70508h-5.89843l2.64257-9.86133z" color="#000000" fill="#333333" stroke-width=".0289995" style="-inkscape-stroke:none">
                <title>Little Thunder</title>
                </path>
              </g>
            </svg>
          </div>

          <h1 class="title">Lite</h1>

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

      <snack-bar timing="3000"></snack-bar>
    `
  }

  /* no shadowed (encapsulated CSS unavailable)
  createRenderRoot () {
    return this
  } */
}

window.customElements.define('app-lite', AppLite)
