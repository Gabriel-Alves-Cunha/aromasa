import { GetStaticPaths, GetStaticProps } from "node_modules/next";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import { ProductSlider_WithThumbnail, Header, getLayout } from "components";
import { axiosInstance } from "hooks/useAxios";
import { Product, ProductModel } from "models/Product";
import talkToDbToGetProducts from "../api/products";
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
		const products = await getProductsFromDB();

		console.log(
			`[LOG]\n\tFile: [product].tsx\n\tLine:65\n\t${typeof products}: 'products' = ${products}`
		);

		return {
			paths: products.map(product => ({
				params: {
					product: j(product),
				},
			})),
			fallback: "blocking",
		};
	} catch (error) {
		throw new Error(
			`File: 'pages/products/[product].tsx'\nLine:92\n${typeof error}: 'error' = ${j(
				error
			)}\nHouve um problema ao pegar os produtos da base de dados.`
		);
	}
};

export const getStaticProps: GetStaticProps = async ctx => {
	console.log("\ngetStaticProps ctx =", ctx);
	try {
		const product: Product = JSON.parse(ctx.params?.product as string);
		console.log("\nproduct =", product);

		return {
			props: { product },
		};
	} catch (error) {
		throw new Error(
			`File: 'pages/api/products/[product].tsx'\nLine:112\n${typeof error}: 'error' = ${j(
				error
			)}\nHouve um problema ao pegar os produtos da base de dados.`
		);
	}
};

const j = (any: any) => JSON.stringify(any, null, 2);

async function getProductsFromDB() {
	try {
		await connectToMongoDB();

		return await ProductModel.find({});
	} catch (error) {
		throw new Error(
			`File: 'pages/api/products/[product].tsx'\nLine:118\n${typeof error}: 'error' = ${error}\nHouve um problema ao pegar os produtos da base de dados.`
		);
	}
}
