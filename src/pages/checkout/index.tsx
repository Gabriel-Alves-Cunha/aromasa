import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import axios from "axios";

import { envVariables } from "../../storage/env";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";

import "react-toastify/dist/ReactToastify.css";

function Checkout() {
	const { cartProducts } = useCart();

	const [isLoading, setIsLoading] = useState(false);

	async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
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
			// When the customer clicks on the button, redirect them to Checkout.
			const stripe = await getStripe();
			console.log("StripePromise");

			//@ts-ignore
			const { error } = await stripe?.redirectToCheckout({
				sessionId: data.sessionId,
			});
			console.log("redirectToCheckout. Error =", error);

			if (error) {
				console.log("redirectToCheckout error:", error);
				toast.error(
					`🦄 Houve um erro ao comprar o produto!\n${error.message}`,
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
