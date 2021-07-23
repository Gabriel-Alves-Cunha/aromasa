const mercadoPagoAccessToke = process.env.MERCADO_PAGO_ACCESS_TOKEN ?? "";
if (!mercadoPagoAccessToke)
	throw new Error("There is not MERCADO_PAGO_PUBLIC_KEY on enviroment!");

const mercadoPagoPublicKey = process.env.MERCADO_PAGO_PUBLIC_KEY ?? "";
if (!mercadoPagoPublicKey)
	throw new Error("There is not MERCADO_PAGO_PUBLIC_KEY on enviroment!");

const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
if (!clientId) throw new Error("There is not GOOGLE_CLIENT_ID on enviroment!");

const db_uri =
	process.env.NODE_ENV === "development"
		? process.env.MONGODB_URI_DEVELOPMENT ?? ""
		: process.env.NODE_ENV === "production"
		? process.env.MONGODB_URI_PRODUCTION ?? ""
		: "";

if (!db_uri)
	throw new Error(
		"\n[ERROR] at subscribe.ts: there is no db_uri from process.env!"
	);

export { clientId, db_uri };
