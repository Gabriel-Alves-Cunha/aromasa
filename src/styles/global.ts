import { createGlobalStyle } from "styled-components";

import theme from "./theme";

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: content-box;
		font-family: 400 16px Roboto, sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	html {
		scroll-behavior: smooth;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	body {
		background: ${({ theme }) => theme.colors.light.background};
		color: ${({ theme }) => theme.colors.light.text};
		height: 100%;

  	overflow-y: scroll; /* Show vertical scrollbar */
  	overflow-x: hidden; /* Show horizontal scrollbar */
	}

	::selection {
    background: ${theme.colors.light.primary};
    color: #ffffff;
	}

	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: ${theme.colors.light.primary};
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;
