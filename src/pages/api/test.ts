import { VercelRequest, VercelResponse } from "@vercel/node";

import connectToDatabase from "../../utils/connectToMongoDB";


const test_connectToDatabase = async (
	req: VercelRequest,
	res: VercelResponse
) => {
	await connectToDatabase();

	// const collection = db.collection(products_collection_name); // It's going to be created by Mongo
	// await collection.insertOne({
	// 	email,
	// 	subscribedAt: new Date(),
	// });

	return res.json({ test: "test" });
};

export default test_connectToDatabase;
