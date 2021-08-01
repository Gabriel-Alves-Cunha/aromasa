import type { Currency } from "mercadopago/shared/currency";
import { useState } from "react";
import Script from "next/script";
import axios from "axios";
import Head from "next/head";

import type { Shipment, Items } from "../api/payment/index_types";
import { useCart } from "../../hooks/useCart";

import { Container } from "./styles";

const public_key = "TEST-c9aecdec-b99d-4b94-8fa7-683064adc1de";

export default function Payment() {
	const { cartProducts } = useCart();

	const [error, setError] = useState("");

	const shipmentDetails: Shipment = { cost: 100, mode: "not_specified" };

	const itemsThatWillBeBought: Items = cartProducts
		.map(product => ({
			_id: product._id,
			title: product.title,
			description: truncate(product.description, 250),
			currency_id: "BRL" as Currency,
			unit_price: product.price,
			quantity: product.amountThatWillBeBought > 0 ? product.amountThatWillBeBought : 1,
			picture_url: product.images[0],
		}))
		.slice(18);

	// console.log("itemsThatWillBeBought =", itemsThatWillBeBought);

	const getPreferenceId = async () => {
		const res = await axios.post("api/payment", {
			itemsThatWillBeBought,
			shipmentDetails,
		});

		console.log(res);

		return res;
	};

	return (
		<Container>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<title>Aromasa Decor - Pagamento</title>
				<meta name="description" content="Pagamento" />
			</Head>

			<div className="cho-container" />

			<Script
				src="https://sdk.mercadopago.com/js/v2"
				onLoad={async () => {
					// Adicione as credenciais do SDK
					// @ts-ignore:
					const mp = new MercadoPago(public_key, { locale: "pt-BR" });

					const res = await getPreferenceId();
					const { preference_id } = res.data;

					// Inicialize o checkout
					mp.checkout({
						preference: {
							id: preference_id,
						},
						render: {
							container: ".cho-container", // Indica o nome da class onde será exibido o botão de pagamento
							label: "Pagar", // Muda o texto do botão de pagamento (opcional)
						},
						autoOpen: true,
					});
				}}
			/>
		</Container>
	);
}

function truncate(str: string, n: number) {
	return str.length > n ? str.substr(0, n - 1) + "\u2026" : str;
}
