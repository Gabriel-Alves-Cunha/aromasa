import { FaCartPlus } from "react-icons/fa";
import Image from "next/image";

import { Product } from "../../models/Product";

import { Container, Info, Title, Description, Price } from "./styles";

export function ProductCard(product: Product) {
	function handleAddToCart(product: Product) {}

	return (
		<Container>
			<Image src={product.images[0] as string} layout="fill" />

			<Info>
				<Title>{product.title}</Title>
				<Description>{product.description}</Description>
				<Price>R$ {product.price}</Price>
			</Info>

			<FaCartPlus
				onClick={() => handleAddToCart(product)}
				data-tip="Add to cart"
			/>
		</Container>
	);
}
