let mercadoPagoAccessToken;
let mercadoPagoPublicKey;
let clientId;
let db_uri;

if (process.env.NODE_ENV === "development") {
	mercadoPagoAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN_TEST ?? "";

	mercadoPagoPublicKey = process.env.MERCADO_PAGO_PUBLIC_KEY_TEST ?? "";

	db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";

	clientId = process.env.GOOGLE_CLIENT_ID ?? "";
} else if (process.env.NODE_ENV === "production") {
	mercadoPagoAccessToken =
		process.env.MERCADO_PAGO_ACCESS_TOKEN_PRODUCTION ?? "";

	mercadoPagoPublicKey = process.env.MERCADO_PAGO_PUBLIC_KEY_PRODUCTION ?? "";

	db_uri = process.env.MONGODB_URI_PRODUCTION ?? "";

	clientId = process.env.GOOGLE_CLIENT_ID ?? "";
}

if (!mercadoPagoAccessToken)
	throw new Error("There is not MERCADO_PAGO_PUBLIC_KEY_ on enviroment!");

if (!mercadoPagoPublicKey)
	throw new Error("There is not MERCADO_PAGO_PUBLIC_KEY_ on enviroment!");

if (!clientId) throw new Error("There is not GOOGLE_CLIENT_ID on enviroment!");

if (!db_uri) throw new Error("there is no MONGODB_URI_ from process.env!");

export { clientId, db_uri, mercadoPagoAccessToken, mercadoPagoPublicKey };
