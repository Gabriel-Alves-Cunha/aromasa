import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { validateCep, validateCPF } from "validations-br";
import { toast, ToastContainer } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import cep from "cep-promise";

import { CheckoutCardForProduct, LayoutWithFooter, Header, Cart } from "components";
import { ClientChosenProduct } from "models/Product";
import { axiosInstance } from "utils/axiosInstance";
import { useCart } from "hooks/useCart";
import {
	urlDeNãoSeiMeuCep,
	defaultValues,
	cepFormatado,
	cpfFormatado,
	FrenetForm,
	nopeSchema,
	getStripe,
} from "components/CheckoutCardForProduct/helperForCheckout";

import useStyles, { ConfirmButton } from "styles/pages/checkout";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
	const { cartProducts, getSubtotal } = useCart();
	const isCartEmpty = !cartProducts.length;
	const classes = useStyles();
	const router = useRouter();

	const [canGoToBuyPage, setCanGoToBuyPage] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [shipData, setShipData] = useState({} as FrenetForm);

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm<FrenetForm>({ defaultValues });

	const onSubmit = (data: FrenetForm) => {
		console.log(
			`[LOG]\n\tFile: 'pages/checkout/index.tsx'\n\tLine:47\n\t${typeof data}: 'data' =`,
			data
		);
	};

	async function searchAddressWithCEP(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const str = event.target.value;
		if (str.length < 8) return;

		const cepStr = cepFormatado(str);
		const isValid = validateCep(cepStr);
		if (!isValid) {
			errors.zipCode = {
				type: "CEP inválido",
				message: "CEP inválido!",
			};

			return;
		}

		try {
			const cepRes = await cep(cepStr);

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
		} catch (error: any) {
			console.log("error from cep =", error);

			errors.zipCode = error.message;
		}
	}

	function validateFederalDocument(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const str = event.target.value;
		if (str.length < 14) return;

		const cpfStr = cpfFormatado(str);
		const isValid = validateCPF(cpfStr);
		if (!isValid) {
			errors.federalDocument = {
				type: "CPF inválido",
				message: "CPF inválido!",
			};

			return;
		}
	}

	async function handleCheckout(event: React.MouseEvent<HTMLInputElement>) {
		event.preventDefault();

		setIsLoading(true);

		checkIfAmountOfProductsIsAvailable();

		if (!canGoToBuyPage) {
			toast.error(`🦄 Houve um ou mais erros ao comprar o(s) produto(s)!`, {
				hideProgressBar: true,
				position: "top-right",
				progress: undefined,
				closeOnClick: true,
				pauseOnHover: true,
				autoClose: 5000,
				draggable: true,
			});

			setIsLoading(false);
			return;
		}

		const productsInfo = cartProducts.map(product => ({
			price_data: {
				currency: "brl",
				product_data: {
					name: product.title,
				},
				unit_amount: parseFloat(product.price) * 100, // centavos
			},
			quantity: parseFloat(product.bottle.amountThatWillBeBought),
		}));
		// const productsInfo = () => [
		// 	// for test only
		// 	{ price: "price_1JMZHdBQSnJH4whOHTPPCdJv", quantity: 2 },
		// ];

		try {
			// Call the backend to create the Checkout session.
			const { data } = await axiosInstance.post<{ sessionId: string }>(
				"/api/payment",
				{
					products: productsInfo,
					metadata: shipData,
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
		} catch (error: any) {
			console.error(error);

			toast.error(`🦄 Houve um erro ao comprar o produto!\n${error.message}`, {
				hideProgressBar: false,
				position: "top-right",
				progress: undefined,
				closeOnClick: true,
				pauseOnHover: true,
				autoClose: 5000,
				draggable: true,
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function gotoProductPage(product: ClientChosenProduct) {
		console.log("gotoProductPage with product:", product._id);

		await router.push(`/product/${product._id.toString()}`);
	}

	function checkIfAmountOfProductsIsAvailable() {
		setCanGoToBuyPage(true);

		cartProducts.forEach(product => {
			if (parseFloat(product.bottle.amountThatWillBeBought) > 50) {
				toast.error(
					`🦄 Você está comprando produtos mais de 50 produtos!! Por favor, entre em contato por email (está no rodapé da página) para realizar compras grandes!`,
					{
						hideProgressBar: false,
						position: "top-right",
						progress: undefined,
						closeOnClick: true,
						pauseOnHover: true,
						autoClose: 7000,
						draggable: true,
					}
				);

				setCanGoToBuyPage(false);
			}
		});
	}

	const Empty = () => <div>No items in cart!!</div>;

	function Filled() {
		return (
			<div className={classes.root}>
				<Grid
					justifyContent="center"
					alignItems="stretch"
					direction="row"
					spacing={3}
					container
				>
					{cartProducts.map(product => (
						<Grid item key={product._id.toString()} xs={12}>
							<CheckoutCardForProduct
								gotoProductPage={gotoProductPage}
								product={product}
							/>
						</Grid>
					))}
				</Grid>

				<div className={classes.totalDetails}>
					<Typography variant="h6">Subtotal: R$ {getSubtotal()}</Typography>
				</div>

				<div className={classes.formWrapper}>
					Dados para sua entrega
					<Form />
				</div>
			</div>
		);
	}

	function Form() {
		return (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.form}
				id="address-form"
			>
				<Controller
					control={control}
					defaultValue=""
					name="zipCode"
					render={({ field }) => (
						<TextField
							{...field}
							onChange={e => {
								field.onChange(e);
								searchAddressWithCEP(e);
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<a
											href={urlDeNãoSeiMeuCep}
											className={classes.a}
											rel="noreferrer"
											target="_blank"
										>
											Não sei meu CEP
										</a>
									</InputAdornment>
								),
							}}
							helperText={errors.zipCode?.message}
							placeholder="Digite o CEP"
							error={!!errors.zipCode}
							label="Digite seu CEP"
							variant="standard"
							type="number"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					name="logradouro"
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.logradouro?.message}
							error={!!errors.logradouro}
							variant="standard"
							placeholder="Rua"
							label="Rua"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					defaultValue=""
					name="name"
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.name?.message}
							placeholder="Entregar a(o)"
							error={!!errors.name}
							label="Destinatário"
							variant="standard"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					defaultValue=""
					name="city"
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.city?.message}
							error={!!errors.city}
							placeholder="Cidade"
							variant="standard"
							label="Cidade"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					name="neighborhood"
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.neighborhood?.message}
							error={!!errors.neighborhood}
							placeholder="Bairro"
							variant="standard"
							label="Bairro"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					defaultValue=""
					name="state"
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.state?.message}
							error={!!errors.state}
							placeholder="Estado"
							variant="standard"
							label="Estado"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					name="federalDocument"
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							onChange={e => {
								field.onChange(e);
								validateFederalDocument(e);
							}}
							helperText={errors.federalDocument?.message}
							error={!!errors.federalDocument}
							placeholder="Digite o seu CPF"
							variant="standard"
							type="number"
							label="CPF"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					name="addressNumber"
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							placeholder="Digite o número da sua morada"
							helperText={errors.addressNumber?.message}
							error={!!errors.addressNumber}
							variant="standard"
							label="Número"
							type="number"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					name="addressComplement"
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.addressComplement?.message}
							error={!!errors.addressComplement}
							placeholder="Apartamento nº 10"
							label="Complemento"
							variant="standard"
						/>
					)}
				/>

				<Controller
					control={control}
					defaultValue={undefined}
					name="phoneNumber"
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.phoneNumber?.message}
							error={!!errors.phoneNumber}
							placeholder="(87) 9 9876-5432"
							label="Número de telefone"
							variant="standard"
							type="number"
						/>
					)}
				/>

				<ConfirmButton
					onClick={handleCheckout}
					disabled={isLoading}
					value="Checkout"
					type="submit"
				/>
			</form>
		);
	}

	return (
		<>
			<Head>
				<title>Aromasa Decor - Checkout</title>
				<meta name="description" content="Checkout" />
			</Head>

			<Header>
				<Cart />
			</Header>
			<ToastContainer />

			{isCartEmpty ? <Empty /> : <Filled />}
		</>
	);
}

Checkout.getLayout = LayoutWithFooter;
