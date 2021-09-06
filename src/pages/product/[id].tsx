import { GetStaticPaths, GetStaticProps } from "node_modules/next";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import { ProductSlider_WithThumbnail, Header, getLayout } from "components";
import { Product } from "models/Product";
import connectToDatabase from "utils/connectToMongoDB";

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
		await connectToDatabase();

		const { data: products, status } = await axios.get<Product[]>(
			"api/products"
		);

		if (status === 200) {
			return {
				paths: products.map(product => ({
					params: {
						id: product._id.toString(),
						product: JSON.stringify(product),
					},
				})),
				fallback: false,
			};
		} else {
			console.log(
				`[LOG]\n\tFile: [id].tsx\n\tLine:81\n\t${typeof products}: 'data: products' =`,
				products
			);

			throw new Error(
				"Houve um problema ao pegar os produtos da base de dados."
			);
		}
	} catch (error) {
		console.log(
			`[LOG]\n\tFile: 'pages/product/[id].tsx'\n\tLine:88\n\t${typeof error}: 'error' =`,
			error
		);

		throw new Error("Houve um problema ao pegar os produtos da base de dados.");
	}
};

export const getStaticProps: GetStaticProps = async ctx => {
	console.log("\ngetStaticProps ctx =", ctx);
	try {
		// const { data: product } = await axios.get<Product>(
		// 	`api/products/${ctx.params?.id}`
		// );
		const product = JSON.parse(ctx.params?.product as string);
		console.log("\nproduct =", product);

		return {
			props: { product },
		};
	} catch (error) {
		console.log(
			`[ERROR] File: [id].tsx\nLine:113\n${typeof error}: 'error' =`,
			error
		);

		return {
			props: { product: {} },
		};
	}
};
