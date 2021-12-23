import { css } from 'lit'

export const sharedStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* clear default button style */
  button {
    border: none;
    background: none;
    color: inherit;
    outline: inherit;
    line-height: 0;
    cursor: pointer;
  }
  
  svg {
    display: inline-block;
    outline: none;
  }

  h1 {
    font-size: 2.3rem;
  }

  h5 {
    font-size: 1.7rem;
  }
`
