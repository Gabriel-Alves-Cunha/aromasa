import { VercelRequest, VercelResponse } from "@vercel/node";

import { product_collection_name } from "./../../../models/Product";
import { Product } from "../../../models/Product";
import connectToDatabase from "../../../utils/connectToMongoDB";

export default async function talkToDB(
	req: VercelRequest,
	res: VercelResponse
) {
	const db = await connectToDatabase();
	const productsCollection = db.collection<Product>(product_collection_name);

	const { method } = req;

	switch (method) {
		case "GET" || undefined:
			try {
				const result = await productsCollection.find().toArray();

				return res.status(200).json({ success: true, data: result });
			} catch (error) {
				console.error(error);

				return res.status(400).json({ success: false, data: error });
			}
		///////////////////////////////////////////////
		case "POST": // create
			try {
				const newProduct = await productsCollection.insertOne(req.body);

				return res.status(201).json({ success: true, data: newProduct });
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
