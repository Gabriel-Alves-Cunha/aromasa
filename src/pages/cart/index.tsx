import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

import { ProductsToBeBoughtSlider } from "../../components/ProductsToBeBoughtSlider";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";

import { Container, SecondVH } from "./styles";

function Cart() {
	const router = useRouter();
	const {
		getSubtotal,
		cartProducts,
		handleAddToCart,
		handleRemoveFromCart,
		handleSubtractAmount,
	} = useCart();

	const [error, setError] = useState("");

	function Pay() {
		(function checkIfAllProductsAreAvailable() {
			for (const product of cartProducts) {
				if (!product.isAvailable)
					setError(
						`Descupe-nos 😢, mas o produto ${product.title} não está mais disponível!\nSua intenção de comprá-lo foi comunicada.`
					);
				else if (product.amountThatWillBeBought > product.availableAmount)
					setError(
						`Descupe-nos 😢, mas o produto ${product.title} só tem ${product.availableAmount} unidade(s) disponíveis.\nSua intenção de comprá-lo foi comunicada.`
					);
				else if (
					product.chosen_bottle.available_quantity <
					product.amountThatWillBeBought
				)
					setError(
						`Descupe-nos 😢, mas o produto ${product.title} só tem ${product.chosen_bottle.available_quantity} unidade(s) no formato ${product.chosen_bottle.bottle_format} disponível(is)\nSua intenção de comprá-lo foi comunicada.`
					);
			}
		})();

		if (!error) router.push("/payment");
	}

	return (
		<Container>
			<Head>
				<title>Aromasa Decor - Carrinho</title>
				<meta name="description" content="Carrinho" />
			</Head>

			<SecondVH>
				{/* <ProductsToBeBoughtSlider
					setSelectedProduct={setSelectedProduct}
					productsToBeBought={cartProducts}
					selectedProduct={selectedProduct}
				/> */}
			</SecondVH>
		</Container>
	);
}

Cart.getLayout = getLayout;

export default Cart;
