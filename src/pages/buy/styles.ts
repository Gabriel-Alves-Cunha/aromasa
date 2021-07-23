import styled from "styled-components";

import { HEADER_HEIGHT } from "./../../components/Header/styles";

export const Container = styled.div`
	margin-top: ${HEADER_HEIGHT}px;
`;

export const FirstPart = styled.div`
	width: 100vw;
	height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export const SliderContainer = styled.div`
	height: 100vh;

	float: left;
	width: 60%;
	object-fit: cover;
`;
