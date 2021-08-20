import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import axios from "axios";

import { ClientChosenProduct } from "../../models/Product";
import { envVariables } from "../../storage/env";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";
import { Header } from "../../components";

import "react-toastify/dist/ReactToastify.css";

function Checkout() {
	const { cartProducts } = useCart();

	const [isLoading, setIsLoading] = useState(false);

	async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setIsLoading(true);

		// const pricesIdsAndquantities = () =>
		// 	cartProducts.map(product => ({
		// 		price: product._id.toString(),
		// 		quantity: parseFloat(product.bottle.amountThatWillBeBought),
		// 	}));
		const pricesIdsAndquantities = () => [
			// for test only
			{ price: "price_1JMZHdBQSnJH4whOHTPPCdJv", quantity: 2 },
		];

		try {
			// Call your backend to create the Checkout session.
			const { data } = await axios.post<{ sessionId: string }>(
				"/api/payment",
				{
					products: [...pricesIdsAndquantities()],
				},
				{
					headers: {
						"content-type": "application/json",
					},
				}
			);

			const stripe = await getStripe();
			// When the customer clicks on the button, redirect them to Checkout.
			//@ts-ignore
			const { error } = await stripe?.redirectToCheckout({
				sessionId: data.sessionId,
			});

			if (error) {
				console.log("redirectToCheckout error:", error);
				toast.error(
					`🦄 Houve um erro ao comprar o produto! Por favor, tente novamente.\n${error.message}`,
					{
						hideProgressBar: false,
						position: "top-right",
						progress: undefined,
						closeOnClick: true,
						pauseOnHover: true,
						autoClose: 5000,
						draggable: true,
					}
				);
			}
		} catch (error) {
			console.log(error);
			toast.error(`🦄 Houve um erro ao comprar o produto!\n${error.message}`, {
				hideProgressBar: false,
				position: "top-right",
				progress: undefined,
				closeOnClick: true,
				pauseOnHover: true,
				autoClose: 5000,
				draggable: true,
			});
		}

		setIsLoading(false);
	}

	// TODO: cart products
	return (
		<>
			<Header />

			<ToastContainer />

			<div className="product">
				<img
					src="https://i.imgur.com/EHyR2nP.png"
					alt="The cover of Stubborn Attachments"
				/>
				<div className="description">
					<h3>Stubborn Attachments</h3>
					<h5>$20.00</h5>
				</div>
			</div>
			<button type="button" onClick={handleClick} disabled={isLoading}>
				Checkout
			</button>
		</>
	);
}

function ProductJSXs(products: ClientChosenProduct[]) {
	return (
		<>
			{products.map(product => (
				<></>
			))}
		</>
	);
}

const typeFor_stripePromise = () =>
	loadStripe(envVariables.stripePublishableKey);

let notToUseDirectly_stripePromise: ReturnType<
	typeof typeFor_stripePromise
> | null = null;
const getStripe = () => {
	if (!notToUseDirectly_stripePromise)
		notToUseDirectly_stripePromise = loadStripe(
			envVariables.stripePublishableKey
		);

	return notToUseDirectly_stripePromise;
};

Checkout.getLayout = getLayout;

export default Checkout;
