import styled from "styled-components";

import theme from "../theme";

const { primary: f_primary, secondary: f_secondary } = theme.fonts;
const { background, primary, text, text_light } = theme.colors.light;
const {
	background: background_dark,
	primary: primary_dark,
	text: text_dark,
} = theme.colors.dark;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const HeroContainer = styled.div`
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

		h2 {
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
