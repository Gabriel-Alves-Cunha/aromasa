import { ClientChosenProduct, Product } from "../../models/Product";
import { ThumbnailSlider } from "../ThumbnailSlider";

import { Container } from "./styles";

type Props = {
	products: Product[] | ClientChosenProduct[];
};

export function ShowProductsSlider({ products }: Props) {
	const imgsSrc = products.map(product => product.images).flat();
	// console.log(imgsSrc);

	return (
		<Container>
			<ThumbnailSlider slides={imgsSrc} />
		</Container>
	);
}
