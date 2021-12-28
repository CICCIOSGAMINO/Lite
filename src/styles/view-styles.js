import { css } from 'lit'

export const viewStyles = css`
  /* Page common styles */

	button {
		padding: 2.1rem 3rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 2.1rem;
		border-radius: 1.3rem;
		border: 2px solid var(--brand);
		background-color: var(--brand);
		color: whitesmoke;
	}

	button:hover {
		background-color: transparent;
		color: var(--text1);
	}

	/* box */
	.box {
		display: inline-block;
		margin: 3rem;
		width: 100px;
		height: 100px;
	}

	/* some colors */
	.snow {
		background-color: whitesmoke;
	}

	.charcoal {
		background-color: #333;
	}

	.x11 {
		background-color: #A020F0;
	}
`