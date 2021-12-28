// view-three (Three)
import { html, css, LitElement } from 'lit'
import { sharedStyles } from '../styles/shared-styles.js'
import { viewStyles } from '../styles/view-styles.js'

class FourView extends LitElement {
	static get styles () {
		return [
			sharedStyles,
			viewStyles,
			css`
      :host {
        display: block;
      }
    `
		]
	}

	render () {
		return html`
      <h1>View (Four)</h1>
      <h3>This is the Fourth-View!!</h3>
    `
	}
}

customElements.define('four-view', FourView)

