import Image from "next/image";
import Head from "next/head";

import { useCart } from "../../hooks/useCart";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import { Container } from "./styles";

export default function Buy() {
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

			<Header />

			<div></div>

			<Footer />
		</Container>
	);
}
