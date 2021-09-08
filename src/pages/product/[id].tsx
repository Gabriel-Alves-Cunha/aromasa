import { GetStaticPaths, GetStaticProps } from "node_modules/next";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import { ProductSlider_WithThumbnail, Header, getLayout } from "components";
import { Product } from "models/Product";
import connectToMongoDB from "utils/connectToMongoDB";

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

function ProductCard({ product }: Props) {
	const router = useRouter();

	return (
		<>
			<Header currentPage="Home" />

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
		</>
	);
}

ProductCard.getLayout = getLayout;

export default ProductCard;

export const getStaticPaths: GetStaticPaths = async ctx => {
	try {
		await connectToMongoDB();

		const {
			data: products,
			statusText,
			status,
		} = await axios.get<Product[]>("api/products");

		console.log(
			`[LOG]\n\tFile: [id].tsx\n\tLine:69\n\t${typeof products}: 'products' =`,
			products
		);

		if (status === 200) {
			return {
				paths: products.map(product => ({
					params: {
						productStringifyed: JSON.stringify(product),
					},
				})),
				fallback: false,
			};
		} else
			throw new Error(
				`[LOG]\n\tFile: [id].tsx\n\tLine:84\n\t${typeof products}: 'data: products' = ${products}\nHouve um problema ao pegar os produtos da base de dados. Status = ${status} (${statusText}).`
			);
	} catch (error) {
		throw new Error(
			"[LOG]\n\tFile: 'pages/product/[id].tsx'\n\tLine:94\n\t${typeof error}: 'error' = ${error}\nHouve um problema ao pegar os produtos da base de dados.\n" +
				error
		);
	}
};

export const getStaticProps: GetStaticProps = async ctx => {
	console.log("\ngetStaticProps ctx =", ctx);
	try {
		// const { data: product } = await axios.get<Product>(
		// 	`api/products/${ctx.params?.id}`
		// );
		const product: Product = JSON.parse(
			ctx.params?.productStringifyed as string
		);
		console.log("\nproduct =", product);

		return {
			props: { product },
		};
	} catch (error) {
		throw new Error(
			`[ERROR] File: [id].tsx\nLine:120\n${typeof error}: 'error'\nHouve um problema ao pegar os produtos da base de dados: ${error}`
		);
	}
};
