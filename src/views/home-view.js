// view-home (Home)
import { html, css, LitElement } from 'lit'
import { sharedStyles } from '../styles/shared-styles.js'
import '../components/custom-footer'

class HomeView extends LitElement {
	static get styles () {
		return [
			sharedStyles,
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

			.snow {
				background-color: whitesmoke;
			}

			.charcoal {
				background-color: #333;
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

	logInput (event) {
		// console.log(event)
		// set theme (whole html document)
		const theme = event.target.value
		document.firstElementChild.setAttribute('color-scheme', theme)
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

    `
	}
}

customElements.define('home-view', HomeView)
