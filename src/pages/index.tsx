import type { GetServerSideProps } from "node_modules/next";

import { useRouter } from "next/router";
import { Image } from "cloudinary-react";
import Marquee from "react-fast-marquee";
import Head from "next/head";

import { Cart, LayoutWithFooter, Header, ProductCard } from "components";
import { Product, ProductModel } from "models/Product";
import { NewArrivals } from "modules/NewArrivals";
import connectToMongoDB from "utils/connectToMongoDB";

import { HeroContainer, Container } from "styles/pages";

type Props = {
	products: Product[];
};

export default function Home({ products }: Props) {
	const router = useRouter();

	const gotoProductPage = async (product: Product) =>
		await router.push(`/api/products/${product._id}`);

	return (
		<>
			<Head>
				<title>Aromasa Decor</title>
				<meta name="description" content="Página inicial da Aromasa Decor" />
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header currentPage="Home">
				<Cart />
			</Header>

			<Container>
				<HeroContainer>
					<Image
						publicId="https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/r_20/l_cloudinary_icon_blue,g_south_east,x_5,y_5,w_50,o_60,e_brightness:200/a_10/front_face.png"
						alt="Photo by Alesia Kozik from Pexels"
						className="hero_img"
						fetch-format="auto"
						quality="auto"
					/>

					<div className="text_block">
						<h1>Aromas</h1>
						<p>
							Perfumor is the place where you can get high-quality fragrances
							from certified consultants, who are not just professionals but
							also talented masters.
						</p>
					</div>
				</HeroContainer>

				<NewArrivals />

				<Marquee gradient={false} style={{ marginTop: "3em" }}>
					{products.map(product => (
						<ProductCard
							gotoProductPage={gotoProductPage}
							key={product.title}
							product={product}
						/>
					))}
				</Marquee>
			</Container>
		</>
	);
}

Home.getLayout = LayoutWithFooter;

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		await connectToMongoDB();

		const products: Product[] = await ProductModel.find({}).batchSize(3);

		console.log(
			`Products from 'getServerSideProps()' in 'pages/products/index.tsx' = ${products}`
		);

		return {
			props: { products },
		};
	} catch (errorGetServerSideProps) {
		throw new Error(
			`There was an error on 'pages/index': ${errorGetServerSideProps}`
		);
	}
};
