import { GetServerSideProps } from "next";
import { ReactNode } from "react";
import { Grid } from "@material-ui/core";

import { ProductModel, Product } from "../../models/Product";
import { ProductCard } from "../../components/ProductCard";
import connectToDatabase from "../../utils/connectToMongoDB";
import fakeProducts from "../../../products_example2.json";
import Layout from "../../components/Layout";

import useStyles from "./styles";

type Props = {
	products: Product[];
};
// { products }: Props
function Products() {
	const products: Product[] = fakeProducts;
	const classes = useStyles();
	console.log("\nProducts client-side =", products);

	return (
		<div className={classes.content}>
			<div className={classes.addHeaderHeight} />
			<Grid justifyContent="center" spacing={4} container>
				{products?.map(product => (
					<Grid item key={product._id.toString()} xs={12} sm={6} md={4} lg={3}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}

Products.getLayout = (page: ReactNode) => (
	<Layout currentPage="Produtos">{page}</Layout>
);

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
