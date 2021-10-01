import styled from "styled-components";

import theme from "styles/theme";

const { footer } = theme.colors.light;
export const FOOTER_HEIGHT = "46vh";

export const Container = styled.footer`
	width: 100%;
	height: ${FOOTER_HEIGHT};

	display: flex;
	flex-direction: row;
	flex-shrink: 0; /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */

	justify-content: space-around;

	/* background-color: red; */
	background-color: ${footer};

	padding: 2.4rem 0 2.4rem;

	.border-bottom-size {
		width: 30%;

		border-bottom: 4px solid ${theme.colors.light.primary};

		margin-bottom: 2rem;
	}
`;

export const LogoContainer = styled.div`
	width: 20vw;
	height: auto;

	align-self: center;
`;

export const Social = styled.div`
	width: 20vw;

	font-family: ${theme.fonts.primary};
	/* color: ${theme.colors.dark.background}; */

	h1,
	h2,
	h3,
	h4 {
		font-size: 1.5rem;
		font-weight: 500;
	}
`;

export const Contact = styled.div`
	width: 20vw;

	font-family: ${theme.fonts.primary};
	color: ${theme.colors.dark.background};

	h1,
	h2,
	h3,
	h4 {
		font-size: 1.5rem;
		font-weight: 500;
	}
`;

export const Options = styled.ul`
	font-family: ${theme.fonts.primary};
`;

export const Option = styled.li`
	list-style: none;
	text-decoration: underline;

	margin-top: 1rem;

	&:hover {
		color: white;
	}

	.name {
		display: flex;
		flex-direction: row;

		align-items: center;
	}
`;
