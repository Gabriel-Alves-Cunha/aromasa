import styled from "styled-components";

import { HEADER_HEIGHT } from "../Header/styles";
import theme from "../../styles/theme";

export const NAVBAR_WIDTH = 190;
const { navbar } = theme.colors.light;
const { secondary: f_secondary } = theme.fonts;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	position: fixed;
	left: 0px;
	top: 0px;
	height: calc(100vh - ${HEADER_HEIGHT}px);
	margin-top: 40px;
	padding-top: 30px;
	width: ${NAVBAR_WIDTH}px;

	background: ${navbar};

	.active {
		background: white; // btn color
		color: ${navbar};
	}
`;

export const Option = styled.button`
	font-family: ${f_secondary};
	font-size: 1rem;
	font-weight: 400;

	width: calc(190px - 5px);
	height: 35px;

	border: none;
	text-align: left;
	cursor: pointer;

	margin: 6px 0;
	padding-left: 5px;

	color: white;
	background: ${navbar};

	/* outline: auto; */
	transition: all 0.1s linear;

	.background {
		transition: all 0.1s linear;
	}

	&:hover .background {
		color: ${navbar};
		background: white; // btn color
		transform: translateX(5px);
	}

	&:hover {
		color: ${navbar};
		background: white; // btn color
	}
`;
