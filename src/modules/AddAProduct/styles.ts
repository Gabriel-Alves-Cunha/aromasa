import styled from "@emotion/styled";

import { HEADER_HEIGHT } from "components/Header/styles";
import { NAVBAR_WIDTH } from "components/Navbar/styles";

import theme from "styles/theme";

const { primary: f_primary } = theme.fonts;
const { primary } = theme.colors.light;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	/* width: calc(100vw - ${NAVBAR_WIDTH}px);
	height: calc(100vh - ${HEADER_HEIGHT}px); */

	/* margin-top: ${HEADER_HEIGHT}px;
	margin-left: ${NAVBAR_WIDTH}px; */

	font-family: ${f_primary};

	padding: 1.5em;

	caret-color: ${primary};

	/* border: 1px solid red;
	background: linear-gradient(red, red) no-repeat center/1px 100%; */

	input[type="submit"] {
		border: none;

		width: 130px;
		height: 40px;
		align-items: center;
		justify-content: center;

		background: ${primary};
		color: white;

		cursor: pointer;

		margin: 10px;

		&:hover {
			opacity: 0.9;
		}

		&:active {
			opacity: 0.4;
		}
	}
`;

export const Button = styled.button`
	border: none;

	width: 130px;
	height: 40px;

	background: ${primary};
	color: white;

	cursor: pointer;

	margin: 10px;

	&:hover {
		opacity: 0.9;
	}

	&:active {
		opacity: 0.4;
	}
`;
