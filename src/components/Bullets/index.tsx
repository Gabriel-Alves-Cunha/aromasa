import { memo } from "react";

import { Container, Span } from "./styles";

type BulletsProps = {
	onClick(index: number): void;
	activeSlide: number;
	slides: string[];
};

export type BulletProps = {
	onClick(index: number): void;
	active: boolean;
	index: number;
};

export function Bullets({ slides, activeSlide, onClick }: BulletsProps) {
	return (
		<Container>
			{slides.map((slide, i) => (
				<Bullet
					active={activeSlide === i}
					onClick={onClick}
					key={slide}
					index={i}
				/>
			))}
		</Container>
	);
}

function _Bullet({ active, onClick, index }: BulletProps) {
	return <Span active={active} onClick={() => onClick(index)} />;
}

const Bullet = memo(_Bullet);
