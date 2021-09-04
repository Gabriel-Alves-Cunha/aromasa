import { Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosPromise } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { validateCep } from "validations-br";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import Head from "next/head";
import cep from "cep-promise";

import { CheckoutCardForProduct, getLayout, Header } from "components";
import { ClientChosenProduct, Product } from "models/Product";
import { envVariables } from "storage/env";
import { useCart } from "hooks/useCart";
import {
	handleFederalDocument,
	InfoNotDownloaded,
	urlDeNãoSeiMeuCep,
	defaultValues,
	Availability,
	cepFormatado,
	cpfFormatado,
	FrenetForm,
	getStripe,
	yupSchema,
} from "./helper";

import useStyles, { ConfirmButton } from "./styles";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
	const { cartProducts, getSubtotal } = useCart();
	const isCartEmpty = !cartProducts.length;
	const classes = useStyles();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [shipData, setShipData] = useState({} as FrenetForm);
	// const [
	// 	erros_de_informações_não_baixadas,
	// 	set_erros_de_informações_não_baixadas,
	// ] = useState<InfoNotDownloaded>({
	// 	productsId: [],
	// 	messages: [],
	// });
	// // const [erros_de_disponibilidades, set_erros_de_disponibilidades] =
	// 	useState<Availability>({
	// 		productsId: [],
	// 		messages: [],
	// 	});
	const [canGoToBuyPage, setCanGoToBuyPage] = useState(false);

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm<FrenetForm>({ defaultValues });

	const onSubmit = (data: FrenetForm) => {
		console.log(
			`[LOG]\n\tFile: 'pages/checkout/index.tsx'\n\tLine:66\n\t${typeof data}: 'data' =`,
			data
		);
	};

	function searchAddressWithCEP(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const cepStr = cepFormatado(event.target.value);
		// console.log(`Entered searchAddressWithCEP(${cepStr})`);
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
				} catch (error: any) {
					console.log("error from cep =", error);

					errors.zipCode = error;
				}
			}, 2_000);
		})();
	}

	async function handleCheckout(event: React.MouseEvent<HTMLInputElement>) {
		event.preventDefault();

		checkIfAmountOfProductsIsAvailable();

		if (!canGoToBuyPage) {
			toast.error(`🦄 Houve um ou mais erros ao comprar o(s) produto(s)!`, {
				hideProgressBar: false,
				position: "top-right",
				progress: undefined,
				closeOnClick: true,
				pauseOnHover: true,
				autoClose: 5000,
				draggable: true,
			});

			return;
		}

		setIsLoading(true);

		const productsInfo = () =>
			cartProducts.map(product => ({
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
			// Call your backend to create the Checkout session.
			const { data } = await axios.post<{ sessionId: string }>(
				"/api/payment",
				{
					products: productsInfo(),
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

	function gotoProductPage(product: ClientChosenProduct) {
		console.log("gotoProductPage with product:", product._id);

		router.push(`/product/${product._id.toString()}`);
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

	// useEffect(() => {
	// 	(async function checkIfAllProductsAreAvailable() {
	// 		console.log("Rendering checkIfAllProductsAreAvailable function");

	// 		setCanGoToBuyPage(true);

	// 		const cartProductsId = cartProducts.map(({ _id }) => _id.toString());

	// 		const promises: AxiosPromise<{ success: boolean; data: Product }>[] =
	// 			cartProductsId.map(id => axios(`api/products/${id}`));

	// 		const responses = await Promise.allSettled(promises);
	// 		console.log("Responses =", responses);

	// 		const products = responses
	// 			.map(res => {
	// 				if (res.status === "rejected") {
	// 					console.error("Erro ao baixar dados de um dos produtos: ", res);
	// 					return;
	// 				} else return res.value.data;
	// 			})
	// 			.filter(p => {
	// 				console.log("p =", p);

	// 				if (p?.data) return p.data;
	// 			}) as unknown as Product[]; // either a Product[] or an empty []
	// 		console.log("Products =", products);

	// 		cartProducts.forEach(cartProduct => {
	// 			const foundProduct = products.find(
	// 				({ _id }) => _id === cartProduct._id
	// 			);

	// 			if (!foundProduct) {
	// 				set_erros_de_informações_não_baixadas(oldErrors => {
	// 					const oldErrorIndex = oldErrors.productsId.findIndex(
	// 						productId => productId === cartProduct._id
	// 					);

	// 					if (oldErrorIndex === -1) {
	// 						// Error for this product doesn't exists. Create a new one:
	// 						return {
	// 							productsId: [...oldErrors.productsId, cartProduct._id],
	// 							messages: [
	// 								...oldErrors.messages,
	// 								`Informações para o produto ${cartProduct.title} não foi baixada! Este produto não irá para o pagamento.`,
	// 							],
	// 						};
	// 					} else {
	// 						// Error for this product alredy exists. Update it:
	// 						const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
	// 						newErrors.messages[
	// 							oldErrorIndex
	// 						] = `Informações para o produto ${cartProduct.title} não foi baixada! Este produto não irá para o pagamento.`;

	// 						return newErrors;
	// 					}
	// 				});

	// 				handleRemoveFromCart(cartProduct);
	// 			} else {
	// 				// Clean possible information error:
	// 				set_erros_de_informações_não_baixadas(oldErrors => {
	// 					const oldErrorIndex = oldErrors.productsId.findIndex(
	// 						productId => productId === cartProduct._id
	// 					);

	// 					if (oldErrorIndex === -1) {
	// 						// Error for this product doesn't exists. Create a new one:
	// 						setCanGoToBuyPage(true);

	// 						return {
	// 							productsId: [...oldErrors.productsId, cartProduct._id],
	// 							messages: [...oldErrors.messages, ""],
	// 						};
	// 					} else {
	// 						// Error for this product alredy exists. Update it:
	// 						const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
	// 						newErrors.messages[oldErrorIndex] = "";

	// 						setCanGoToBuyPage(true);

	// 						logreturn newErrors;
	// 					}
	// 				});

	// 				if (
	// 					parseFloat(cartProduct.bottle.amountThatWillBeBought) >
	// 					parseFloat(foundProduct.bottle.available_quantity)
	// 				) {
	// 					set_erros_de_disponibilidades(oldErrors => {
	// 						const oldErrorIndex = oldErrors.productsId.findIndex(
	// 							productId => productId === cartProduct._id
	// 						);
	// 						const msg = `A quantidade disponível para venda do produto '${cartProduct.title}' é de ${foundProduct.bottle.available_quantity} e você deseja comprar ${cartProduct.bottle.amountThatWillBeBought}! Por favor, ajuste a quantidade para poder continuar, ou se desejar, entre em contato conosco (informações de contato no rodapé da página).`;

	// 						if (oldErrorIndex === -1) {
	// 							// Error for this product doesn't exists. Create a new one:
	// 							return {
	// 								productsId: [...oldErrors.productsId, cartProduct._id],
	// 								messages: [...oldErrors.messages, msg],
	// 							};
	// 						} else {
	// 							// Error for this product alredy exists. Update it:
	// 							const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
	// 							newErrors.messages[oldErrorIndex] = msg;

	// 							return newErrors;
	// 						}
	// 					});

	// 					setCanGoToBuyPage(false);
	// 				} else {
	// 					set_erros_de_disponibilidades(oldErrors => {
	// 						const oldErrorIndex = oldErrors.productsId.findIndex(
	// 							productId => productId === cartProduct._id
	// 						);

	// 						if (oldErrorIndex === -1) {
	// 							// Error for this product doesn't exists. Create a new one:
	// 							return {
	// 								productsId: [...oldErrors.productsId, cartProduct._id],
	// 								messages: [...oldErrors.messages, ""],
	// 							};
	// 						} else {
	// 							// Error for this product alredy exists. Update it:
	// 							const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
	// 							newErrors.messages[oldErrorIndex] = "";

	// 							return newErrors;
	// 						}
	// 					});

	// 					setCanGoToBuyPage(true);
	// 				}
	// 			}
	// 		});
	// 	})();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [cartProducts]);

	// useEffect(() => {
	// 	if (!canGoToBuyPage) {
	// 		console.log(
	// 			"Erros:",
	// 			erros_de_informações_não_baixadas,
	// 			erros_de_disponibilidades
	// 		);

	// 		const myToast = (msg: string) =>
	// 			toast.error(`🦄 Houve um erro ao verificar o produto!\n${msg}`, {
	// 				hideProgressBar: false,
	// 				position: "top-right",
	// 				progress: undefined,
	// 				closeOnClick: true,
	// 				pauseOnHover: true,
	// 				autoClose: 5000,
	// 				draggable: true,
	// 			});

	// 		erros_de_informações_não_baixadas.messages.forEach(msg => myToast(msg));
	// 		erros_de_disponibilidades.messages.forEach(msg => myToast(msg));
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [canGoToBuyPage]);

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
					name="zipCode"
					defaultValue=""
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
					name="name"
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							helperText={errors.name?.message}
							error={!!errors.name}
							variant="standard"
							placeholder="Entregar a(o)"
							label="Destinatário"
							required
						/>
					)}
				/>

				<Controller
					control={control}
					name="city"
					defaultValue=""
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
					name="state"
					defaultValue=""
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
								handleFederalDocument(e);
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
							placeholder="87 9 9876-5432"
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

			<Header />
			<ToastContainer />

			{isCartEmpty ? <Empty /> : <Filled />}
		</>
	);
}

Checkout.getLayout = getLayout;

export default Checkout;
