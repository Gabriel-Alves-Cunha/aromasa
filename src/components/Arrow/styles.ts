import styled, { css } from "styled-components";

import { Props } from "./index";

export const Container = styled.div<Pick<Props, "direction" | "enabled">>`
	display: flex;
	position: absolute;

	top: 50%;
	height: 50px;
	width: 50px;
	justify-content: center;
	align-items: center;

	${({ direction }) => (direction === "right" ? `right: 25px;` : `left: 25px;`)}

	background: white;
	border-radius: 50%;

	${({ enabled }) =>
		enabled
			? css`
					cursor: pointer;
					transition: transform ease-in 0.1s;
			  `
			: css`
					cursor: default;
					opacity: 0.3;
			  `}

	&:hover {
		transform: scale(1.1);
	}

	img {
		transform: translateX(
			${({ direction }) => (direction === "left" ? "-2" : "2")}px
		);

		&:focus {
			outline: 0;
		}
	}
`;
