import { Fragment, useState } from "react";

import { Slider } from "../../components/Slider";
import { slides } from "./helper";

import { Container, SlideInfo, SliderContainer } from "./styles";

export function NewArrivals() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<Container>
			<SliderContainer>
				<Slider
					slides={slides.map(({ img }) => img)}
					setSelectedIndex={setSelectedIndex}
					selectedIndex={selectedIndex}
				/>
			</SliderContainer>

			<SlideInfo>
				<h4>NOVOS PRODUTOS</h4>

				{slides.map(
					({ name, info }, index) =>
						index === selectedIndex && (
							<Fragment key={name}>
								<h1>{name}</h1>
								<p>{info}</p>
							</Fragment>
						)
				)}
			</SlideInfo>
		</Container>
	);
}
