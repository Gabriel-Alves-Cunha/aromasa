import styled from "styled-components";

import theme from "../../styles/theme";

const { primary } = theme.colors.light;
const { primary: f_primary, secondary: f_secondary } = theme.fonts;

export const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-width: 2px;
	border-radius: 2px;
	border-color: #ccc;
	border-style: dashed;
	background-color: #fafafa;
	color: #bdbdbd;
	width: calc(40em - 2 * 20px - 2 * 2px); // padding & border
	outline: none;
	transition: border 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		border-color: ${primary};
	}
`;

export const Rejectd = styled.div`
	width: 40em;
	font-family: ${f_primary};

	color: rebeccapurple;

	letter-spacing: 0.05em;

	h4 {
		color: red;
	}
`;

export const TrashTheImg = styled.button`
	position: absolute;

	background-color: red;

	width: 20px;
	height: 20px;

	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 10px;

	cursor: pointer;
	opacity: 0.4;
	transition: opacity 0.1s linear;

	&:hover {
		opacity: 1;
	}
`;
