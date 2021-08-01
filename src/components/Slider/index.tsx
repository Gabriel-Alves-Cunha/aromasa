import { useCallback, useEffect, useState } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";

import { Bullets } from "../Bullets";
import { Arrow } from "../Arrow";

import { Embla, EmblaContainer, EmblaViewport, Slide } from "./styles";

type Props = {
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
	slides: StaticImageData[];
	selectedIndex: number;
	loop?: boolean;
};

export function Slider({
	setSelectedIndex,
	selectedIndex,
	loop = false,
	slides,
}: Props) {
	const [viewportRef, emblaApi] = useEmblaCarousel({ loop });

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);
	const scrollTo = useCallback(
		index => emblaApi && emblaApi.scrollTo(index),
		[emblaApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, [emblaApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<Embla>
			<EmblaViewport ref={viewportRef}>
				<EmblaContainer>
					{slides.map(slide => (
						<Slide key={slide.src}>
							<Image layout="fill" objectFit="cover" src={slide} />
						</Slide>
					))}
				</EmblaContainer>

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

				<Bullets
					activeSlide={selectedIndex}
					onClick={scrollTo}
					slides={slides}
				/>
			</EmblaViewport>
		</Embla>
	);
}
