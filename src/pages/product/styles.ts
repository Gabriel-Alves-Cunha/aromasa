import styled from "styled-components";

import { HEADER_HEIGHT } from "./../../components/Header/styles";
import theme from "../../styles/theme";

const { primary: f_primary, secondary: f_secondary } = theme.fonts;
const { text_light } = theme.colors.light;

export const Container = styled.div`
	width: 100%;
`;

export const FirstVH = styled.div`
	border: 1px solid red;

	display: flex;
	flex-direction: row;

	width: 100vw;
	height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export const ProductSliderContainer = styled.div`
	height: 100%;

	width: 60%;
	object-fit: cover;
`;

export const InfoContainer = styled.div`
	/* border: 1px solid red;
	background: linear-gradient(red, red) no-repeat center/1px 100%; */

	width: 40vw;
	height: 100%;

	display: flex;
	flex-direction: column;
`;

export const Title = styled.h2`
	padding: 2rem;

	font-family: ${f_primary};
	font-size: 1.3em;
	font-weight: 300;
`;

export const Details = styled.div`
	font-family: ${f_secondary};
	font-weight: 200;

	color: ${text_light};

	justify-content: flex-start;
	padding-left: 2rem;
`;
