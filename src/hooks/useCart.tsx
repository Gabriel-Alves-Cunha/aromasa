import { useCallback, useState } from "react";

import { ClientChosenProduct, Product } from "../models/Product";
import fakeProducts from "../../products_example2.json";

export function useCart() {
	const [cartProducts, setCartProducts] = useState(
		fakeProducts as unknown as ClientChosenProduct[]
	);

	const handleAddPossilbeNewProductToCart = useCallback(
		(newProduct: Product) => {
			const isProductInCart = cartProducts.some(
				({ _id }) => _id === newProduct._id
			);

			// Add one more to the cart:
			if (isProductInCart) handleAddOneMoreToCart(newProduct);
			// Add new one to the cart:
			else
				setCartProducts(oldCartProducts => [
					...oldCartProducts,
					{
						bottle: {
							amountThatWillBeBought: "1",
							bottle_format: newProduct.bottle.bottle_format,
							volume: newProduct.bottle.volume,
							weight: newProduct.bottle.weight,
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
		},
		[]
	);

	const handleAddOneMoreToCart = useCallback(
		(productToBeAdded: ClientChosenProduct | Product) => {
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
		},
		[]
	);

	const handleSubtractAmount = useCallback((product: ClientChosenProduct) => {
		const productIndex = cartProducts.findIndex(
			({ _id }) => _id === product._id
		);

		if (productIndex !== -1) {
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
	}, []);

	const handleRemoveFromCart = useCallback((product: ClientChosenProduct) => {
		setCartProducts(oldCartProducts =>
			oldCartProducts.filter(({ _id }) => _id !== product._id)
		);
	}, []);

	const getSubtotal = () =>
		cartProducts
			.reduce((accumulator, { bottle, price: price_ }) => {
				const amount = parseFloat(bottle.amountThatWillBeBought) || 1;
				const price = parseFloat(price_);
				return accumulator + amount * price;
			}, 0)
			.toFixed(2)
			.replace(".", ",");

	return {
		handleAddPossilbeNewProductToCart,
		handleAddOneMoreToCart,
		handleSubtractAmount,
		handleRemoveFromCart,
		cartProducts,
		getSubtotal,
	};
}
