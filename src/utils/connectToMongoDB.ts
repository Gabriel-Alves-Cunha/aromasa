import mongoose from "mongoose";

import { envVariables } from "storage/env";

console.log("envVariables.db_uri =", envVariables.db_uri);

mongoose.set("bufferCommands", false);

mongoose.connection.on("error", err =>
	console.error("\nError on MongoDB:", err)
);

mongoose.connection.on("connected", () =>
	console.log("\nSuccessfully connected to database.\n")
);

mongoose.connection.on("disconnected", e =>
	console.log("\nDisconneted from database.\n", e)
);

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedConnectionToMongoDB: {
	promise: null | Promise<typeof mongoose>;
	conn: null | typeof mongoose;
	//@ts-ignore
} = global.mongoose;

if (!cachedConnectionToMongoDB) {
	// @ts-ignore
	cachedConnectionToMongoDB = global.mongoose = {
		promise: null,
		conn: null,
	};
}

export default async function connectToMongoDB() {
	if (cachedConnectionToMongoDB.conn) return cachedConnectionToMongoDB.conn;

	if (
		// process.env.NODE_ENV === "development" &&
		!cachedConnectionToMongoDB.promise
	)
		cachedConnectionToMongoDB.promise = mongoose.connect(envVariables.db_uri, {
			keepAliveInitialDelay: 300_000,
			dbName: envVariables.db_name,
			useUnifiedTopology: true,
			useFindAndModify: false,
			bufferCommands: false,
			useNewUrlParser: true,
			useCreateIndex: true,
			bufferMaxEntries: 0,
			keepAlive: true,
		});

	try {
		cachedConnectionToMongoDB.conn = await cachedConnectionToMongoDB.promise;
	} catch (error) {
		console.error(
			`[ERROR]\n\tFile: connectToMongoDB.ts\n\tLine:63\n\t${typeof error}: 'error' =`,
			error
		);
	}
	// console.log("\n[LOG] cached.conn =", cached.conn);
	// console.log("\n[LOG] db =", cached.conn.connections[0].db);

	return cachedConnectionToMongoDB.conn;
}
