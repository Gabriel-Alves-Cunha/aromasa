const envVariables = {
	mercadoPagoAccessToken: "",
	mercadoPagoPublicKey: "",
	aromasaUrl: "",
	clientId: "",
	db_name: "",
	db_uri: "",
};

if (process.env.NODE_ENV === "development") {
	envVariables.mercadoPagoAccessToken =
		process.env.MERCADO_PAGO_ACCESS_TOKEN_TEST ?? "";

	envVariables.mercadoPagoPublicKey =
		process.env.MERCADO_PAGO_PUBLIC_KEY_TEST ?? "";

	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";

	envVariables.clientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.aromasaUrl = process.env.AROMASA_URL_DEVELOPMENT ?? "";

	envVariables.db_name = process.env.MONGODB_DB ?? "";
} else if (process.env.NODE_ENV === "production") {
	envVariables.mercadoPagoAccessToken =
		process.env.MERCADO_PAGO_ACCESS_TOKEN_PRODUCTION ?? "";

	envVariables.mercadoPagoPublicKey =
		process.env.MERCADO_PAGO_PUBLIC_KEY_PRODUCTION ?? "";

	envVariables.db_uri = process.env.MONGODB_URI_PRODUCTION ?? "";

	envVariables.clientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.aromasaUrl = process.env.AROMASA_URL_PRODUCTION ?? "";

	envVariables.db_name = process.env.MONGODB_DB ?? "";
}

export { envVariables };
