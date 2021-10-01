import styled from "styled-components";

import theme from "styles/theme";

const { primary: f_primary, secondary: f_secondary } = theme.fonts;
const { primary, text_light } = theme.colors.light;

export const Container = styled.section`
	display: flex;
	flex-direction: row;

	width: 100vw;
`;

export const SliderContainer = styled.div`
	height: 100vh;

	float: left;
	width: 60%;
	object-fit: cover;
`;

export const SlideInfo = styled.aside`
	width: 40%;

	margin: 3rem;

	justify-content: center;
	align-items: center;

	h1 {
		margin-top: 4rem;

		font-family: ${f_primary};
		font-size: 1rem;
		font-weight: 400;

		letter-spacing: 0.2em;

		color: ${primary};
	}

	h4 {
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
