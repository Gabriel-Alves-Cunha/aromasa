import Image from "next/image";
import Head from "next/head";

import { ShowProductsSlider } from "../../components/ShowProductsSlider";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";

import { Container, SliderContainer, FirstPart } from "./styles";

function Buy() {
	const {
		getSubtotal,
		cartProducts,
		handleAddToCart,
		handleRemoveFromCart,
		handleSubtractAmount,
	} = useCart();

	return (
		<Container>
			<Head>
				<title>Aromasa Decor - Checkout</title>
				<meta name="description" content="Checkout" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<FirstPart>
				<SliderContainer>
					<ShowProductsSlider products={cartProducts} />
				</SliderContainer>
			</FirstPart>
		</Container>
	);
}

Buy.getLayout = getLayout;

export default Buy;
