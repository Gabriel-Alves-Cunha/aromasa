import styled from "styled-components";

import theme from "styles/theme";

const { secondary: f_secondary } = theme.fonts;
const { navbar, primary } = theme.colors.light;
export const NAVBAR_WIDTH = 250 as const;

export const Container = styled.nav`
	display: flex;
	flex-direction: column;

	position: fixed;
	left: 0px;
	top: 0px;
	height: 100vh;
	width: ${NAVBAR_WIDTH}px;

	background: ${navbar};

	.active {
		background: white; // btn color
		color: black;
	}
`;

export const Option = styled.button`
	font-family: ${f_secondary};
	font-weight: 400;
	font-size: 1rem;

	width: calc(${NAVBAR_WIDTH} - 5px);
	height: 50px;

	text-align: left;
	cursor: pointer;
	border: none;

	padding-left: 30px;
	justify-content: center;
	align-items: center;

	color: black;
	background: white;

	/* outline: auto; */
	transition: all 0.1s linear;

	.background {
		transition: all 0.1s linear;
	}

	&:hover .background {
		color: ${navbar};
		background: ${primary}; // btn color
		transform: translateX(5px);
	}

	&:hover {
		color: ${navbar};
		background: ${primary}; // btn color
	}
`;

export const LogoContainer = styled.div`
	justify-content: center;
	align-content: center;
	align-items: center;

	margin: 30px;

	cursor: pointer;

	.img {
		height: 40px;
		width: auto;
	}
`;
