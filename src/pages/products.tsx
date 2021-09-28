import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "node_modules/next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

import { ProductCard, Header, getLayout } from "components";
import { ProductModel, Product } from "models/Product";
import { useCart } from "hooks/useCart";
import connectToMongoDB from "utils/connectToMongoDB";

import useStyles from "styles/pages/products";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	products: Product[];
};

export default function Products({ products }: Props) {
	const { handleAddPossibleNewProductToCart, cartProducts } = useCart();
	const classes = useStyles();
	const router = useRouter();

	useEffect(() => {
		console.log(
			`[LOG]\n\tFile: index.tsx\n\tLine:26\n\t${typeof cartProducts}: 'cartProducts' =`,
			cartProducts
		);
	}, [cartProducts]);

	async function gotoProductPage(product: Product) {
		console.log("gotoProductPage");

		await router.push(`/product/${product._id.toString()}`);
	}

	function handleAddToCart(product: Product) {
		handleAddPossibleNewProductToCart(product);

		toast.success("🦄 Produto adicionado ao carrinho!", {
			hideProgressBar: true,
			position: "top-left",
			progress: undefined,
			closeOnClick: true,
			pauseOnHover: true,
			autoClose: 3000,
			draggable: true,
		});
	}

	console.log("\nProducts client-side =", products);

	return (
		<>
			<Header currentPage="Produtos" />
			<ToastContainer />

			<div className={classes.content}>
				<div className={classes.addHeaderHeight} />
				<Grid
					justifyContent="center"
					alignItems="stretch"
					direction="row"
					spacing={4}
					container
				>
					{products.map(product => (
						<Grid
							key={product._id.toString()}
							xs={12}
							sm={6}
							md={4}
							lg={3}
							item
						>
							<ProductCard
								gotoProductPage={gotoProductPage}
								handleAddToCart={handleAddToCart}
								product={product}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		</>
	);
}

Products.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		await connectToMongoDB();

		const products = await ProductModel.find({});

		console.log(
			`Products from getServerSideProps in 'pages/products/index.tsx' = ${products}`
		);

		return {
			props: {
				products,
			},
		};
	} catch (error) {
		throw new Error(error as string);
	}
};
