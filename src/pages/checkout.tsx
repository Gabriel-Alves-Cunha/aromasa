import type {
	PreferencePayer,
	PreferenceItem,
} from "mercadopago/models/preferences/create-payload.model";

import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMercadopago } from "react-sdk-mercadopago";
import { nopeResolver } from "@hookform/resolvers/nope";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import {
	validateCep as isValidCep,
	validateCPF as isValidCPF,
} from "validations-br";
import Head from "next/head";
import cep from "cep-promise";

import { ClientChosenProduct } from "models/Product";
import { axiosInstance } from "utils/axiosInstance";
import { envVariables } from "utils/env";
import { useCart } from "hooks/useCart";
import {
	CheckoutCardForProduct,
	LayoutWithFooter,
	Header,
	Cart,
} from "components";
import {
	urlDeNãoSeiMeuCep,
	defaultValues,
	foneFormatado,
	cepFormatado,
	cpfFormatado,
	nopeSchema,
	FrenetForm,
} from "components/CheckoutCardForProduct/helperForCheckout";

import useStyles, { ConfirmButton, NoItems, Span } from "styles/pages/checkout";
import "react-toastify/dist/ReactToastify.css";

// todo: useCallback
export default function Checkout() {
	const mercadopago = useMercadopago.v2(envVariables.mercadoPagoPublicKey, {
		locale: "pt-BR",
	});

	const { cartProducts, getSubtotal } = useCart();
	const isCartEmpty = !cartProducts.length;
	const classes = useStyles();
	const router = useRouter();

	const [cepResponse, setCepResponse] = useState({} as CepResponse);
	const [shipData, setShipData] = useState(defaultValues);
	const [preferenceId, setPreferenceId] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (mercadopago && preferenceId)
			mercadopago.checkout({
				preference: { id: preferenceId },
				render: {
					container: "",
					label: "Checkout",
				},
				autoOpen: true, // Habilita a abertura automática do Checkout Pro
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [preferenceId]);

	useEffect(() => {
		setValue("neighborhood", cepResponse.neighborhood);
		setValue("logradouro", cepResponse.street);
		setValue("zipCode", cepResponse.cep);
		setValue("state", cepResponse.state);
		setValue("city", cepResponse.city);

		setShipData(oldValue => ({
			...oldValue,
			neighborhood: cepResponse.neighborhood,
			logradouro: cepResponse.street,
			state: cepResponse.state,
			city: cepResponse.city,
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cepResponse]);

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm<FrenetForm>({
		// resolver: nopeResolver(nopeSchema),
		defaultValues,
	});

	console.log("errors =", errors);

	const onSubmit = async (data: FrenetForm) => {
		console.log(
			`[LOG]\n\tFile: 'pages/checkout/index.tsx'\n\tLine:49\n\t${typeof data}: 'data' =`,
			data
		);
		await handleCheckout();
	};

	const searchAddressWithCEP = async (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		errors.zipCode = undefined;
		let CEP = event.target.value;
		if (CEP.length < 8) return;

		CEP = cepFormatado(CEP);

		if (!isValidCep(CEP)) {
			errors.zipCode = {
				message: "CEP inválido!",
				type: "CEP inválido",
			};

			return;
		}

		try {
			const cepRes: CepResponse = await cep(CEP);
			console.log("cepRes =", cepRes);
			setCepResponse(cepRes);
		} catch (error: any) {
			console.error("Error from cep =", error);

			errors.zipCode = {
				message: "CEP inválido!",
				type: "CEP inválido",
			};
		}
	};

	const validateFederalDocument = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		errors.federalDocument = undefined;
		const CPF = event.target.value;
		if (CPF.length < 14) return;

		if (!isValidCPF(CPF))
			errors.federalDocument = {
				type: "CPF inválido",
				message: "CPF inválido!",
			};
	};

	async function handleCheckout() {
		setIsLoading(true);

		let canGoToBuyPage = true;

		// check if amount of products is available:
		cartProducts.forEach(product => {
			if (parseFloat(product.bottle.amountThatWillBeBought) > 50) {
				toast.error(
					`🦄 Você está comprando produtos mais de 50 produtos!! Por favor, entre em contato por email (está no rodapé da página no 'Fale conosco') para realizar compras grandes!`,
					{
						hideProgressBar: false,
						position: "top-right",
						progress: undefined,
						closeOnClick: true,
						pauseOnHover: true,
						autoClose: 10_000,
						draggable: true,
					}
				);

				canGoToBuyPage = false;
			}
		});

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

		const items: PreferenceItem[] = cartProducts.map(product => ({
			quantity: parseFloat(product.bottle.amountThatWillBeBought),
			unit_price: parseFloat(product.price),
			id: product._id.toString(),
			title: product.title,
			currency_id: "BRL",
		}));

		const infoDoPagador: PreferencePayer = {
			address: {
				street_name: `${shipData.logradouro}, ${shipData.addressComplement}`,
				// @ts-ignore mercadopago tá dizendo que tem que ser number
				street_number: parseFloat(shipData.addressNumber),
				zip_code: shipData.zipCode,
			},
			phone: { number: shipData.phoneNumber, area_code: "" },
			email: shipData.email,
			name: shipData.name,
		};

		try {
			// Call the backend to create the Checkout session.
			const res = await axiosInstance.post<{ id: string }>("/api/payment", {
				infoDoPagador,
				shipData,
				items,
			});

			console.log(
				"\n\nres from calling the backend to create a checkout session =",
				res
			);

			setPreferenceId(res.data.id);
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
		}

		setIsLoading(false);
	}

	const gotoProductPage = async (product: ClientChosenProduct) =>
		await router.push(`/product/${product._id}`);

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

			{!isCartEmpty ? (
				<Empty />
			) : (
				<>
					<div className={classes.root}>
						<Grid
							justifyContent="center"
							alignItems="stretch"
							direction="row"
							spacing={3}
							container
						>
							{cartProducts.map(product => (
								<Grid item key={product.title} xs={12}>
									<CheckoutCardForProduct
										gotoProductPage={gotoProductPage}
										product={product}
									/>
								</Grid>
							))}
						</Grid>

						<section className={classes.totalDetails}>
							<Typography variant="h6">Subtotal: R$ {getSubtotal()}</Typography>
						</section>

						<section className={classes.formWrapper}>
							Dados para sua entrega
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
											// value={cepFormatado(field.value)}
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
											placeholder="Entregar a"
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
											// value={cpfFormatado(field.value)}
											error={!!errors.federalDocument}
											placeholder="Digite o seu CPF"
											variant="standard"
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
											label="Número da sua morada"
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
									name="phoneNumber"
									defaultValue=""
									render={({ field }) => (
										<TextField
											{...field}
											helperText={errors.phoneNumber?.message}
											// value={foneFormatado(field.value)}
											placeholder="(87) 9 9876-5432"
											error={!!errors.phoneNumber}
											label="Número de telefone"
											variant="standard"
										/>
									)}
								/>

								<ConfirmButton
									disabled={isLoading}
									value="Checkout"
									type="submit"
								/>
							</form>
						</section>
					</div>
				</>
			)}
		</>
	);
}

Checkout.getLayout = LayoutWithFooter;

function Empty() {
	return (
		<NoItems>
			<Span>
				<IoBagOutline size={26} strokeWidth="1" />
			</Span>
			<p>Sem itens para fazer checkout</p>
		</NoItems>
	);
}

type CepResponse = {
	neighborhood: string;
	service: string;
	street: string;
	state: string;
	city: string;
	cep: string;
};
