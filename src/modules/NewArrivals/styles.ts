import styled from "styled-components";
import theme from "../../styles/theme";

const { primary: f_primary, secondary: f_secondary } = theme.fonts;
const { background, primary, text, text_light } = theme.colors.light;
const {
	background: background_dark,
	primary: primary_dark,
	text: text_dark,
} = theme.colors.dark;

export const Container = styled.div`
	display: flex;
	flex-direction: row;

	width: 100vw;
`;

export const SliderContainer = styled.div`
	height: 100vh;

	float: left;
	width: 60%;
	height: 100vh;
	object-fit: cover;
`;

export const SlideInfo = styled.div`
	width: 40%;

	margin: 3rem;

	justify-content: center;
	align-items: center;

	h4 {
		margin-top: 4rem;

		font-family: ${f_primary};
		font-size: 1rem;
		font-weight: 400;

		letter-spacing: 0.2em;

		color: ${primary};
	}

	h1 {
		margin-top: 3rem;

		font-family: ${f_secondary};
		font-size: 2rem;

		letter-spacing: 0.1em;
	}

	p {
		margin-top: 2rem;

		font-family: ${f_primary};
		font-size: 1rem;

		letter-spacing: 0.05em;
		line-height: 1.6rem;

		color: ${text_light};
	}
`;
