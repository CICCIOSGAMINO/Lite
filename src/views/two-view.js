// view-two (Two)
import { html, css, LitElement } from 'lit'
import { sharedStyles } from '../styles/shared-styles.js'

class TwoView extends LitElement {
  static get properties () {
    return {
      _pendingCount: Number,
      _hasPendingChildren: Boolean
    }
  }

  static get styles () {
    return [
      sharedStyles,
      css`
      :host {
        background-color: red;
      }

      p {
        line-height: 1.5;
        color: var(--text2);
        max-inline-size: 50ch
      }
    `]
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

  render () {
    return html`
      <h1>View (Two)</h1>
      <hr>
      <article>
        <h2>Totam Header</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum consectetur, 
          necessitatibus velit officia ut impedit veritatis temporibus soluta? Totam 
          odit cupiditate facilis nisi sunt hic necessitatibus voluptatem nihil doloribus! Enim.
        </p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum, 
          amet odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt 
          soluta eligendi labore error corrupti! Dolore, cupiditate porro.
        </p>

        <h3>Subhead Totam Odit</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum, 
          amet odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt soluta 
          eligendi labore error corrupti! Dolore, cupiditate porro.
        </p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum, amet 
          odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt soluta 
          eligendi labore error corrupti! Dolore, cupiditate porro.
        </p>
        
        <h3>Subhead</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum, amet
          odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt soluta
          eligendi labore error corrupti! Dolore, cupiditate porro.
        </p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum, amet
          odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt soluta 
          eligendi labore error corrupti! Dolore, cupiditate porro.
        </p>
      </article>
    `
  }
}

customElements.define('two-view', TwoView)
