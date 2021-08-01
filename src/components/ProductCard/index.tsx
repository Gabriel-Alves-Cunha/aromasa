import { AddShoppingCart } from "@material-ui/icons";
import { memo } from "react";
import {
	CardActions,
	CardContent,
	IconButton,
	Typography,
	CardMedia,
	Card,
} from "@material-ui/core";

import { Product as Product } from "../../models/Product";

import useStyles from "./styles";

type Props = {
	product: Product;
};

function _ProductCard({ product }: Props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.images[0]}
				title={product.title}
			/>

			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h5" gutterBottom>
						{product.title}
					</Typography>
					<Typography variant="h5">{product.price}</Typography>
				</div>

				<Typography variant="body2" color="textSecondary">
					{product.description}
				</Typography>
			</CardContent>

			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Adicionar ao carrinho">
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
}

export const ProductCard = memo(_ProductCard);
