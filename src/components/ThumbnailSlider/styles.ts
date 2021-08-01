import styled from "styled-components";

export const Container = styled.div`
	.embla__slide--thumb {
		padding-left: 0px;
		min-width: 20%;
	}

	.embla__slide--thumb.is-selected .embla__slide__thumbnail {
		opacity: 1;
	}

	.embla--thumb {
		padding-top: 0;
		margin-top: 2px;
	}

	.embla-slide-thumb-img {
		position: absolute;
		opacity: 0.2;
		top: 0;
		bottom: 0;

		object-fit: contain;

		will-change: transform opacity;

		transition: opacity 0.2s;
	}
`;

export const Embla = styled.div`
	position: relative;
	background-color: white;
	max-width: 90%;
	margin-left: auto;
	margin-right: auto;
`;

export const EmblaViewport = styled.div`
	overflow: hidden;
	width: 100%;

	.embla__viewport.is-draggable {
		cursor: move;
		cursor: grab;
	}

	.embla__viewport.is-dragging {
		cursor: grabbing;
	}
`;

export const EmblaContainer = styled.div`
	display: flex;
	user-select: none;
	-webkit-touch-callout: none;
	-khtml-user-select: none;
	-webkit-tap-highlight-color: transparent;
	margin-left: -10px;
	margin-top: 5px;

	.embla__container--thumb {
		cursor: default;
		margin-left: -8px;
	}
`;

export const EmblaSlide = styled.div`
	padding-left: 10px;
	min-width: 100%;
	position: relative;
`;

export const EmblaSlideButton = styled.button.attrs({ type: "button" })`
	position: relative;
	overflow: hidden;
	height: 190px;

	touch-action: manipulation;
	cursor: pointer;
	border: 0;
	outline: 0;
	margin: 0;
	padding: 0;
	height: 100px;
	width: 100%;
	background-color: transparent;
	position: relative;
	display: block;
	overflow: hidden;
`;
