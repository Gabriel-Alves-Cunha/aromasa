import { makeStyles } from "@mui/styles";
import styled from "@emotion/styled";

import theme from "styles/theme";

const { primary: f_primary } = theme.fonts;
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

	.option {
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
	}
`;

export const LogoContainer = styled.div`
	margin: 1rem 6rem;

	width: 100%;

	img {
		height: 40px;
		width: auto;
	}

	.logo {
		cursor: pointer;
		transition: transform 0.2s ease-in-out;

		&:hover {
			transition: transform 0.2s ease-in-out;
			transform: scale(0.9);
		}
	}
`;

export const Options = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	margin-right: 6rem;
`;

export const CartContainer = styled.div`
	display: flex;
	flex-direction: row;

	justify-content: flex-end;
	align-items: center;

	margin-right: 2rem;
	gap: 2rem;

	/* border: 1px solid red;
	background: linear-gradient(red, red) no-repeat center/1px 100%; */
`;

export const useStyles = makeStyles(_muiTheme => ({
	button: {
		color: theme.colors.light.primary,
	},
}));
