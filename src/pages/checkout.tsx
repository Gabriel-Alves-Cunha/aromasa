import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { nopeResolver } from "@hookform/resolvers/nope";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import {
	validateCep as isValidCep,
	validateCPF as isValidCPF,
} from "validations-br";
import InputMask from "react-input-mask";
import Script from "next/script";
import Head from "next/head";
import cep from "cep-promise";

import { ClientChosenProduct } from "models/Product";
import { axiosInstance } from "utils/axiosInstance";
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
	FrenetForm,
	nopeSchema,
} from "components/CheckoutCardForProduct/helperForCheckout";

import useStyles, { ConfirmButton, NoItems, Span } from "styles/pages/checkout";
import "react-toastify/dist/ReactToastify.css";
import { envVariables } from "utils/env";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";

const mercadopagoPublicKey = envVariables.mercadoPagoPublicKey;

export default function Checkout() {
	const { cartProducts, getSubtotal } = useCart();
	const isCartEmpty = !cartProducts.length;
	const classes = useStyles();
	const router = useRouter();

	const [script, setScript] = useState({ script: ``, prefence_id: "" });
	const [cepResponse, setCepResponse] = useState({} as CepResponse);
	const [shipData, setShipData] = useState({} as FrenetForm);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setScript(oldValue => ({
			script: `
			// Adicione as credenciais do SDK
			const mp = new MercadoPago(${mercadopagoPublicKey}, {
        locale: 'pt-BR'
			});

  		// Inicialize o checkout
			mp.checkout({
					preference: {
					id: ${script.prefence_id},
				},
				render: {
					container: "open-checkout-modal", // Indique o nome da class onde será exibido o botão de pagamento
					label: 'Pagar', // Muda o texto do botão de pagamento (opcional)
				}
			});
			`,
			prefence_id: oldValue.prefence_id,
		}));
	}, [script.prefence_id]);

	useEffect(() => {
		setValue("neighborhood", cepResponse.neighborhood);
		setValue("logradouro", cepResponse.street);
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
		resolver: nopeResolver(nopeSchema),
		defaultValues,
	});

	const onSubmit = (data: FrenetForm) => {
		console.log(
			`[LOG]\n\tFile: 'pages/checkout/index.tsx'\n\tLine:49\n\t${typeof data}: 'data' =`,
			data
		);
	};

	const searchAddressWithCEP = async (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		errors.zipCode = undefined;
		const CEP = event.target.value;
		if (CEP.length < 8) return;

		if (!isValidCep(CEP)) {
			errors.zipCode = {
				type: "CEP inválido",
				message: "CEP inválido!",
			};

			return;
		}

		try {
			const cepRes: CepResponse = await cep(CEP);
			console.log("cepRes =", cepRes);
			setCepResponse(cepRes);
		} catch (error: any) {
			console.error("Error from cep =", error);

			errors.zipCode = error.message;
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

	async function handleCheckout(event: React.MouseEvent<HTMLInputElement>) {
		event.preventDefault();

		setIsLoading(true);

		let canGoToBuyPage = true;

		(function checkIfAmountOfProductsIsAvailable() {
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
		})();

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
			unit_price: parseFloat(product.price) * 100, // centavos,
			title: product.title,
			currency_id: "BRL",
		}));

		try {
			// Call the backend to create the Checkout session.
			const res = await axiosInstance.post<{ id: string }>("/api/payment", {
				infoDoPagador: {
					// Nome do comprador.
					name: shipData.name,
					// Endereço de e-mail do comprador.
					email: shipData.email,
					// Telefone do comprador.
					phone: shipData.phoneNumber,
					// Endereço do comprador.
					address:
						shipData.addressComplement + `, nº ${shipData.addressNumber}`,
				},
				shipData,
				items,
			});

			setScript(oldValue => ({
				prefence_id: res.data.id,
				script: oldValue.script,
			}));

			console.log(
				"res from calling the backend to create a checkout session =",
				res
			);
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

	const gotoProductPage = async (product: ClientChosenProduct) => {
		console.log("gotoProductPage with product:", product._id);

		await router.push(`/product/${product._id.toString()}`);
	};

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

				<section className={classes.totalDetails}>
					<Typography variant="h6">Subtotal: R$ {getSubtotal()}</Typography>
				</section>

				<section className={classes.formWrapper}>
					Dados para sua entrega
					<Form />
				</section>
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
					render={({ field: { ref, ...rest } }) => (
						<InputMask mask="99999-999" onChange={searchAddressWithCEP}>
							{(inputProps: typeof rest) => (
								<TextField
									{...inputProps}
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
									ref={ref}
									helperText={errors.zipCode?.message}
									placeholder="Digite o CEP"
									error={!!errors.zipCode}
									label="Digite seu CEP"
									variant="standard"
									type="text"
									required
								/>
							)}
						</InputMask>
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
						<InputMask mask="999.999.999-99" onChange={validateFederalDocument}>
							{(inputProps: typeof field) => (
								<TextField
									{...inputProps}
									helperText={errors.federalDocument?.message}
									error={!!errors.federalDocument}
									placeholder="Digite o seu CPF"
									variant="standard"
									type="text"
									label="CPF"
									required
								/>
							)}
						</InputMask>
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
					name="phoneNumber"
					defaultValue=""
					render={({ field }) => (
						<InputMask mask="(99) 9 9999-9999">
							{(inputProps: typeof field) => (
								<TextField
									{...inputProps}
									helperText={errors.phoneNumber?.message}
									error={!!errors.phoneNumber}
									placeholder="(87) 9 9876-5432"
									label="Número de telefone"
									variant="standard"
									type="text"
								/>
							)}
						</InputMask>
					)}
				/>

				<ConfirmButton
					className="open-checkout-modal"
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

			<Script
				id="mercadopago-checkoutpro"
				src="https://sdk.mercadopago.com/js/v2"
			>
				{`${script}`}
			</Script>
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
