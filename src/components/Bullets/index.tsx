import { memo } from "react";

import { Container, Span } from "./styles";

type BulletsProps = {
	onClick(index: number): void;
	slidesUrls: string[];
	activeSlide: number;
};

export type BulletProps = {
	onClick(index: number): void;
	active: boolean;
	index: number;
};

export function Bullets({ slidesUrls, activeSlide, onClick }: BulletsProps) {
	return (
		<Container>
			{slidesUrls.map((slideUrl, i) => (
				<Bullet
					active={activeSlide === i}
					onClick={onClick}
					key={slideUrl}
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
