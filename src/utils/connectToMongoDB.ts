import { MongoClient, Db } from "mongodb";
import { URL } from "url";

import { db_uri } from "../storage/env";

let cached_database_connection: Db;

export default async function connectToDatabase() {
	console.log("\n[LOG] Connecting to database...");

	if (cached_database_connection) return cached_database_connection;

	const client = await MongoClient.connect(db_uri, {
		appname: "Aromasa Decor website",
		useUnifiedTopology: true,
		connectTimeoutMS: 6000,
		useNewUrlParser: true,
		validateOptions: true,
		numberOfRetries: 3,
	}); // acessar o servidor

	const db_name = new URL(db_uri).pathname.substr(1);
	console.log(`\n[LOG] database name = ${db_name}`);

	const db = client.db(db_name);
	cached_database_connection = db;

	// console.log("\n[LOG] MongoDB database: \n\n", db);

	return db;
}
