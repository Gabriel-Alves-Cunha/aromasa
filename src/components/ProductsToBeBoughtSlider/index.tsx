import { ClientChosenProduct } from "../../models/Product";
import { ThumbnailSlider } from "../ThumbnailSlider";

import { Container } from "./styles";

type ProductToBeBoughtSliderProps = {
	setSelectedProduct: React.Dispatch<React.SetStateAction<number>>;
	productsToBeBought: ClientChosenProduct[];
	selectedProduct: number;
};

export function ProductsToBeBoughtSlider({
	productsToBeBought,
	setSelectedProduct,
	selectedProduct,
}: ProductToBeBoughtSliderProps) {
	const imagesSources = productsToBeBought
		.map(product => product.images)
		.flat();

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
