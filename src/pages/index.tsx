import { FormEvent } from "react";
import Image from "next/image";
import Head from "next/head";

import bg from "../assets/bg.jpg";

import { NewArrivals } from "../modules/NewArrivals";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import {
	HeroContainer,
	Container,
} from "../styles/pages";
import { Instagram } from "../components/Instagram";

export default function Home() {
	function handleSignUpToNewsletter(event: FormEvent) {
		event.preventDefault();

		// axios.post("/api/subscribe", { email });
	}

	return (
		<Container>
			<Head>
				<title>Aromasa Decor</title>
				<meta name="description" content="Homepage of Aromasa Decor" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header currentPage="Home" />

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

			<Footer />
		</Container>
	);
}
