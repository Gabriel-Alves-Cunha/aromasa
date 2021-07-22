import styled from "styled-components";

import { BulletProps } from ".";

export const Container = styled.div`
	position: absolute;
	bottom: 20px;
	width: 100%;
	height: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Span = styled.span<Pick<BulletProps, "active">>`
	padding: 5px;
	margin-right: 5px;
	cursor: pointer;
	border-radius: 50%;
	background: ${({ active }) => (active ? "black" : "white")};
`;
