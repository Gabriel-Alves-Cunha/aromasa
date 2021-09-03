import { parseCookies, setCookie } from "nookies";
import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from "react";

import { ClientChosenProduct, Product } from "models/Product";
// import fakeProducts from "../../products_example2.json";

export type CartContextProps = {
	handleAddOneMoreToCart(productToBeAdded: ClientChosenProduct | Product): void;
	handleAddPossibleNewProductToCart(newProduct: Product): void;
	handleSubtractAmount(product: ClientChosenProduct): void;
	handleRemoveFromCart(product: ClientChosenProduct): void;
	cartProducts: ClientChosenProduct[];
	getSubtotal(): string;
};

type CartProviderProps = {
	children: ReactNode;
};

// const fakeClientChosenProducts: ClientChosenProduct[] = fakeProducts.map(
// 	product => ({
// 		bottle: {
// 			bottle_format: product.bottle.bottle_format ?? undefined,
// 			volume: product.bottle.volume ?? undefined,
// 			weight: product.bottle.weight ?? undefined,
// 			amountThatWillBeBought: "1",
// 		},
// 		ingredients: product.ingredients ?? undefined,
// 		imagePath: product.imagesPaths[0],
// 		description: product.description,
// 		categories: product.categories,
// 		price: product.price,
// 		title: product.title,
// 		_id: product._id,
// 	})
// );

export const CartContext = createContext({} as CartContextProps);

function CartProvider({ children }: CartProviderProps) {
	const [cartProducts, setCartProducts] = useState([] as ClientChosenProduct[]);

	useEffect(() => {
		if (cartProducts.length === 0) {
			console.log("cartProducts.length === 0 |=> parsing cookies!");

			const cookies = parseCookies();
			console.log(
				`[LOG]\n\tFile: useCart.tsx\n\tLine:55\n\t${typeof cookies}: 'cookies' =`,
				cookies
			);

			const cartProductsFromCookies = (JSON.parse(cookies.cartProducts) ||
				[]) as ClientChosenProduct[];
			setCartProducts(_oldValue => cartProductsFromCookies);
		}

		// For client-side, omit context parameter.
		setCookie(null, "cartProducts", JSON.stringify(cartProducts), {
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
	}, []);

	function handleAddPossibleNewProductToCart(newProduct: Product) {
		const isProductInCart = cartProducts.some(
			({ _id }) => _id === newProduct._id
		);
		console.log("isProductInCart =", isProductInCart);

		// Add one more to the cart:
		if (isProductInCart) handleAddOneMoreToCart(newProduct);
		// Add new one to the cart:
		else {
			setCartProducts(oldCartProducts => [
				...oldCartProducts,
				{
					bottle: {
						bottle_format: newProduct.bottle.bottle_format,
						volume: newProduct.bottle.volume,
						weight: newProduct.bottle.weight,
						amountThatWillBeBought: "1",
					},
					imagePath: newProduct.imagesPaths[0],
					ingredients: newProduct.ingredients,
					description: newProduct.description,
					categories: newProduct.categories,
					title: newProduct.title,
					price: newProduct.price,
					_id: newProduct._id,
				},
			]);

			console.log("Added new product to product.", newProduct._id);
		}
	}

	function handleAddOneMoreToCart(
		productToBeAdded: ClientChosenProduct | Product
	) {
		console.log("Adding one more to cart.", productToBeAdded._id);

		const productInCartIndex = cartProducts.findIndex(
			({ _id }) => _id === productToBeAdded._id
		);

		setCartProducts(oldCartProducts => {
			const oldcartProduct = oldCartProducts[productInCartIndex];
			const newCartProducts = oldCartProducts.map(_ => _);

			const updatedCartProduct: ClientChosenProduct = {
				...oldcartProduct,
				bottle: {
					...oldcartProduct.bottle,
					amountThatWillBeBought:
						parseFloat(oldcartProduct.bottle.amountThatWillBeBought) + 1 + "",
				},
			};

			newCartProducts[productInCartIndex] = updatedCartProduct;

			return newCartProducts;
		});
	}

	function handleSubtractAmount(product: ClientChosenProduct) {
		const productIndex = cartProducts.findIndex(
			({ _id }) => _id === product._id
		);
		const isPositive =
			parseFloat(cartProducts[productIndex].bottle.amountThatWillBeBought) > 1;

		if (productIndex !== -1 && isPositive) {
			setCartProducts(oldCartProducts => {
				const newCartProducts = oldCartProducts.map(_ => _);

				newCartProducts[productIndex] = {
					...product,
					bottle: {
						...product.bottle,
						amountThatWillBeBought:
							parseFloat(product.bottle.amountThatWillBeBought) - 1 + "",
					},
				};

				return newCartProducts;
			});
		}
	}

	function handleRemoveFromCart(product: ClientChosenProduct) {
		setCartProducts(oldCartProducts =>
			oldCartProducts.filter(({ _id }) => _id !== product._id)
		);
	}

	function getSubtotal() {
		const subtotal = cartProducts.reduce(
			(acc, { bottle: { amountThatWillBeBought }, price: price_ }) => {
				const amount = parseFloat(amountThatWillBeBought) || 1;
				const price = parseFloat(price_);
				return acc + amount * price;
			},
			0
		);

		if (subtotal >= 0) return subtotal.toFixed(2).replace(".", ",");
		else throw new Error("Houve um erro na contabilização do preço subtotal!");
	}

	return (
		<CartContext.Provider
			value={{
				handleAddPossibleNewProductToCart,
				handleAddOneMoreToCart,
				handleSubtractAmount,
				handleRemoveFromCart,
				cartProducts,
				getSubtotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
