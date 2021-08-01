import { useCallback, useState } from "react";

import fakeProducts from "../../products_example.json";

import { ClientChosenProduct } from "../models/Product";

export function useCart() {
	const [cartProducts, setCartProducts] = useState(
		fakeProducts as unknown as ClientChosenProduct[]
	);

	const handleAddToCart = useCallback((newProduct: ClientChosenProduct) => {
		const isProductInCart = cartProducts.find(
			product => product._id === newProduct._id
		);

		if (isProductInCart)
			setCartProducts(oldValues =>
				oldValues.map(item =>
					item._id === newProduct._id
						? { ...item, amountThatWillBeBought: (item.amountThatWillBeBought ?? 1) + 1 }
						: item
				)
			);
		else
			setCartProducts(oldValues => [
				...oldValues,
				{ ...newProduct, amountThatWillBeBought: 1 },
			]);
	}, []);

	const handleSubtractAmount = useCallback((product: ClientChosenProduct) => {
		setCartProducts(oldValues =>
			oldValues.map(item => {
				if (item._id === product._id && (item.amountThatWillBeBought ?? 1) > 1)
					return { ...product, amountThatWillBeBought: (item.amountThatWillBeBought ?? 1) - 1 };
				else return item;
			})
		);
	}, []);

	const handleRemoveFromCart = useCallback((product: ClientChosenProduct) => {
		setCartProducts(oldValues =>
			oldValues.filter(item => item._id !== product._id)
		);
	}, []);

	const getSubtotal = () =>
		cartProducts
			.reduce((accumulator, currentProduct) => {
				const { amountThatWillBeBought: amount, price } = currentProduct;
				return accumulator + (amount ?? 1) * price;
			}, 0)
			.toFixed(2)
			.replace(".", ",");

	return {
		getSubtotal,
		cartProducts,
		handleAddToCart,
		handleSubtractAmount,
		handleRemoveFromCart,
	};
}
