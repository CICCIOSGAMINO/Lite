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
        display: block;
      }
      button {
        margin: 3rem;
        padding: 1rem;
      }
      button:focus, button:hover {
        outline: 1px solid #333;
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
      <fieldset @input=${this.logInput}>
        <legend>Scheme</legend>
        <input type="radio" id="auto" name="scheme" value="auto" checked>
        <label for="auto">Auto</label>

        <input type="radio" id="light" name="scheme" value="light">
        <label for="light">Light</label>

        <input type="radio" id="dark" name="scheme" value="dark">
        <label for="dark">Dark</label>

        <input type="radio" id="dim" name="scheme" value="dim">
        <label for="dim">Dim</label>
      </fieldset>

      <!-- TODO test button -->
      <button>T</button>
    `
  }
}

customElements.define('home-view', HomeView)
