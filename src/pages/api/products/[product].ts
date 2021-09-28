import { NextApiRequest, NextApiResponse } from "node_modules/next";
import Stripe from "stripe";

import { envVariables } from "utils/env";
import { ProductModel } from "models/Product";
import connectToMongoDB from "utils/connectToMongoDB";

const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});

export default async function talkToDbWithId(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectToMongoDB();

	const {
		query: { _id },
		method,
	} = req;

	switch (method) {
		// GET a product with id
		case "GET":
			try {
				const product = await ProductModel.findById(_id);

				if (product)
					return res.status(200).json({ success: true, data: product });
				else
					return res.status(400).json({
						success: false,
						data: `GET product with id = ${_id} was not found!`,
					});
			} catch (errorGet) {
				console.error(
					`[talkToDbWithId on 'pages/api/products/[product].ts' in DELETE]\n\tLine:38\n\t${typeof errorGet}: 'errorGet' =`,
					errorGet
				);

				return res.status(400).json({ success: false, data: errorGet });
			}
			break;
		///////////////////////////////////////////////
		// Update a product with a certain id with the things from req.body
		case "PUT":
			try {
				const updatedProductOnDB = await ProductModel.findByIdAndUpdate(
					_id,
					req.body,
					{
						runValidators: true,
						upsert: false, // Don't create a new product if nothing found.
						lean: true, // return a json
						new: true, // return updated object
					}
				);

				if (updatedProductOnDB)
					return res.status(200).json({
						success: true,
						data: updatedProductOnDB,
					});
				else
					return res
						.status(400)
						.json({ success: false, data: "updatedProductOnDB returned null" });
			} catch (errorPut) {
				console.error(
					`[talkToDbWithId on 'pages/api/products/[product].ts' in DELETE]\n\tLine:71\n\t${typeof errorPut}: 'errorPut' =`,
					errorPut
				);

				return res.status(400).json({ success: false, data: errorPut });
			}
			break;
		///////////////////////////////////////////////
		// Delete a product with id
		case "DELETE":
			try {
				const deletedProductOnDB = await ProductModel.findByIdAndRemove(_id);

				if (deletedProductOnDB) {
					const deletedProductOnStripe = await stripe.products.del(
						_id.toString()
					);

					return res.status(204).json({
						success: true,
						data: { deletedProductOnDB, deletedProductOnStripe },
					});
				} else
					return res
						.status(400)
						.json({ success: false, data: "deletedProductOnDB returned null" });
			} catch (errorDelete) {
				console.error(
					`[talkToDbWithId on 'pages/api/products/[product].ts' in DELETE]\n\tLine:99\n\t${typeof errorDelete}: 'errorDelete' =`,
					errorDelete
				);

				return res.status(400).json({ success: false, data: errorDelete });
			}
			break;
		///////////////////////////////////////////////
		default:
			return res.status(400).json({
				success: false,
				data: "Entered default case on 'pages/api/products/[product].ts'!",
			});
			break;
	}
}
