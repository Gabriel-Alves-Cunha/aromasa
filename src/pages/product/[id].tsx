import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

import { ProductSlider } from "../../components/ProductSlider";
import { Product } from "../../models/Product";

import {
	ProductSliderContainer,
	InfoContainer,
	Container,
	Details,
	FirstVH,
	Title,
} from "./styles";

type Props = {
	product: Product;
};

export default function ProductCard({ product }: Props) {
	const router = useRouter();

	const [selectedImage, setSelectedImage] = useState(0);

	async function goToProductCardPageOf(product: Product) {
		router.push(`product/${product._id}`);
	}

	return (
		<Container>
			<Head>
				<title>Aromasa Decor - Produto</title>
				<meta name="description" content="Produto" />
			</Head>

			<FirstVH>
				<ProductSliderContainer>
					<ProductSlider
						setSelectedImage={setSelectedImage}
						selectedImage={selectedImage}
						product={product}
					/>
				</ProductSliderContainer>

				<InfoContainer>
					<Title>{product.title}</Title>

					<Details>{product.category}</Details>
				</InfoContainer>
			</FirstVH>
		</Container>
	);
}

export const getStaticProps: GetStaticProps = async ctx => {
	console.log(ctx);

	const { data: product } = await axios.get<Product>(
		`api/products/${ctx.params?._id}`
	);

	return {
		props: { product },
	};
};
