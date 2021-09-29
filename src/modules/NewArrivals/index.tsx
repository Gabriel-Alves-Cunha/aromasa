import { Fragment, useState } from "react";

import { Slider } from "components/Slider";
import { slides } from "./helper";

import { Container, SlideInfo, SliderContainer } from "./styles";

export function NewArrivals() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<Container>
			<SliderContainer>
				<Slider
					slidesUrls={slides.map(({ url }) => url)}
					setSelectedIndex={setSelectedIndex}
					selectedIndex={selectedIndex}
				/>
			</SliderContainer>

			<SlideInfo>
				<h1>NOVOS PRODUTOS</h1>

				{slides.map(
					({ name, info }, index) =>
						index === selectedIndex && (
							<Fragment key={name}>
								<h4>{name}</h4>
								<p>{info}</p>
							</Fragment>
						)
				)}
			</SlideInfo>
		</Container>
	);
}
