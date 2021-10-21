import { css } from 'lit'

export const sharedStyles = css`
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
    font-size: 2.1rem;
  }
`
