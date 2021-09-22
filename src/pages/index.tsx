import { Image as CImage } from "cloudinary-react";
import Image from "next/image";
import Head from "next/head";

import { getLayout, Header } from "components";
import { NewArrivals } from "modules/NewArrivals";

import Bg from "public/images/Bg.jpg";

import { HeroContainer, Container } from "styles/pages";

export default function Home() {
	return (
		<>
			<Head>
				<title>Aromasa Decor</title>
				<meta name="description" content="Página inicial da Aromasa Decor" />
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header currentPage="Home" />

			<Container>
				<HeroContainer>
					{/* <Image
						alt="Photo by Alesia Kozik from Pexels"
						className="hero_img"
						objectFit="cover"
						priority
						src={Bg}
					/> */}
					<CImage
						publicId="https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/r_20/l_cloudinary_icon_blue,g_south_east,x_5,y_5,w_50,o_60,e_brightness:200/a_10/front_face.png"
						fetch-format="auto"
						quality="auto"
						className="hero_img"
						alt="Photo by Alesia Kozik from Pexels"
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
