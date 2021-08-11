import { Button, Grid, Typography } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosPromise } from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Types } from "mongoose";
import Head from "next/head";

import { ProductsToBeBoughtSlider } from "../../components/ProductsToBeBoughtSlider";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../models/Product";

import useStyles, { Container, SecondVH } from "./styles";

type InfoNotDownloaded = {
	productsId: Array<Types.ObjectId>;
	messages: Array<string>;
};

type Availability = {
	productsId: Array<Types.ObjectId>;
	messages: Array<string>;
};

function Cart() {
	const {
		handleAddOneMoreToCart,
		handleRemoveFromCart,
		handleSubtractAmount,
		cartProducts,
		getSubtotal,
	} = useCart();
	const isCartEmpty = !cartProducts.length;
	const classes = useStyles();
	const router = useRouter();

	console.log(cartProducts);
	console.log("Rendering outer function");

	const [
		erros_de_informações_não_baixadas,
		set_erros_de_informações_não_baixadas,
	] = useState<InfoNotDownloaded>({
		productsId: [],
		messages: [],
	});
	const [erros_de_disponibilidades, set_erros_de_disponibilidades] =
		useState<Availability>({
			productsId: [],
			messages: [],
		});
	const [canGoToBuyPage, setCanGoToBuyPage] = useState(false);

	useEffect(() => {
		if (!canGoToBuyPage) {
			console.log(
				"Erros:",
				erros_de_informações_não_baixadas,
				erros_de_disponibilidades
			);

			const myToast = (msg: string) =>
				toast.error(`🦄 Houve um erro ao verificar o produto!\n${msg}`, {
					hideProgressBar: false,
					position: "top-right",
					progress: undefined,
					closeOnClick: true,
					pauseOnHover: true,
					autoClose: 5000,
					draggable: true,
				});

			erros_de_informações_não_baixadas.messages.forEach(msg => myToast(msg));
			erros_de_disponibilidades.messages.forEach(msg => myToast(msg));
		}
	}, [canGoToBuyPage]);

	async function checkIfAllProductsAreAvailable() {
		console.log("Rendering checkIfAllProductsAreAvailable function");

		setCanGoToBuyPage(true);

		const cartProductsId = cartProducts.map(({ _id }) => _id);

		const promises: AxiosPromise<Product>[] = cartProductsId.map(id =>
			axios(`api/products/${id}`)
		);

		const chosen_bottles = cartProducts.map(({ bottle, _id }) => ({
			...bottle,
			_id,
		}));

		const responses = await Promise.allSettled(promises);
		console.log("Responses =", responses);

		const products = responses
			.map(res => {
				if (res.status === "rejected") {
					console.error("Erro ao baixar dados de um dos produtos: ", res);
					return;
				} else return res.value.data;
			})
			.filter(p => {
				console.log("p =", p);

				if (p) return p;
			}) as Product[]; // either a Product[] or an empty []
		console.log("Products =", products);

		cartProducts.forEach(cartProduct => {
			const foundProduct = products.find(({ _id }) => _id === cartProduct._id);

			if (!foundProduct) {
				set_erros_de_informações_não_baixadas(oldErrors => {
					const oldErrorIndex = oldErrors.productsId.findIndex(
						productId => productId === cartProduct._id
					);

					if (oldErrorIndex === -1) {
						// Error for this product doesn't exists. Create a new one:
						return {
							productsId: [...oldErrors.productsId, cartProduct._id],
							messages: [
								...oldErrors.messages,
								`Informações para o produto ${cartProduct.title} não foi baixada! Este produto não irá para o pagamento.`,
							],
						};
					} else {
						// Error for this product alredy exists. Update it:
						const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
						newErrors.messages[
							oldErrorIndex
						] = `Informações para o produto ${cartProduct.title} não foi baixada! Este produto não irá para o pagamento.`;

						return newErrors;
					}
				});

				handleRemoveFromCart(cartProduct);
			} else {
				// Clean possible information error:
				set_erros_de_informações_não_baixadas(oldErrors => {
					const oldErrorIndex = oldErrors.productsId.findIndex(
						productId => productId === cartProduct._id
					);

					if (oldErrorIndex === -1) {
						// Error for this product doesn't exists. Create a new one:
						setCanGoToBuyPage(true);

						return {
							productsId: [...oldErrors.productsId, cartProduct._id],
							messages: [...oldErrors.messages, ""],
						};
					} else {
						// Error for this product alredy exists. Update it:
						const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
						newErrors.messages[oldErrorIndex] = "";

						setCanGoToBuyPage(true);

						return newErrors;
					}
				});

				if (
					parseFloat(cartProduct.bottle.amountThatWillBeBought) >
					parseFloat(foundProduct.bottle.available_quantity)
				) {
					set_erros_de_disponibilidades(oldErrors => {
						const oldErrorIndex = oldErrors.productsId.findIndex(
							productId => productId === cartProduct._id
						);
						const msg = `A quantidade disponível para venda do produto '${cartProduct.title}' é de ${foundProduct.bottle.available_quantity} e você deseja comprar ${cartProduct.bottle.amountThatWillBeBought}! Por favor, ajuste a quantidade para poder continuar, ou se desejar, entre em contato conosco (informações de contato no rodapé da página).`;

						if (oldErrorIndex === -1) {
							// Error for this product doesn't exists. Create a new one:
							return {
								productsId: [...oldErrors.productsId, cartProduct._id],
								messages: [...oldErrors.messages, msg],
							};
						} else {
							// Error for this product alredy exists. Update it:
							const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
							newErrors.messages[oldErrorIndex] = msg;

							return newErrors;
						}
					});

					setCanGoToBuyPage(false);
				} else {
					set_erros_de_disponibilidades(oldErrors => {
						const oldErrorIndex = oldErrors.productsId.findIndex(
							productId => productId === cartProduct._id
						);

						if (oldErrorIndex === -1) {
							// Error for this product doesn't exists. Create a new one:
							return {
								productsId: [...oldErrors.productsId, cartProduct._id],
								messages: [...oldErrors.messages, ""],
							};
						} else {
							// Error for this product alredy exists. Update it:
							const newErrors = Object.create(oldErrors) as InfoNotDownloaded;
							newErrors.messages[oldErrorIndex] = "";

							return newErrors;
						}
					});

					setCanGoToBuyPage(true);
				}
			}
		});
	}

	async function gotoPayment() {
		console.log("Rendering outer gotoPayment");

		try {
			await checkIfAllProductsAreAvailable();
		} catch (error) {
			console.log(error);
		}

		if (canGoToBuyPage) router.push("/checkout");
	}

	const Empty = () => <div>No items in cart!!</div>;

	const Filled = () => (
		<>
			<Grid container spacing={3}>
				{cartProducts.map(product => (
					<Grid item xs={12} sm={4} key={product._id.toString()}>
						<div>{product.title}</div>
					</Grid>
				))}
			</Grid>

			<div className={classes.cardDetails}>
				<Typography variant="h4">Subtotal: R$ {getSubtotal()}</Typography>

				<div>
					<Button
						className={classes.emptyButton}
						variant="contained"
						color="secondary"
						type="button"
						size="large"
					>
						Esvaziar carrinho
					</Button>
					<Button
						className={classes.checkoutButton}
						onClick={gotoPayment}
						variant="contained"
						color="primary"
						type="button"
						size="large"
					>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	return (
		<Container>
			<Head>
				<title>Aromasa Decor - Carrinho</title>
				<meta name="description" content="Carrinho" />
			</Head>

			<ToastContainer />

			<SecondVH>
				{/* <ProductsToBeBoughtSlider productsToBeBought={cartProducts} /> */}
				<Typography className={classes.title} variant="h3">
					Seu carrinho
				</Typography>
				{isCartEmpty ? <Empty /> : <Filled />}
			</SecondVH>
		</Container>
	);
}

Cart.getLayout = getLayout;

export default Cart;
