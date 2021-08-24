import { toast, ToastContainer } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import cep from "cep-promise";

import { defaultValues, FrenetForm, getStripe, yupSchema } from "./helper";
import { CheckoutCardForProduct } from "../../components/CheckoutCardForProduct";
import { ClientChosenProduct } from "../../models/Product";
import { envVariables } from "../../storage/env";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";
import { Header } from "../../components";

import { useStyles } from "./styles";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
	const { cartProducts } = useCart();
	const classes = useStyles();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm<FrenetForm>({
		resolver: yupResolver(yupSchema),
		defaultValues,
	});

	const onSubmit = (data: FrenetForm) => {
		console.log("form data =", data);
	};

	function searchAddressWithCEP(cepStr: string) {
		console.log("Entered searchAddressWithCEP()");

		const cache: { tm: NodeJS.Timeout | null } = {
			tm: null,
		};

		return () => {
			if (cache.tm) clearTimeout(cache.tm);

			cache.tm = setTimeout(async () => {
				try {
					const cepRes = await cep(cepStr);
					console.log("awaited cep =", cepRes);
					setValue("state", cepRes.state);
					setValue("city", cepRes.city);
					setValue("logradouro", cepRes.street);
					setValue("neighborhood", cepRes.neighborhood);
				} catch (error) {
					console.log("error from cep =", error);
					errors.zipCode = error.errors;
				}
			}, 1000);
		};
	}

	const AddressForm = () => (
		<form
			onSubmit={handleSubmit(onSubmit)}
			encType="multipart/form-data"
			className={classes.root}
			id="address-form"
			method="post"
		>
			<Controller
				control={control}
				name="zipCode"
				key="zipCode"
				render={({ field }) => (
					<TextField
						helperText={errors.zipCode?.message}
						placeholder="Digite o CEP"
						error={!!errors.zipCode}
						inputRef={field.ref}
						variant="outlined"
						label="Cidade de destino"
						{...field}
						onChange={e => searchAddressWithCEP(e.target.value)}
						required
					/>
				)}
			/>

			<Controller
				control={control}
				name="federalDocument"
				key="federalDocument"
				render={({ field }) => (
					<TextField
						helperText={errors.federalDocument?.message}
						placeholder="Digite o seu CPF"
						error={!!errors.federalDocument}
						inputRef={field.ref}
						variant="outlined"
						label="CPF"
						{...field}
						required
					/>
				)}
			/>

			<Controller
				control={control}
				name="addressNumber"
				key="addressNumber"
				render={({ field }) => (
					<TextField
						helperText={errors.addressNumber?.message}
						placeholder="Digite o número da sua morada"
						error={!!errors.addressNumber}
						inputRef={field.ref}
						variant="outlined"
						label="Número"
						{...field}
						required
					/>
				)}
			/>

			<Controller
				control={control}
				name="addressComplement"
				key="addressComplement"
				render={({ field }) => (
					<TextField
						helperText={errors.addressComplement?.message}
						placeholder="Apartamento nº 10"
						error={!!errors.addressComplement}
						inputRef={field.ref}
						variant="outlined"
						label="Complemento"
						{...field}
					/>
				)}
			/>

			<Controller
				control={control}
				name="phoneNumber"
				key="phoneNumber"
				render={({ field }) => (
					<TextField
						helperText={errors.phoneNumber?.message}
						placeholder="87 9 9876-5432"
						error={!!errors.phoneNumber}
						inputRef={field.ref}
						variant="outlined"
						label="Número de telefone"
						{...field}
					/>
				)}
			/>
		</form>
	);

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

	function gotoProductPage() {
		console.log("gotoProductPage");

		//router.push(`/product/${product._id.toString()}`);
	}

	return (
		<>
			<Header />
			<ToastContainer />

			<Grid
				justifyContent="center"
				alignItems="stretch"
				direction="column"
				spacing={2}
				container
			>
				{cartProducts.map(product => (
					<Grid key={product._id.toString()} xs={12} sm={6} md={4} lg={3} item>
						<CheckoutCardForProduct
							gotoProductPage={gotoProductPage}
							product={product}
						/>
					</Grid>
				))}
			</Grid>

			<AddressForm />

			<button type="button" onClick={handleClick} disabled={isLoading}>
				Checkout
			</button>
		</>
	);
}

Checkout.getLayout = getLayout;

export default Checkout;
