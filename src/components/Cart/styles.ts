import styled from "@emotion/styled";

import theme from "styles/theme";

const { primary } = theme.colors.light;
const { primary: f_primary } = theme.fonts;

export const DrawerContainer = styled.aside`
	font-family: ${theme.fonts.secondary};

	width: 45vw;
	height: 100%;

	span {
		color: ${primary};
		font-weight: 500;
	}

	overflow-x: hidden; /* Show horizontal scrollbar */
`;

export const Header = styled.div`
	font-weight: 400;

	margin: 20px 40px;
	color: #999;

	text-align: center;
	line-height: 1.8rem;
	letter-spacing: 0.025em;
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

export const NoItemsStyle = styled.div`
	// Center stuff
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	font-family: ${theme.fonts.secondary};
	text-align: center;

	margin: 2rem;
	height: 75%;

	/* border: 1px solid red;
	background: linear-gradient(red, red) no-repeat center/1px 100%; */

	p {
		font-family: Poppins;
		font-size: 1.3rem;
		line-height: 2rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		padding-top: 1.5rem;
	}
`;

export const Span = styled.span`
	width: 100px;
	height: 100px;
	background-color: ${primary};
	border-style: dashed;
	border-radius: 50%;
	border-width: 1px;
	border-color: #fff;

	// Center stuff
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
