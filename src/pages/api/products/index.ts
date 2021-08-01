import { NextApiRequest, NextApiResponse } from "next";

import { ProductModel } from "../../../models/Product";
import connectToDatabase from "../../../utils/connectToMongoDB";

export default async function talkToDB(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectToDatabase();

	console.log("\nreq.body =", req.body);

	const { method } = req;

	switch (method) {
		case "GET" || undefined: // Find all products
			try {
				const products = await ProductModel.find({});

				return res.status(200).json({ success: true, data: products });
			} catch (err) {
				console.error("\n[talkToDB on api/products/index.ts in GET]", err);

				return res.status(400).json({ success: false, data: err });
			}
		///////////////////////////////////////////////
		case "POST": // Create a new product
			try {
				const newProduct = await ProductModel.create(req.body, {
					validateBeforeSave: true,
					timestamps: true,
					checkKeys: true,
					safe: true,
				});

				return res.status(201).json({ success: true, data: newProduct });
			} catch (err) {
				console.error("\n[talkToDB on api/products/index.ts in POST]", err);

				return res.status(400).json({ success: false, data: err });
			}
		///////////////////////////////////////////////
		default:
			return res
				.status(400)
				.json({ success: false, data: "Entered default case!" });
	}
}
