import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { envVariables } from "storage/env";
import { ProductModel } from "models/Product";
import connectToDatabase from "utils/connectToMongoDB";

const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});

export default async function talkToDbWithId(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectToDatabase();

	const {
		query: { _id },
		method,
	} = req;

	switch (method) {
		case "GET" || undefined:
			try {
				const product = await ProductModel.findById(_id);

				if (product)
					return res.status(200).json({ success: true, data: product });
				else
					return res.status(400).json({
						success: false,
						data: `GET product with id = ${_id} was not found!`,
					});
			} catch (err) {
				console.error(
					"\n[talkToDbWithId on 'api/products/[id].ts' in GET]",
					err
				);

				return res.status(400).json({ success: false, data: err });
			}
			break;
		///////////////////////////////////////////////
		case "PUT": // update
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
			} catch (err) {
				console.error("\n[talkToDbWithId on api/products/[id].ts in PUT]", err);

				return res.status(400).json({ success: false, data: err });
			}
			break;
		///////////////////////////////////////////////
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
			} catch (err) {
				console.error(
					"\n[talkToDbWithId on api/products/[id].ts in DELETE]",
					err
				);

				return res.status(400).json({ success: false, data: err });
			}
			break;
		///////////////////////////////////////////////
		default:
			return res.status(400).json({
				success: false,
				data: "Entered default case on 'pages/api/products/[id].ts'!",
			});
			break;
	}
}
