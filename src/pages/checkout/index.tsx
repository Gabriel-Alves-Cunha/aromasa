import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import cep from "cep-promise";

import { CheckoutCardForProduct } from "components/CheckoutCardForProduct";
import { ClientChosenProduct } from "models/Product";
import { envVariables } from "storage/env";
import { getLayout } from "components/Layout";
import { useCart } from "hooks/useCart";
import { Header } from "components";
import {
	urlDeNãoSeiMeuCep,
	partialYupSchema,
	defaultValues,
	foneFormatado,
	cepFormatado,
	cpfFormatado,
	FrenetForm,
	getStripe,
	yupSchema,
} from "./helper";

import { useStyles } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import { validateCep, validateCPF } from "validations-br";

console.log(`\n\n${cepFormatado("56320700")}`);
console.log(`\n\n${cpfFormatado("04174360170")}`);
console.log(`\n\n${foneFormatado("87999633141")}`);

function Checkout() {
	const { cartProducts } = useCart();
	const classes = useStyles();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [shipData, setShipData] = useState({} as FrenetForm);

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		register,
	} = useForm<FrenetForm>({ defaultValues });

	const onSubmit = (data: FrenetForm) => {
		console.log("form data =", data);
	};

	function searchAddressWithCEP(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const cepStr = cepFormatado(event.target.value);
		console.log(`Entered searchAddressWithCEP(${cepStr})`);
		if (cepStr.length < 8) return;

		const isValid = validateCep(cepStr);
		console.log(`CEP é valido (${cepStr})? ${isValid}`);
		if (!isValid) return;

		const cache: { tm: NodeJS.Timeout | null } = {
			tm: null,
		};

		return (() => {
			console.log("Entered searchAddressWithCEP inner fn");
			if (cache.tm) clearTimeout(cache.tm);

			cache.tm = setTimeout(async () => {
				try {
					const cepRes = await cep(cepStr);
					console.log("awaited cep =", cepRes);
					setTimeout(() => {
						setValue("neighborhood", cepRes.neighborhood);
						setValue("logradouro", cepRes.street);
						setValue("state", cepRes.state);
						setValue("city", cepRes.city);

						setShipData(oldValue => ({
							...oldValue,
							neighborhood: cepRes.neighborhood,
							logradouro: cepRes.street,
							state: cepRes.state,
							city: cepRes.city,
						}));
					});
				} catch (error) {
					console.log("error from cep =", error);

					errors.zipCode = error;
				}
			}, 5_000);
		})();
	}

	async function handleCheckout(event: React.MouseEvent<HTMLButtonElement>) {
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

	function handleFederalDocument(event) {
		const cpfStr = cpfFormatado(event.target.value);
		console.log(`Entered handleFederalDocument(${cpfStr})`);
		if (cpfStr.length < 14) return;

		const isValid = validateCPF(cpfStr);
		console.log(`CPF é valido (${cpfStr})? ${isValid}`);
		if (!isValid) return;
	}

	let cepForm = register("zipCode", { required: "É necessário o CEP" });
	return (
		<>
			<Header />
			<ToastContainer />

			<Grid
				style={{ marginTop: 90 }}
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

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.root}
				id="address-form"
			>
				<TextField
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<a href={urlDeNãoSeiMeuCep} className={classes.a}>
									Não sei meu CEP
								</a>
							</InputAdornment>
						),
					}}
					onChange={e => {
						cepForm.onChange(e);
						searchAddressWithCEP(e);
					}}
					helperText={errors.zipCode?.message}
					placeholder="Digite o CEP"
					error={!!errors.zipCode}
					className={classes.cep}
					label="Digite seu CEP"
					variant="outlined"
					ref={cepForm.ref}
					type="number"
					required
				/>

				<TextField
					{...register("federalDocument", { required: true })}
					onChange={handleFederalDocument}
					helperText={errors.federalDocument?.message}
					error={!!errors.federalDocument}
					placeholder="Digite o seu CPF"
					variant="outlined"
					type="number"
					label="CPF"
					required
				/>

				<TextField
					{...register("addressNumber", { required: true })}
					placeholder="Digite o número da sua morada"
					helperText={errors.addressNumber?.message}
					error={!!errors.addressNumber}
					variant="outlined"
					label="Número"
					type="number"
					required
				/>

				<TextField
					helperText={errors.addressComplement?.message}
					{...register("addressComplement")}
					error={!!errors.addressComplement}
					placeholder="Apartamento nº 10"
					label="Complemento"
					variant="outlined"
				/>

				<TextField
					helperText={errors.phoneNumber?.message}
					{...register("phoneNumber")}
					error={!!errors.phoneNumber}
					placeholder="87 9 9876-5432"
					label="Número de telefone"
					variant="outlined"
					type="number"
				/>

				<div className={classes.submit}>
					<input
						type="submit"
						value="Checkout"
						disabled={isLoading}
						onClick={() => {}}
					/>
				</div>
			</form>
		</>
	);
}

Checkout.getLayout = getLayout;

export default Checkout;
