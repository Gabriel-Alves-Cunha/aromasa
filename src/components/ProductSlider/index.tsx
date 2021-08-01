import { SliderWithThumbnail } from "../SliderWithThumbnail";
import { Product } from "../../models/Product";

import { Container } from "./styles";

type ProductSliderProps = {
	setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
	selectedImage: number;
	product: Product;
};

export function ProductSlider({
	setSelectedImage,
	selectedImage,
	product,
}: ProductSliderProps) {
	return (
		<Container>
			<SliderWithThumbnail
				setSelectedImage={setSelectedImage}
				selectedImage={selectedImage}
				slides={product.images}
			/>
		</Container>
	);
}
