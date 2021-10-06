// view-notfound (Not Found page)
import { html, css, LitElement } from 'lit'
import { sharedStyles } from '../styles/shared-styles.js'

class NotFoundView extends LitElement {
  static get styles () {
    return [
      sharedStyles,
      css`
      :host {
        display: block;
        /* background-color: red; */
        /* full screen - header - padding */
        block-size: calc(100vh - 7.2rem - 3rem);
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0;
        display: inline-block;
        font-size: 23rem;
      }
    `]
  }

  render () {
    return html`
      <h1>☹️</h1>

      <h2>404 Error</h2>
      <h3>Page Not Found!</h3>
    `
  }
}

customElements.define('not-found-view', NotFoundView)
