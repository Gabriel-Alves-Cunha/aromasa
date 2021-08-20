import styled from "styled-components";
import { IconButton } from "@material-ui/core";

import theme from "../../styles/theme";

const { primary } = theme.colors.light;
const { primary: f_primary } = theme.fonts;

export const StyledButton = styled(IconButton)`
	position: fixed;
	width: 20px;
	height: 20px;

	z-index: 100;
`;

export const DrawerContainer = styled.aside`
	font-family: ${theme.fonts.secondary};

	width: 45vw;

	span {
		color: ${primary};
		font-weight: 500;
	}

	overflow-x: hidden; /* Show horizontal scrollbar */
`;

export const Header = styled.div`
	font-weight: 300;

	margin: 20px 40px;

	text-align: center;
	line-height: 1.8rem;
`;

export const ImgContainer = styled.div`
	position: relative;
	height: 200%;
	width: auto;

	margin-right: 20px;

	justify-content: center;
	align-items: center;

	.img {
		border-radius: 5px;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: row;

	margin: 20px 30px;

	border-bottom: 1px solid lightgray;
	padding-bottom: 20px;

	h3 {
		font-family: ${theme.fonts.secondary};
		font-size: 1rem;
		font-weight: 400;
	}

	.info {
		display: flex;
		flex-direction: row;

		align-items: center;
	}

	.total {
		display: flex;
		flex-direction: row;

		justify-content: space-between;
		align-items: center;
	}
`;

export const Title = styled.p`
	font-size: 1rem;
	font-weight: 200;

	margin-bottom: 15px;
`;

export const Amount = styled.h3`
	margin-left: 10px;
	margin-right: 10px;
`;

export const NoItems = styled.div`
	font-family: ${theme.fonts.secondary};

	margin: 2rem;

	text-align: center;
`;

export const ConfirmButton = styled.button`
	font-family: ${f_primary};
	font-size: 1.1em;

	width: calc(100% - 80px);
	height: 30px;

	margin: 30px;
	margin-top: 0;

	background: ${primary};
	color: white;

	border: none;
	padding: 10px;

	cursor: pointer;

	transition: box-shadow 0.3s ease-in 0s, opacity 0.2s ease 0s;

	&:disabled {
		cursor: default;
		opacity: 0.4;
	}

	&:hover:enabled {
		box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
			0 17px 20px 0 rgba(0, 0, 0, 0.19);
	}

	&:active {
		opacity: 0.3;
	}
`;
