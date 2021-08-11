import { useCallback, useState } from "react";

import { ClientChosenProduct, Product } from "../models/Product";
import fakeProducts from "../../products_example2.json";

const fakeClientChosenProducts: ClientChosenProduct[] = fakeProducts.map(
	product => ({
		bottle: {
			bottle_format: product.bottle.bottle_format ?? undefined,
			volume: product.bottle.volume ?? undefined,
			weight: product.bottle.weight ?? undefined,
			amountThatWillBeBought: "1",
		},
		ingredients: product.ingredients ?? undefined,
		imagePath: product.imagesPaths[0],
		description: product.description,
		categories: product.categories,
		price: product.price,
		title: product.title,
		_id: product._id,
	})
);

export function useCart() {
	const [cartProducts, setCartProducts] = useState(fakeClientChosenProducts);

	const handleAddPossilbeNewProductToCart = (newProduct: Product) => {
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
	};

	const handleAddOneMoreToCart = (
		productToBeAdded: ClientChosenProduct | Product
	) => {
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
	};

	const handleSubtractAmount = (product: ClientChosenProduct) => {
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
	};

	const handleRemoveFromCart = (product: ClientChosenProduct) => {
		setCartProducts(oldCartProducts =>
			oldCartProducts.filter(({ _id }) => _id !== product._id)
		);
	};

	const getSubtotal = () => {
		const subtotal = cartProducts.reduce(
			(acc, { bottle: { amountThatWillBeBought }, price: price_ }) => {
				const amount = parseFloat(amountThatWillBeBought) || 1;
				const price = parseFloat(price_);
				return acc + amount * price;
			},
			0
		);

		if (subtotal >= 0) {
			return subtotal.toFixed(2).replace(".", ",");
		} else {
			throw new Error("Houve um erro na contabilização do preço subtotal!");
		}
	};

	return {
		handleAddPossilbeNewProductToCart,
		handleAddOneMoreToCart,
		handleSubtractAmount,
		handleRemoveFromCart,
		cartProducts,
		getSubtotal,
	};
}
