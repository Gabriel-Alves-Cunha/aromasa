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

import useStyles, {
	ConfirmButton,
	NoItems,
	PayButton,
	Span,
	ValorDoFrete,
} from "styles/pages/checkout";
import "react-toastify/dist/ReactToastify.css";
import { Quote } from "./api/get-shipping-quote";

const dev = process.env.NODE_ENV === "development";

// todo: useCallback
export default function Checkout() {
	const mercadopago = useMercadopago.v2(envVariables.mercadoPagoPublicKey, {
		locale: "pt-BR",
	});

	const { cartProducts, getSubtotal } = useCart();
	const isCartEmpty = !cartProducts.length;
	const classes = useStyles();
	const router = useRouter();

	const [formData, setFormData] = useState(defaultValues);
	const [preferenceId, setPreferenceId] = useState("");
	const [setValues, setSetValues] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [quote, setQuote] = useState({} as Quote);

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
		setValue("neighborhood", formData.neighborhood);
		setValue("logradouro", formData.logradouro);
		setValue("zipCode", formData.zipCode);
		setValue("state", formData.state);
		setValue("city", formData.city);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setValues]);

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
			`[LOG]\n\tFile: 'pages/checkout/index.tsx'\n\tLine:108\n\t${typeof data}: 'data' =`,
			data
		);

		const ShippingItemArray: ShippingItem[] = cartProducts.map(product => ({
			Quantity: parseFloat(product.bottle.amountThatWillBeBought),
			Height: parseFloat(product.packageDimensions.height),
			Length: parseFloat(product.packageDimensions.length),
			Weight: parseFloat(product.packageDimensions.weight),
			Width: parseFloat(product.packageDimensions.width),
		}));

		const shipData: ShipData = dev
			? testShippingData(formData)
			: {
					ShipmentInvoiceValue: parseFloat(getSubtotal().replace(",", ".")),
					SellerCEP: envVariables.sellerCEP,
					RecipientCEP: formData.zipCode,
					ShippingServiceCode: null,
					RecipientCountry: "BR",
					ShippingItemArray,
			  };

		const quote = await axiosInstance.post<Quote>(
			"/api/get-shipping-quote",
			shipData
		);

		setQuote(quote.data);
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
			const cepResponse: CepResponse = await cep(CEP);
			console.log("cepRes =", cepResponse);

			setFormData(oldValue => ({
				...oldValue,
				neighborhood: cepResponse.neighborhood,
				logradouro: cepResponse.street,
				state: cepResponse.state,
				zipCode: cepResponse.cep,
				city: cepResponse.city,
			}));
			setSetValues(true);
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

	async function handleCheckout(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

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

		const payer: PreferencePayer = {
			address: {
				street_name: `${formData.logradouro}, ${formData.addressComplement}`,
				// @ts-ignore mercadopago tá dizendo que tem que ser number
				street_number: parseFloat(formData.addressNumber),
				zip_code: formData.zipCode,
			},
			phone: { number: formData.phoneNumber, area_code: "" },
			email: formData.email,
			name: formData.name,
		};

		try {
			// Call the backend to create the Checkout session.
			const res = await axiosInstance.post<{ id: string }>("/api/payment", {
				formData,
				items,
				payer,
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

					<div className={classes.totalDetails}>
						<Typography variant="h6">Subtotal: R$ {getSubtotal()}</Typography>
					</div>

					<section className={classes.formWrapper}>
						Dados para sua entrega
						<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
										placeholder="SP"
										variant="standard"
										label="Estado (abreviado)"
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
										placeholder="(87) 9 9876-5432"
										error={!!errors.phoneNumber}
										label="Número de telefone"
										variant="standard"
									/>
								)}
							/>

							<ConfirmButton
								value="Calcular frete"
								disabled={isLoading}
								type="submit"
							/>
						</form>
					</section>
				</div>
			)}

			{quote.ShippingSevicesArray.length && (
				<ValorDoFrete>
					<p>
						O valor do frete é:{" "}
						<span>
							R$ {quote.ShippingSevicesArray[0].ShippingPrice.replace(".", ",")}
						</span>
					</p>

					<PayButton
						onClick={async e => await handleCheckout(e)}
						value="Pagar"
					/>
				</ValorDoFrete>
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

const testShippingData = (formData: FrenetForm) => ({
	SellerCEP: envVariables.sellerCEP,
	RecipientCEP: formData.zipCode,
	ShipmentInvoiceValue: 320,
	ShippingServiceCode: null,
	RecipientCountry: "BR",
	ShippingItemArray: [
		{
			Weight: 1.18,
			Quantity: 1,
			Length: 33,
			Height: 2,
			Width: 47,
		},
	],
});

type CepResponse = {
	neighborhood: string;
	service: string;
	street: string;
	state: string;
	city: string;
	cep: string;
};

export type ShipData = {
	ShippingItemArray: ShippingItem[];
	ShipmentInvoiceValue: number;
	ShippingServiceCode: null;
	RecipientCountry: string; // "BR"
	RecipientCEP: string;
	SellerCEP: string;
};

type ShippingItem = {
	Quantity: number;
	Height: number; // em cm
	Length: number; // em cm
	Weight: number; // em kg
	Width: number; // em cm
};
