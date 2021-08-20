import { AddShoppingCart } from "@material-ui/icons";
import { memo } from "react";
import {
	CardActionArea,
	CardActions,
	CardContent,
	IconButton,
	Typography,
	CardMedia,
	Card,
} from "@material-ui/core";

import { Product } from "../../models/Product";

import useStyles from "./styles";

type Props = {
	handleAddToCart(product: Product): void;
	gotoProductPage(): void;
	product: Product;
};

function _ProductCard({ product, gotoProductPage, handleAddToCart }: Props) {
	const classes = useStyles();

	return (
		<Card className={classes.root} square>
			<CardActionArea onClick={gotoProductPage} className={classes.actionArea}>
				<CardMedia
					image={product.imagesPaths[0]}
					className={classes.media}
					title={product.title}
				/>

				<CardContent>
					<div className={classes.cardContent}>
						<Typography variant="h6" gutterBottom className={classes.title}>
							{product.title}
						</Typography>
						<Typography variant="subtitle1" className={classes.price}>
							R$ {product.price.replace(".", ",")}
						</Typography>
					</div>

					<Typography variant="body2" color="textSecondary">
						{truncate(product.description, 100)}
					</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton
					aria-label="Adicionar ao carrinho"
					onClick={() => handleAddToCart(product)}
				>
					<AddShoppingCart className={classes.price} />
				</IconButton>
			</CardActions>
		</Card>
	);
}

export const ProductCard = memo(_ProductCard);

function truncate(str: string, limit: number) {
	return str.length > limit ? str.slice(0, limit) + "\u2026" : str;
}
