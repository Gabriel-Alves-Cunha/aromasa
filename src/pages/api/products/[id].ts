import { VercelRequest, VercelResponse } from "@vercel/node";

import { Product, product_collection_name } from "../../../models/Product";
import connectToDatabase from "../../../utils/connectToMongoDB";

export default async function onlyUseThisFunctionIfYouAreAnAdmin(
	req: VercelRequest,
	res: VercelResponse
) {
	const db = await connectToDatabase();
	const productsCollection = db.collection<Product>(product_collection_name);

	const {
		query: { id },
		method,
	} = req;
	const query = { id };

	switch (method) {
		case "GET" || undefined:
			try {
				const product = productsCollection.find(query);

				return res
					.status(product ? 200 : 400)
					.json({ success: true, data: product });
			} catch (error) {
				console.error(error);

				return res.status(400).json({ success: false, data: error });
			}
		///////////////////////////////////////////////
		case "PUT": // update
			try {
				const updatedProduct = await productsCollection.updateOne(
					query,
					req.body,
					{
						upsert: false, // Don't create a new product if nothing found.
					}
				);

				return res
					.status(updatedProduct.modifiedCount === 1 ? 200 : 400)
					.json({ success: true, data: updatedProduct.result });
			} catch (error) {
				console.error(error);

				return res.status(400).json({ success: false, data: error });
			}
		///////////////////////////////////////////////
		case "DELETE":
			try {
				const deletedProduct = await productsCollection.deleteOne(query);

				return res.status(deletedProduct.deletedCount === 1 ? 200 : 400).json({
					success: true,
					data: {
						result: deletedProduct.result,
					},
				});
			} catch (error) {
				console.error(error);

				return res.status(400).json({ success: false, data: error });
			}
		///////////////////////////////////////////////
		default:
			return res
				.status(400)
				.json({ success: false, data: "Entered default case!" });
	}
}
