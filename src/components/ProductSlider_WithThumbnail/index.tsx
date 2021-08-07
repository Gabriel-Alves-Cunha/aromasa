import { SliderWithThumbnail } from "../SliderWithThumbnail";
import { useState } from "react";

import { Container } from "./styles";

type ProductSliderProps = {
	imagesPaths: string[];
};

export function ProductSlider_WithThumbnail({
	imagesPaths,
}: ProductSliderProps) {
	const [selectedImage, setSelectedImage] = useState(0);

	return (
		<Container>
			<SliderWithThumbnail
				setSelectedImage={setSelectedImage}
				selectedImage={selectedImage}
				slides={imagesPaths}
			/>
		</Container>
	);
}
