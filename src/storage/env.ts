const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
if (!clientId) throw new Error("There is not GOOGLE_CLIENT_ID on enviroment!");

const db_uri = process.env.MONGODB_URI ?? "";
if (!db_uri)
	throw new Error(
		"\n[ERROR] at subscribe.ts: there is no db_uri from process.env!"
	);

export { clientId, db_uri };
