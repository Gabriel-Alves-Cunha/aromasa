import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import {
	CardActions,
	CardContent,
	Typography,
	CardMedia,
	Card,
} from "@material-ui/core";

import { ClientChosenProduct } from "models/Product";
import { useCart } from "hooks/useCart";

import { StyledButton } from "components/Cart/styles";
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
				<StyledButton
					onClick={() => handleAddOneMoreToCart(product)}
					title="Adicionar um"
				>
					<AiOutlinePlus />
				</StyledButton>
				<StyledButton
					onClick={() => handleRemoveFromCart(product)}
					title="Remover"
				>
					<FiTrash2 size={19} />
				</StyledButton>
				<StyledButton
					onClick={() => handleSubtractAmount(product)}
					title="Subtrair um"
				>
					<AiOutlineMinus />
				</StyledButton>
			</CardActions>
		</Card>
	);
}
