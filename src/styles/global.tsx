import { Global, css } from "@emotion/react";

import theme from "./theme";

export const GlobalStyle = () => (
	<>
		<Global
			styles={css`
				* {
					margin: 0;
					padding: 0;
					box-sizing: content-box;
					font-family: 400 16px Roboto, sans-serif;
				}

				html {
					-webkit-font-smoothing: antialiased;
					text-rendering: optimizeLegibility;
					scroll-behavior: smooth;
					height: 100%;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				main {
					flex: 1 0 auto;
				}

				body {
					background: ${theme.colors.light.background};
					color: ${theme.colors.light.text};

					display: flex;
					flex-direction: column;
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
			`}
		/>
	</>
);
