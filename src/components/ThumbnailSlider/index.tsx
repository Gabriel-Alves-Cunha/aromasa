import { memo, useCallback, useEffect, useState } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";

import { Arrow } from "../Arrow";

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
	slides: string[];
};

export function ThumbnailSlider({ slides }: Props) {
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [mainViewportRef, embla] = useEmblaCarousel({
		skipSnaps: false,
	});
	const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
		containScroll: "keepSnaps",
		selectedClass: "",
		dragFree: true,
	});

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!embla || !emblaThumbs) return;

			if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
		},
		[embla, emblaThumbs]
	);

	const onSelect = useCallback(() => {
		if (!embla || !emblaThumbs) return;

		setSelectedIndex(embla.selectedScrollSnap());
		emblaThumbs.scrollTo(embla.selectedScrollSnap());

		setPrevBtnEnabled(embla.canScrollPrev());
		setNextBtnEnabled(embla.canScrollNext());
	}, [embla, emblaThumbs, setSelectedIndex]);

	useEffect(() => {
		if (!embla) return;

		embla.on("select", onSelect);
		onSelect();
	}, [embla, onSelect]);

	return (
		<Container>
			<Embla>
				<EmblaViewport ref={mainViewportRef}>
					<EmblaContainer>
						{slides.map((slide, index) => (
							<EmblaSlide key={slide + index}>
								<EmblaSlideInner>
									<MainSliderImg slide={slide} index={index} />
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
								onClick={() => onThumbClick(index)}
								isSelected={index === selectedIndex}
								imgSrc={slide}
								key={index}
							/>
						))}
					</EmblaContainer>
				</EmblaViewport>
			</Embla>
		</Container>
	);
}

//////////////////////////////////////

type MainSliderImgProps = {
	slide: string;
	index: number;
};

function _MainSliderImg({ slide, index }: MainSliderImgProps) {
	return (
		<EmblaSlide key={slide + index}>
			<EmblaSlideInner>
				<Image className="embla-slide-img" src={slide} layout="fill" />
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
					layout="fill"
				/>
			</EmblaSlideButton>
		</EmblaSlide>
	);
}

const Thumb = memo(_Thumb);
