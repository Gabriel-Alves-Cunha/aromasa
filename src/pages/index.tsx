import { ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";

import bg from "../assets/bg.jpg";

import { HeroContainer, Container } from "../styles/pages";
import { NewArrivals } from "../modules/NewArrivals";
import { Instagram } from "../components/Instagram";
import { Product } from "../models/Product";
import Layout from "../components/Layout";

function Home() {
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
				<meta name="description" content="Página inicial da Aromasa Decor" />
				<link rel="icon" href="/favicon.png" />
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
