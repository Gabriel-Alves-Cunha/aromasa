const envVariables = {
	stripeWebhookEndpointSecret: "",
	mercadoPagoAccessToken: "",
	mercadoPagoPublicKey: "",
	stripePublishableKey: "",
	stripeSecretKey: "",
	contactEmail: "",
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

	envVariables.stripePublishableKey =
		process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY ?? "";

	envVariables.stripeSecretKey = process.env.STRIPE_TEST_SECRET_KEY ?? "";

	envVariables.contactEmail = process.env.CONTACT_EMAIL ?? "";

	envVariables.stripeWebhookEndpointSecret =
		process.env.STRIPE_WEBHOOK_ENDPOINT_TEST_SECRET ?? "";
} else if (process.env.NODE_ENV === "production") {
	envVariables.mercadoPagoAccessToken =
		process.env.MERCADO_PAGO_ACCESS_TOKEN_PRODUCTION ?? "";

	envVariables.mercadoPagoPublicKey =
		process.env.MERCADO_PAGO_PUBLIC_KEY_PRODUCTION ?? "";

	envVariables.db_uri = process.env.MONGODB_URI_PRODUCTION ?? "";

	envVariables.clientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.aromasaUrl = process.env.AROMASA_URL_PRODUCTION ?? "";

	envVariables.db_name = process.env.MONGODB_DB ?? "";

	envVariables.stripePublishableKey =
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

	envVariables.stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";

	envVariables.contactEmail = process.env.CONTACT_EMAIL ?? "";

	envVariables.stripeWebhookEndpointSecret =
		process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET ?? "";
}

export { envVariables };
