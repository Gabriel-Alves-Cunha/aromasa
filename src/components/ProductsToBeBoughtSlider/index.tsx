import { useState } from "react";

import { ClientChosenProduct } from "models/Product";
import { ThumbnailSlider } from "components";

import { Container } from "./styles";

type ProductToBeBoughtSliderProps = {
	productsToBeBought: ClientChosenProduct[];
};

export function ProductsToBeBoughtSlider({
	productsToBeBought,
}: ProductToBeBoughtSliderProps) {
	const [selectedProduct, setSelectedProduct] = useState(0);

	const imagesSources = productsToBeBought.map(product => product.imagePath);

	return (
		<Container>
			<ThumbnailSlider
				setSelectedProduct={setSelectedProduct}
				selectedProduct={selectedProduct}
				slides={imagesSources}
			/>
		</Container>
	);
}
