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

		console.log(
			`[LOG]\n\tFile: [product].tsx\n\tLine:60\n\t${typeof products}: 'products' = ${products}`
		);

		return {
			paths: products.map(product => ({
				params: {
					product: json2str(product),
				},
			})),
			fallback: "blocking",
		};
	} catch (error) {
		throw new Error(
			`File: 'pages/products/[product].tsx'\nLine:74\n${typeof error}: 'error' = ${json2str(
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
			`File: 'pages/api/products/[product].tsx'\nLine:92\n${typeof error}: 'error' = ${json2str(
				error
			)}\nHouve um problema ao pegar os produtos da base de dados.`
		);
	}
};

async function getProductsFromDB() {
	try {
		await connectToMongoDB();

		return await ProductModel.find({});
	} catch (error) {
		throw new Error(
			`File: 'pages/api/products/[product].tsx'\nLine:106\n${typeof error}: 'error' = ${json2str(
				error
			)}\nHouve um problema ao pegar os produtos da base de dados.`
		);
	}
}
