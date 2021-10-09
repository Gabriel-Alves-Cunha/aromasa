import { Drawer, Badge, IconButton } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { useReducer } from "react";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";

import { CardContainer } from "./CardContainer";
import { Divider } from "components";
import { useCart } from "hooks/useCart";

import {
	DrawerContainer,
	ConfirmButton,
	NoItemsStyle,
	Header,
	Span,
} from "./styles";
import theme from "styles/theme";

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

	console.log(
		`[LOG]\n\tFile: 'components/Cart/index.tsx'\n\tLine:33\n\t${typeof cartProducts}: 'cartProducts' =`,
		cartProducts
	);

	const [show, toggleShowCart] = useReducer(
		previousValue => !previousValue,
		false
	);

	const handleBuyProducts = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();

		await router.push("/checkout");
	};

	return (
		<>
			<IconButton
				classes={{ root: classes.button }}
				aria-label="Carrinho de compras"
				onClick={toggleShowCart}
				color="primary"
				size="large"
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
			</IconButton>

			<Drawer anchor="right" open={show} onClose={toggleShowCart}>
				<DrawerContainer>
					<Header>
						Você tem <span>{cartProducts.length}</span>{" "}
						{cartProducts.length > 1 ? "itens" : "item"} no seu carrinho,
						{"\n"}totalizando <span>R$ {getSubtotal()}</span>
					</Header>

					<Divider />

					{cartProducts.length > 0 ? (
						<>
							{cartProducts.map(product => (
								<CardContainer
									handleAddOneMoreToCart={handleAddOneMoreToCart}
									handleSubtractAmount={handleSubtractAmount}
									handleRemoveFromCart={handleRemoveFromCart}
									key={product.title}
									product={product}
								/>
							))}

							<ConfirmButton
								disabled={cartProducts.length === 0}
								onClick={handleBuyProducts}
								type="button"
							>
								Checkout
							</ConfirmButton>
						</>
					) : (
						<NoItems />
					)}
				</DrawerContainer>
			</Drawer>
		</>
	);
}

function NoItems() {
	return (
		<NoItemsStyle>
			<Span>
				<IoBagOutline size={26} color="#fff" />
			</Span>
			<p>Carrinho vazio...</p>
		</NoItemsStyle>
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
