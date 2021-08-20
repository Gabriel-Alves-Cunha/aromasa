import styled from "styled-components";

import theme from "../../styles/theme";

const { primary } = theme.colors.light;

export const Container = styled.div`
	@keyframes ldio {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.ldio div {
		position: absolute;
		animation: ldio 1s linear infinite;
		width: 160px;
		height: 160px;
		top: 20px;
		left: 20px;
		border-radius: 50%;
		box-shadow: 0 4px 0 0 ${primary};
		transform-origin: 80px 82px;
	}

	.loadingio-eclipse {
		width: 200px;
		height: 200px;
		display: inline-block;
		overflow: hidden;
	}

	.ldio {
		width: 100%;
		height: 100%;
		position: relative;
		transform: translateZ(0) scale(1);
		backface-visibility: hidden;
		transform-origin: 0 0; /* see note above */
	}

	.ldio div {
		box-sizing: content-box;
	}
`;
