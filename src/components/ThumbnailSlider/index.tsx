import { memo, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import {
	EmblaSlideButton,
	EmblaContainer,
	EmblaViewport,
	EmblaSlide,
	Container,
	Embla,
} from "./styles";

type ThumbnailSliderProps = {
	setSelectedProduct: React.Dispatch<React.SetStateAction<number>>;
	selectedProduct: number;
	slides: string[];
};

export function ThumbnailSlider({
	setSelectedProduct,
	selectedProduct,
	slides,
}: ThumbnailSliderProps) {
	const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		selectedClass: "",
		dragFree: true,
	});

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaThumbsApi) return;

			if (emblaThumbsApi.clickAllowed()) setSelectedProduct(index);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[emblaThumbsApi]
	);

	return (
		<Container>
			<Embla className="embla--thumb">
				<EmblaViewport ref={thumbViewportRef}>
					<EmblaContainer className="embla__container--thumb">
						{slides.map((slide, index) => (
							<Thumb
								isSelected={index === selectedProduct}
								onClick={() => onThumbClick(index)}
								imgSrc={slide}
								key={slide}
							/>
						))}
					</EmblaContainer>
				</EmblaViewport>
			</Embla>
		</Container>
	);
}

type ThumbProps = {
	isSelected: boolean;
	onClick(): void;
	imgSrc: string;
};

function _Thumb({ isSelected, onClick, imgSrc }: ThumbProps) {
	return (
		<EmblaSlide
			className={`embla__slide--thumb ${isSelected && "is-selected"}`}
		>
			<EmblaSlideButton onClick={onClick}>
				<Image
					className="embla-slide-thumb-img embla__slide__thumbnail"
					layout="fill"
					src={imgSrc}
					alt=""
				/>
			</EmblaSlideButton>
		</EmblaSlide>
	);
}

const Thumb = memo(_Thumb);
