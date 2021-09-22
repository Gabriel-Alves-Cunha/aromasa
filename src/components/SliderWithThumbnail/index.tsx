import { memo, useCallback, useEffect, useState } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { Image } from "cloudinary-react";

import { Arrow } from "components";

import {
	EmblaSlideButton,
	EmblaSlideInner,
	EmblaContainer,
	EmblaViewport,
	EmblaSlide,
	Container,
	Embla,
} from "./styles";

type Props = {
	setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
	selectedImage: number;
	slides: string[];
};

export function SliderWithThumbnail({
	setSelectedImage,
	selectedImage,
	slides,
}: Props) {
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [mainViewportRef, emblaApi] = useEmblaCarousel({
		skipSnaps: false,
	});
	const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		selectedClass: "",
		dragFree: true,
	});

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaApi || !emblaThumbsApi) return;

			if (emblaThumbsApi.clickAllowed()) emblaApi.scrollTo(index);
		},
		[emblaApi, emblaThumbsApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaApi || !emblaThumbsApi) return;

		setSelectedImage(emblaApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());

		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, [emblaApi, emblaThumbsApi, setSelectedImage]);

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.on("select", onSelect);
		onSelect();
	}, [emblaApi, onSelect]);

	return (
		<Container>
			<Embla>
				<EmblaViewport ref={mainViewportRef}>
					<EmblaContainer>
						{slides.map(slide => (
							<EmblaSlide key={slide}>
								<EmblaSlideInner>
									<MainSliderImg slide={slide} />
								</EmblaSlideInner>
							</EmblaSlide>
						))}
					</EmblaContainer>
				</EmblaViewport>

				<Arrow
					enabled={prevBtnEnabled}
					handleClick={scrollPrev}
					direction="left"
				/>
				<Arrow
					enabled={nextBtnEnabled}
					handleClick={scrollNext}
					direction="right"
				/>
			</Embla>

			<Embla className="embla--thumb">
				<EmblaViewport ref={thumbViewportRef}>
					<EmblaContainer className="embla__container--thumb">
						{slides.map((slide, index) => (
							<Thumb
								isSelected={index === selectedImage}
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

//////////////////////////////////////

function _MainSliderImg({ slide }: { slide: string }) {
	return (
		<EmblaSlide key={slide}>
			<EmblaSlideInner>
				<Image
					className="embla-slide-img"
					src={slide}
					alt=""
				/>
			</EmblaSlideInner>
		</EmblaSlide>
	);
}

const MainSliderImg = memo(_MainSliderImg);

//////////////////////////////////////

type ThumbProps = {
	isSelected: boolean;
	onClick(): void;
	imgSrc: string;
};

function _Thumb({ isSelected, onClick, imgSrc }: ThumbProps) {
	return (
		<EmblaSlide
			className={`embla__slide--thumb ${isSelected ? "is-selected" : ""}`}
		>
			<EmblaSlideButton onClick={onClick}>
				<Image
					className="embla-slide-thumb-img embla__slide__thumbnail"
					src={imgSrc}
					alt=""
				/>
			</EmblaSlideButton>
		</EmblaSlide>
	);
}

const Thumb = memo(_Thumb);
