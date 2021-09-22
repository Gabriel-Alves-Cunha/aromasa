export const envVariables = {
	stripeWebhookEndpointSecret: "",
	stripePublishableKey: "",
	contactEmailPassword: "",
	db_normalUser_uri: "",
	stripeSecretKey: "",
	NextAuthSecret: "",
	cloudinaryURL: "",
	contactEmail: "",
	aromasaUrl: "",
	clientId: "",
	db_name: "",
	db_uri: "",
};

if (process.env.NODE_ENV === "development") {
	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";

	envVariables.db_normalUser_uri = process.env.MONGODB_URI_NORMAL_USER ?? "";

	envVariables.clientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.aromasaUrl = process.env.AROMASA_URL_DEVELOPMENT ?? "";

	envVariables.db_name = process.env.MONGODB_DB ?? "";

	envVariables.stripePublishableKey =
		process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY ?? "";

	envVariables.stripeSecretKey = process.env.STRIPE_TEST_SECRET_KEY ?? "";

	envVariables.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

	envVariables.contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD ?? "";

	envVariables.NextAuthSecret = process.env.NEXTAUTH_SECRET ?? "";

	envVariables.cloudinaryURL = process.env.CLOUDINARY_URL ?? "";

	envVariables.stripeWebhookEndpointSecret =
		process.env.STRIPE_WEBHOOK_ENDPOINT_TEST_SECRET ?? "";
} else if (process.env.NODE_ENV === "production") {
	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";

	envVariables.db_normalUser_uri = process.env.MONGODB_URI_NORMAL_USER ?? "";

	envVariables.clientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.aromasaUrl = process.env.AROMASA_URL_PRODUCTION ?? "";

	envVariables.db_name = process.env.MONGODB_DB ?? "";

	envVariables.stripePublishableKey =
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

	envVariables.stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";

	envVariables.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

	envVariables.NextAuthSecret = process.env.NEXTAUTH_SECRET ?? "";

	envVariables.contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD ?? "";

	envVariables.cloudinaryURL = process.env.CLOUDINARY_URL ?? "";

	envVariables.stripeWebhookEndpointSecret =
		process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET ?? "";
}
