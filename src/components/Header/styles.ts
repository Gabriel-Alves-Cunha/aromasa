import styled from "styled-components";
import { IconButton } from "@material-ui/core";

import theme from "../../styles/theme";

const { primary: f_primary, secondary: f_secondary } = theme.fonts;
const { text } = theme.colors.light;

export const HEADER_HEIGHT = 60;

export const Container = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;

	width: 100%;
	height: ${HEADER_HEIGHT}px;
	min-height: ${HEADER_HEIGHT}px;

	background: white;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	box-shadow: 0 0 5px 0 rgb(1 3 4 / 19%);
`;

export const LogoContainer = styled.div`
	margin: 1rem 6rem;

	width: 100%;

	img {
		height: 40px;
		width: auto;
	}
`;

export const StyledButton = styled(IconButton)`
	position: fixed;
	width: 20px;
	height: 20px;

	z-index: 100;

	background-color: ${theme.colors.light.primary};
	color: ${theme.colors.light.primary};
`;

export const Options = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	margin-right: 6rem;
`;

export const Option = styled.button`
	font-family: ${f_primary};
	font-weight: 200;
	font-size: 1rem;

	border: none;
	background: transparent;

	color: ${text};

	list-style: none;

	margin: 6px 15px;
	margin-left: 20px;

	/* outline: auto; */

	.background {
		will-change: transform;
		transition: transform 350ms 150ms;
	}

	&:hover .background {
		transition: transform 125ms;

		transform: translateY(-5px);
	}

	.active {
		font-weight: 400;
	}
`;

export const CartContainer = styled.div`
	display: flex;
	flex-direction: row;

	justify-content: flex-end;
	align-items: center;

	margin-right: 2rem;
`;

export const ModalContainer = styled.div`

`;

export const SignInButton = styled.button`

`;

export const SignOutButton = styled.button`

`;
