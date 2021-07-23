import { useState, useEffect, FormEvent, ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";

import bg from "../assets/bg.jpg";

import { ShowProductsSlider } from "../components/ShowProductsSlider";
import { HeroContainer, Container } from "../styles/pages";
import { NewArrivals } from "../modules/NewArrivals";
import { Instagram } from "../components/Instagram";
import { useAxios } from "../hooks/useAxios";
import { Product } from "../models/Product";
import Layout from "../components/Layout";

type UseAxiosResponse = {
	success: boolean;
	data: Product[];
};

function Home() {
	// const { data, error } = useAxios<UseAxiosResponse>("GET", "api/products");

	// const [allProducts, setAllProducts] = useState([] as Product[]);

	// useEffect(() => {
	// 	if (data?.data) {
	// 		const { data: products } = data.data;
	// 		console.log(products);
	// 		setAllProducts(products);
	// 	}

	// 	if (error) console.error(error);
	// }, [data, error]);

	// async function insertProduct(event: FormEvent) {
	// 	event.preventDefault();

	// 	const res = await useAxios<Product>("POST", "api/products", {
	// 		description: "Produto false nº 1",
	// 		category: "Falsiane",
	// 		images: [],
	// 		title: "Falsê",
	// 		price: "100,00",
	// 		availableAmount: 100,
	// 		isAvailable: true,
	// 	});

	// 	console.log(JSON.stringify(res));
	// 	console.log("Hello");
	// }

	return (
		<Container>
			<Head>
				<title>Aromasa Decor</title>
				<meta name="description" content="Homepage of Aromasa Decor" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<HeroContainer>
				<Image
					alt="Photo by Alesia Kozik from Pexels"
					className="hero_img"
					objectFit="cover"
					priority
					src={bg}
				/>

				<div className="text_block">
					<h2>Aromas</h2>
					<p>
						Perfumor is the place where you can get high-quality fragrances from
						certified consultants, who are not just professionals but also
						talented masters.
					</p>
				</div>
			</HeroContainer>

			<NewArrivals />

			<Instagram />
		</Container>
	);
}

Home.getLayout = (page: ReactNode) => (
	<Layout currentPage="Home">{page}</Layout>
);

export default Home;
