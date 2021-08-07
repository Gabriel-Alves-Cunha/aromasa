import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

import { ProductSlider_WithThumbnail } from "../../components/ProductSlider_WithThumbnail";
import { Product } from "../../models/Product";

import {
	ProductSliderContainer,
	FirstViewHeight,
	InfoContainer,
	Container,
	Details,
	Title,
} from "./styles";

type Props = {
	product: Product;
};

export default function ProductCard({ product }: Props) {
	const router = useRouter();

	async function goToPageOfProduct(product: Product) {
		router.push(`product/${product._id.toString()}`);
	}

	return (
		<Container>
			<Head>
				<title>Aromasa Decor - Produto</title>
				<meta name="description" content="Produto" />
			</Head>

			<FirstViewHeight>
				<ProductSliderContainer>
					<ProductSlider_WithThumbnail imagesPaths={product.imagesPaths} />
				</ProductSliderContainer>

				<InfoContainer>
					<Title>{product.title}</Title>

					<Details>
						{product.categories.map(category => category + ", ")}
					</Details>
				</InfoContainer>
			</FirstViewHeight>
		</Container>
	);
}

export const getStaticProps: GetStaticProps = async ctx => {
	console.log("\ngetStaticProps ctx =", ctx);
	try {
		const { data: product } = await axios.get<Product>(
			`api/products/${ctx.params?._id?.toString()}`
		);
		console.log("\nproduct =", product);

		return {
			props: { product },
		};
	} catch (error) {
		console.log(`❗ File: [id].tsx\nLine:66\n${typeof error}: 'error'`, error);

		return {
			props: { product: {} },
		};
	}
};
