// view-home (Home)
import { html, css, LitElement } from 'lit'
import { sharedStyles } from '../styles/shared-styles.js'
import { viewStyles } from '../styles/view-styles.js'
import '../components/custom-footer'

class HomeView extends LitElement {
	static get styles () {
		return [
			sharedStyles,
			viewStyles,
			css`
      :host {
        display: grid;
        grid-template-rows: auto auto auto;
        justify-items: center;
        align-items: center;
        gap: 1.3rem;
      }

			.section {

			}

			.buttons {
				padding: 5rem;
			}

      #logo {
        width: 25rem;
        height: 25rem;
      }

      #desc {
        text-align: center;
      }

      h1 {
        margin: 1rem;
        font-size: 5rem;
      }

      h5 {
        margin: .7rem;
        color: #666;
      }

      p {
        margin: .5rem;
        color: #bbb;
      }
    `]
	}

	static get properties () {
		return {
			_pendingCount: Number,
			_hasPendingChildren: Boolean
		}
	}

	_handleClick () {
		console.log('@HANDLE >> CLICK')
		const p = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 5000)
		})
		const pendingStateEvent = new CustomEvent('pending-state', {
			bubbles: true,
			composed: true,
			detail: {
				promise: p
			}
		})

		this.dispatchEvent(pendingStateEvent)
	}

	navToPage (e) {
		const page = e.target.dataset.page
		console.log(`@PAGE >> ${page}`)
		// use the global Vaadin Router
		window.Router.go(`/${page}`)
	}

	render () {
		return html`
			<!-- Intro -->
			<div class="section">
				<img id="logo" src="images/lite.svg" alt="Lite Logo">
				<div id="desc">
					<h1>Lite</h1>
					<h5>WebApp template</h5>
					<p>${window.webAppVersion}</p>
				</div>
			</div>

			<!-- Buttons -->
			<div class="buttons">
				<button data-page="one" @click=${this.navToPage}>One</button>
				<button data-page="two" @click=${this.navToPage}>Two</button>
			</div>
    `
	}
}

customElements.define('home-view', HomeView)
