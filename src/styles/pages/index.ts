import styled from "@emotion/styled";

import { HEADER_HEIGHT } from "components/Header/styles";
import theme from "../theme";

const { primary: f_primary } = theme.fonts;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	margin: ${HEADER_HEIGHT}px 0;
`;

export const HeroContainer = styled.section`
	position: relative;

	.hero_img {
		filter: opacity(0.2);

		z-index: 0;
	}

	.text_block {
		position: absolute;
		display: flex;
		flex-direction: column;

		justify-content: center;
		align-items: flex-start;

		top: 35%;
		margin-left: 6em;

		h1 {
			font-family: ${f_primary};
			font-size: 4em;
			letter-spacing: 0.1em;
			font-weight: 400;
		}

		p {
			width: 50%;

			font-family: ${f_primary};
			font-size: 1em;
			letter-spacing: 0.05em;
			font-weight: 300;
		}
	}
`;
