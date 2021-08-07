import { useState, useCallback } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Drawer, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";

import { CardContainer } from "./CardContainer";
import { Divider } from "../Divider";
import { useCart } from "../../hooks/useCart";

import {
	DrawerContainer,
	ConfirmButton,
	StyledButton,
	NoItems,
	Header,
} from "./styles";
import theme from "../../styles/theme";

export function Cart() {
	const classes = useStyles();
	const router = useRouter();
	const {
		handleAddOneMoreToCart,
		handleRemoveFromCart,
		handleSubtractAmount,
		cartProducts,
		getSubtotal,
	} = useCart();

	const [show, setShow] = useState(false);

	const handleOpenCart = useCallback(() => setShow(oldValue => !oldValue), []);

	function handleBuyProducts(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		router.push("/buy");
	}

	return (
		<>
			<StyledButton
				classes={{ root: classes.button }}
				onClick={() => handleOpenCart()}
				aria-label="Carrinho de compras"
			>
				<Badge
					badgeContent={cartProducts.length}
					classes={{ badge: classes.badge }}
					overlap="circular"
					variant="dot"
					color="error"
				>
					<FiShoppingCart size={18} />
				</Badge>
			</StyledButton>

			<Drawer anchor="right" open={show} onClose={() => handleOpenCart()}>
				<DrawerContainer>
					<Header>
						Você tem <span>{cartProducts.length}</span>{" "}
						{cartProducts.length > 1 ? "itens" : "item"} no seu carrinho,
						{"\n"}totalizando <span>R$ {getSubtotal()}</span>
					</Header>

					<Divider />

					{cartProducts.length > 0 ? (
						cartProducts.map(product => (
							<CardContainer
								handleAddOneMoreToCart={handleAddOneMoreToCart}
								handleSubtractAmount={handleSubtractAmount}
								handleRemoveFromCart={handleRemoveFromCart}
								key={product._id.toString()}
								product={product}
							/>
						))
					) : (
						<NoItems>Não há nenhum item no seu carrinho...</NoItems>
					)}

					<ConfirmButton
						disabled={cartProducts.length === 0}
						onClick={handleBuyProducts}
						type="button"
					>
						Checkout
					</ConfirmButton>
				</DrawerContainer>
			</Drawer>
		</>
	);
}

const useStyles = makeStyles(_muiTheme => ({
	badge: {
		backgroundColor: theme.colors.light.primary,
	},
	button: {
		color: theme.colors.light.primary,
	},
}));
