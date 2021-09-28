import { useCallback, useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import useEmblaCarousel from "embla-carousel-react";

import { Arrow, Bullets } from "components";

import { Embla, EmblaContainer, EmblaViewport, Slide } from "./styles";

type Props = {
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
	selectedIndex: number;
	slidesUrls: string[];
	loop?: boolean;
};

export function Slider({
	setSelectedIndex,
	selectedIndex,
	loop = false,
	slidesUrls,
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
					{slidesUrls.map(slideUrl => (
						<Slide key={slideUrl}>
							<Image src={slideUrl} alt="" />
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
					slidesUrls={slidesUrls}
					onClick={scrollTo}
				/>
			</EmblaViewport>
		</Embla>
	);
}
