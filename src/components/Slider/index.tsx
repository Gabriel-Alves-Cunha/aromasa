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
	const [viewportRef, embla] = useEmblaCarousel({ loop });

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
	const scrollTo = useCallback(
		index => embla && embla.scrollTo(index),
		[embla]
	);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setSelectedIndex(embla.selectedScrollSnap());
		setPrevBtnEnabled(embla.canScrollPrev());
		setNextBtnEnabled(embla.canScrollNext());
	}, [embla, setSelectedIndex]);

	useEffect(() => {
		if (!embla) return;
		onSelect();
		embla.on("select", onSelect);
	}, [embla, onSelect]);

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
