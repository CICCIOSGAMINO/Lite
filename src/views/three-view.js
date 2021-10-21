// view-three (Three)
import { html, css, LitElement } from 'lit'

class ThreeView extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        background-color: purple;
      }
    `
  }

  render () {
    return html`
      <h1>View (Three)</h1>
      <h3>This is the THree-View!!</h3>
    `
  }
}

customElements.define('three-view', ThreeView)

