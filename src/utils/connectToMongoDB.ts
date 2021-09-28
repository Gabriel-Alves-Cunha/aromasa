import mongoose from "mongoose";

import { envVariables } from "utils/env";

mongoose.set("bufferCommands", false);

mongoose.connection.on("error", err =>
	console.error("\nError on MongoDB:", err)
);

mongoose.connection.on("connected", () =>
	console.info("\nSuccessfully connected to database.\n")
);

mongoose.connection.on("disconnected", () =>
	console.warn("\nDisconneted from database.\n")
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

	if (!cachedConnectionToMongoDB.promise)
		cachedConnectionToMongoDB.promise = mongoose.connect(envVariables.db_uri, {
			keepAliveInitialDelay: 300_000,
			dbName: envVariables.db_name,
			bufferCommands: false,
			autoCreate: false,
			keepAlive: true,
		});

	try {
		cachedConnectionToMongoDB.conn = await cachedConnectionToMongoDB.promise;
	} catch (error) {
		throw new Error(
			`File: connectToMongoDB.ts\n\tLine:60\n\t${typeof error}: 'error' = ${error}`
		);
	}

	// console.log("\n[LOG] cached.conn =", cachedConnectionToMongoDB.conn);
	// console.log("\n[LOG] db =", cachedConnectionToMongoDB.conn.connections[0].db);

	return cachedConnectionToMongoDB.conn;
}
