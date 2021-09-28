import { Product } from "models/Product";

export function seeHowManyOfProductExists(product: Product) {
	return product.bottle.available_quantity;
}
