import mongoose from "mongoose";

import { db_uri } from "../storage/env";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function dbConnect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		const options = {
			useNewUrlParse: true,
			useUnifiedTopology: true,
			bufferCommands: false,
			bufferMaxEntries: 0,
			useFindAndModify: false,
			useCreateIndex: true,
		};

		cached.promise = mongoose
			.connect(db_uri, options)
			.then(mongoose => mongoose);
	}

	cached.conn = await cached.promise;

	return cached.conn;
}
