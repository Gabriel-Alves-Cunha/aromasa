import { GetStaticPaths, GetStaticProps } from "node_modules/next";
import { useRouter } from "next/router";
import Head from "next/head";

import { ProductSlider_WithThumbnail, Header, getLayout } from "components";
import { Product, ProductModel } from "models/Product";
import { json2str } from "utils/json2str";
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

export default function ProductCard({ product }: Props) {
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

ProductCard.getLayout = getLayout;

export const getStaticPaths: GetStaticPaths = async ctx => {
	try {
		const products = await getProductsFromDB();

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
			`File: 'pages/products/[product].tsx'\nLine:72\n${typeof errorGetStaticPaths}: 'error' = ${errorGetStaticPaths}\nHouve um problema ao pegar os produtos da base de dados.`
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

		const products = await ProductModel.find({});
		console.log("\nFrom 'pages/[product].tsx: products =", products);

		return products;
	} catch (errorGetProductsFromDB) {
		throw new Error(
			`File: 'pages/[product].tsx'\nLine:106\n${typeof errorGetProductsFromDB}: 'errorGetProductsFromDB' = ${json2str(
				errorGetProductsFromDB
			)}\nHouve um problema ao pegar os produtos da base de dados.`
		);
	}
}
