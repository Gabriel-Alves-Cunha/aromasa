import styled from "styled-components";

import theme from "styles/theme";

export const FOOTER_HEIGHT = "46vh" as const;

export const Wrapper = styled.footer`
	width: 100%;
	height: ${FOOTER_HEIGHT};

	border-top: 1px solid #e5e7eb;

	h1,
	h2,
	h3,
	h4 {
		font-size: 1.1rem;
		font-weight: 500;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-shrink: 0; /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */

	justify-content: space-around;

	padding: 2.4rem;

	.border-bottom-size {
		width: 30%;

		border-bottom: 2px solid ${theme.colors.light.primary};

		margin-bottom: 2rem;
	}
`;

export const LogoContainer = styled.div`
	width: 10vw;
	height: auto;

	align-self: center;
`;

export const Social = styled.div`
	width: 20vw;

	font-family: ${theme.fonts.primary};
`;

export const Contact = styled.div`
	width: 20vw;

	font-family: ${theme.fonts.primary};
	color: ${theme.colors.dark.background};
`;

export const Options = styled.ul`
	font-family: ${theme.fonts.primary};
`;

export const Option = styled.li`
	list-style: none;

	margin-top: 1rem;

	&:hover {
		transition: 0.15s ease-in-out;
		color: #444;
	}

	.name {
		display: flex;
		flex-direction: row;

		align-items: center;
	}
`;

export const FootersFooter = styled.footer`
	font-family: ${theme.fonts.secondary};
	font-size: 0.875rem;
	font-weight: 400;

	margin: 0 2.4rem;
	padding: 2.4rem;

	border-top: 1px solid #e5e7eb;

	span {
		color: #444;
	}
`;
