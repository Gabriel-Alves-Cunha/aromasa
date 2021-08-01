import { NextApiRequest, NextApiResponse } from "next";

import { ProductModel } from "../../../models/Product";
import connectToDatabase from "../../../utils/connectToMongoDB";

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

				return res.status(200).json({ success: true, data: product });
			} catch (err) {
				console.error("\n[talkToDbWithId on api/products/[id].ts in GET]", err);

				return res.status(400).json({ success: false, data: err });
			}
		///////////////////////////////////////////////
		case "PUT": // update
			try {
				const updatedProduct = await ProductModel.findByIdAndUpdate(
					_id,
					req.body,
					{
						runValidators: true,
						upsert: false, // Don't create a new product if nothing found.
						lean: true, // return a json
						new: true, // return updated object
					}
				);

				return res.status(200).json({ success: true, data: updatedProduct });
			} catch (err) {
				console.error("\n[talkToDbWithId on api/products/[id].ts in PUT]", err);

				return res.status(400).json({ success: false, data: err });
			}
		///////////////////////////////////////////////
		case "DELETE":
			try {
				const deletedProduct = await ProductModel.findByIdAndRemove(_id);

				return res.status(204).json({
					success: true,
					data: deletedProduct,
				});
			} catch (err) {
				console.error(
					"\n[talkToDbWithId on api/products/[id].ts in DELETE]",
					err
				);

				return res.status(400).json({ success: false, data: err });
			}
		///////////////////////////////////////////////
		default:
			return res
				.status(400)
				.json({ success: false, data: "Entered default case!" });
	}
}
