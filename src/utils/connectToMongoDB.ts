import mongoose from "mongoose";

import { envVariables } from "../storage/env";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose;
// @ts-ignore
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function connectToDatabase() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(envVariables.db_uri, {
				dbName: envVariables.db_name,
				useUnifiedTopology: true,
				useFindAndModify: false,
				bufferCommands: false,
				useNewUrlParser: true,
				useCreateIndex: true,
				bufferMaxEntries: 0,
			})
			.then(mongoose => mongoose)
			.catch(err =>
				console.error("\n[connectToMongoDB in 'if (!cached.promise)']", err)
			);
	}

	mongoose.connection.on("error", err =>
		console.error("\n[connectToMongoDB on connection]", err)
	);

	cached.conn = await cached.promise;
	// console.log("\n[LOG] cached.conn =", cached.conn);
	// console.log("\n[LOG] db =", cached.conn.connections[0].db);
	console.log("\nSuccessfully connected to database.\n");

	return cached.conn;
}
