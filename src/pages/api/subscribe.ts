import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";
import { URL } from "url";

import { db_uri } from "../../storage/env";

// TODO: MOVE THIS PART TO SOMEWHERE MORE GLOBAL
let cached_database_connection: Db;
const subscribers_collection_name = "subscribers";

async function connectToDatabase(uri: string) {
	if (cached_database_connection) {
		return cached_database_connection;
	}

	const client = await MongoClient.connect(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}); // acessar o servidor

	const db_name = new URL(uri).pathname.substr(1);
	console.log(`\n[LOG] database name = ${db_name}`);

	const db = client.db(db_name);
	cached_database_connection = db;

	return db;
}
//

export default async (req: VercelRequest, res: VercelResponse) => {
	const { email } = req.body;

	const db = await connectToDatabase(db_uri);

	const collection = db.collection(subscribers_collection_name); // It's going to be created by Mongo
	await collection.insertOne({
		email,
		subscribedAt: new Date(),
	});

	return res.status(201).json({ ok: true }); // status 201 = created successfully
};
