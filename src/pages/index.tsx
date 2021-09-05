import Image from "next/image";
import Head from "next/head";

import bg from "/assets/bg.jpg";

import { getLayout, Header } from "components";
import { NewArrivals } from "modules/NewArrivals";

import { HeroContainer, Container } from "styles/pages";

function Home() {
	return (
		<>
			<Header currentPage="Home" />

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
							Perfumor is the place where you can get high-quality fragrances
							from certified consultants, who are not just professionals but
							also talented masters.
						</p>
					</div>
				</HeroContainer>

				<NewArrivals />
			</Container>
		</>
	);
}

Home.getLayout = getLayout;

export default Home;
