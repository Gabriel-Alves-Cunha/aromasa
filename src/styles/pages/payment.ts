import styled from "@emotion/styled";

import { HEADER_HEIGHT } from "components/Header/styles";
import theme from "styles/theme";

const { primary: f_primary } = theme.fonts;

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	height: 100vh;

	position: relative;

	justify-content: center;
	align-items: center;

	.error_img {
		height: 70vh;
	}

	.thanks {
		margin-top: ${HEADER_HEIGHT}px;
		filter: opacity(0.2);
		width: 100vw;
		height: calc(100vh - ${HEADER_HEIGHT}px + 3px);
		z-index: 0;
	}

	p {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		top: 35%;
		margin-left: 6em;

		width: 50%;
		font-family: ${f_primary};
		font-size: 1em;
		letter-spacing: 0.05em;
		font-weight: 300;

		span {
			font-family: ${f_primary};
			font-size: 3.5em;
			letter-spacing: 0.1em;
			font-weight: 400;
		}

		a {
			color: blue;
		}
	}
`;
