import styled from "styled-components";

import theme from "../../styles/theme";

const { footer } = theme.colors.light;
export const FOOTER_HEIGHT = "46vh";

export const Container = styled.footer`
	position: absolute;
	width: 100%;
	height: ${FOOTER_HEIGHT};

	display: flex;
	flex-direction: row;

	justify-content: space-around;

	background-color: ${footer};

	margin-top: 7rem;
	padding-top: 2.4rem;
	padding-bottom: 2.4rem;

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

	font-family: ${theme.fonts.brand};
	color: ${theme.colors.dark.background};

	h1 {
		font-size: 3rem;
	}
`;

export const Contact = styled.div`
	width: 20vw;

	font-family: ${theme.fonts.brand};
	color: ${theme.colors.dark.background};

	h1 {
		font-size: 3rem;
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
