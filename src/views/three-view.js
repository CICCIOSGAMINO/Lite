// view-three (Three)
import { html, css, LitElement } from 'lit'
import { sharedStyles } from '../styles/shared-styles.js'
import { viewStyles } from '../styles/view-styles.js'

class ThreeView extends LitElement {
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
        background-color: purple;
      }

      #container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }

      #brand {
        background-color: var(--brand);
      }
    `
		]
	}

	connectedCallback () {
		super.connectedCallback()
	}

	disconnectedCallback () {
		super.disconnectedCallback()
		this.observer.disconnect()
	}

	firstUpdated () {
		this.#initObserver()
	}

	#initObserver () {
		const brand = this.renderRoot.querySelector('#brand')

		this.observer = new MutationObserver(
			this.#customStylesMutation
		)
		this.observer.observe(brand, {
			attributes: true,
			attributeFilter : ['style']
		})
	}

	#customStylesMutation (mutationsList) {
		console.log('@TRIGGER')
		mutationsList.forEach(element => {
			console.log(element)
			console.log(`@TARGET >> ${element.target}`)
			console.log(element.target)
		})
	}

	handleClick () {
		const brand =
      this.renderRoot.querySelector('#brand')
		brand.style.backgroundColor = 'red'
	}

	render () {
		return html`
      <h1>View (Three)</h1>
      <h3>This is the THree-View!!</h3>

      <div id="container">
        <div id ="brand" class="box" @click=${this.handleClick}>
          ONE
        </div>
        <div class="box x11">
          TWO
        </div>
        <div class="box snow">
          THREE
        </div>
      </div>
    `
	}
}

customElements.define('three-view', ThreeView)

