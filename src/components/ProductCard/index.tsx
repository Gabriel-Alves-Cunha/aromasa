import { FaCartPlus } from "react-icons/fa";
import { memo } from "react";
import {
	CardActionArea,
	CardActions,
	CardContent,
	IconButton,
	Typography,
	CardMedia,
	Card,
} from "@mui/material";

import { Product } from "models/Product";

import useStyles from "./styles";

type Props = {
	handleAddToCart(product: Product): void;
	gotoProductPage(product: Product): void;
	product: Product;
};

function _ProductCard({ product, gotoProductPage, handleAddToCart }: Props) {
	const classes = useStyles();

	return (
        <Card className={classes.root} square>
			<CardActionArea
				onClick={() => gotoProductPage(product)}
				className={classes.actionArea}
			>
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
                    size="large">
					<FaCartPlus className={classes.price} />
				</IconButton>
			</CardActions>
		</Card>
    );
}

export const ProductCard = memo(_ProductCard);

function truncate(str: string, limit: number) {
	return str.length > limit ? str.slice(0, limit) + "\u2026" : str;
}
