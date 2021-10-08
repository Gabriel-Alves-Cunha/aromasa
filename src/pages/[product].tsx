import type { GetStaticPaths, GetStaticProps } from "node_modules/next";

import { useRouter } from "next/router";
import Head from "next/head";

import { Product, ProductModel } from "models/Product";
import { json2str } from "utils/json2str";
import {
	ProductSlider_WithThumbnail,
	LayoutWithFooter,
	Header,
} from "components";
import connectToMongoDB from "utils/connectToMongoDB";

import {
	ProductSliderContainer,
	FirstViewHeight,
	InfoContainer,
	Container,
	Details,
	Title,
} from "styles/pages/product";

type Props = {
	product: Product;
};

export default function ProductPage({ product }: Props) {
	console.log("Client-side product =", product);
	// TODO: add carts for more products
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Aromasa Decor - Produto</title>
				<meta name="description" content="Produto" />
			</Head>

			<Header currentPage="Home" />

			<Container>
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

ProductPage.getLayout = LayoutWithFooter;

export const getStaticPaths: GetStaticPaths = async ctx => {
	try {
		const products = await getProductsFromDB();
		console.log("\nFrom 'pages/[product].tsx: products =", products);

		return {
			paths: products.map(product => ({
				params: {
					product: JSON.stringify(product),
				},
			})),
			fallback: "blocking",
		};
	} catch (errorGetStaticPaths) {
		throw new Error(
			`Houve um problema ao pegar os produtos da base de dados.\nFile: 'pages/products/[product].tsx'\nLine:78\n${typeof errorGetStaticPaths}: 'errorGetStaticPaths' = ${errorGetStaticPaths}\n`
		);
	}
};

export const getStaticProps: GetStaticProps = ctx => {
	console.log("\ngetStaticProps ctx =", ctx);

	const product: Product = JSON.parse(ctx.params?.product as string);
	console.log("\nproduct =", product);

	return {
		props: { product },
	};
};

async function getProductsFromDB() {
	try {
		await connectToMongoDB();

		return await ProductModel.find({});
	} catch (errorGetProductsFromDB) {
		throw new Error(
			`Houve um problema ao pegar os produtos da base de dados:\nFile: 'pages/[product].tsx'\nLine:101\n${typeof errorGetProductsFromDB}: 'errorGetProductsFromDB' = ${json2str(
				errorGetProductsFromDB
			)}\n`
		);
	}
}
