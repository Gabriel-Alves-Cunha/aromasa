import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";

import { ProductModel, Product } from "../../models/Product";
import { ProductCard } from "../../components/ProductCard";
import { getLayout } from "../../components/Layout";
import { useCart } from "../../hooks/useCart";
import { Header } from "../../components";
import connectToDatabase from "../../utils/connectToMongoDB";
import fakeProducts from "../../../products_example2.json";

import useStyles from "./styles";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	products: Product[];
};
// { products }: Props
function Products() {
	const { handleAddPossibleNewProductToCart, cartProducts } = useCart();
	const products: Product[] = fakeProducts;
	const classes = useStyles();
	const router = useRouter();

	console.log(
		`❗ File: index.tsx\nLine:27\n${typeof cartProducts}: 'cartProducts'`,
		cartProducts
	);

	function gotoProductPage() {
		console.log("gotoProductPage");

		//router.push(`/product/${product._id.toString()}`);
	}

	function handleAddToCart(product: Product) {
		handleAddPossibleNewProductToCart(product);

		toast.success("🦄 Produto adicionado ao carrinho!", {
			hideProgressBar: false,
			position: "top-left",
			progress: undefined,
			closeOnClick: true,
			pauseOnHover: true,
			autoClose: 3000,
			draggable: true,
		});
	}

	// console.log("\nProducts client-side =", products);

	return (
		<>
			<Header currentPage="Produtos" />

			<div className={classes.content}>
				<ToastContainer />

				<div className={classes.addHeaderHeight} />
				<Grid
					justifyContent="center"
					alignItems="stretch"
					direction="row"
					spacing={4}
					container
				>
					{products?.map(product => (
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

export default Products;

// export const getServerSideProps: GetServerSideProps = async ctx => {
// 	try {
// 		await connectToDatabase();

// 		const products = await ProductModel.find({});

// 		console.log(
// 			"\nproducts from getServerSideProps in 'pages/products/index.tsx' =",
// 			products
// 		);

// 		return {
// 			props: {
// 				products,
// 			},
// 		};
// 	} catch (error) {
// 		console.log(`❗ File: index.tsx\nLine:51\n${typeof error}: 'error'`, error);

// 		return {
// 			props: {
// 				products: [],
// 			},
// 		};
// 	}
// };
