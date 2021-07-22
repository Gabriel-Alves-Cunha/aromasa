import { useCallback, useState } from "react";

import fakeProducts from "../../products_example.json";

import { ClientSideProduct } from "../models/Product";

export function useCart() {
	const [cartProducts, setCartProducts] = useState(
		fakeProducts as ClientSideProduct[]
	);

	const handleAddToCart = useCallback((newProduct: ClientSideProduct) => {
		const isProductInCart = cartProducts.find(
			product => product.id === newProduct.id
		);

		if (isProductInCart)
			setCartProducts(oldValues =>
				oldValues.map(item =>
					item.id === newProduct.id
						? { ...item, amount: (item.amount ?? 1) + 1 }
						: item
				)
			);
		else
			setCartProducts(oldValues => [
				...oldValues,
				{ ...newProduct, amount: 1 },
			]);
	}, []);

	const handleSubtractAmount = useCallback((product: ClientSideProduct) => {
		setCartProducts(oldValues =>
			oldValues.map(item => {
				if (item.id === product.id && (item.amount ?? 1) > 1)
					return { ...product, amount: (item.amount ?? 1) - 1 };
				else return item;
			})
		);
	}, []);

	const handleRemoveFromCart = useCallback((product: ClientSideProduct) => {
		setCartProducts(oldValues =>
			oldValues.filter(item => item.id !== product.id)
		);
	}, []);

	const getSubtotal = () => {
		return cartProducts
			.reduce((accumulator, currentProduct) => {
				const { amount, price } = currentProduct;
				return accumulator + (amount ?? 1) * Number(price);
			}, 0)
			.toFixed(2)
			.replace(".", ",");
	};

	return {
		getSubtotal,
		cartProducts,
		handleAddToCart,
		handleSubtractAmount,
		handleRemoveFromCart,
	};
}
