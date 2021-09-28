import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import {
	CardActions,
	CardContent,
	IconButton,
	Typography,
	CardMedia,
	Card,
} from "@mui/material";

import { ClientChosenProduct } from "models/Product";
import { useCart } from "hooks/useCart";

import useStyles from "./styles";

type Props = {
	gotoProductPage(product: ClientChosenProduct): void;
	product: ClientChosenProduct;
};

export function CheckoutCardForProduct({ gotoProductPage, product }: Props) {
	const { handleRemoveFromCart, handleAddOneMoreToCart, handleSubtractAmount } =
		useCart();
	const classes = useStyles();

	return (
		<Card className={classes.root} square>
			<CardMedia
				onClick={() => gotoProductPage(product)}
				image={product.imagePath}
				className={classes.media}
				title={product.title}
			/>

			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						{product.title}
					</Typography>
					<Typography variant="subtitle1" className={classes.price}>
						R$ {product.price.replace(".", ",")} ×
						{" " + product.bottle.amountThatWillBeBought}
					</Typography>
				</div>
			</CardContent>

			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton
					onClick={() => handleAddOneMoreToCart(product)}
					title="Adicionar um item"
				>
					<AiOutlinePlus />
				</IconButton>
				<IconButton
					onClick={() => handleRemoveFromCart(product)}
					title="Remover o produto"
				>
					<FiTrash2 size={19} />
				</IconButton>
				<IconButton
					onClick={() => handleSubtractAmount(product)}
					title="Subtrair um item"
				>
					<AiOutlineMinus />
				</IconButton>
			</CardActions>
		</Card>
	);
}
