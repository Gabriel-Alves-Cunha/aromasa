const envVariables = {
	mercadoPagoAccessToken: "",
	contactEmailPassword: "",
	mercadoPagoPublicKey: "",
	googleClientSecret: "",
	db_normalUser_uri: "",
	nextAuthSecret: "",
	frenetPassword: "",
	googleClientId: "",
	cloudinaryURL: "",
	contactEmail: "",
	frenetToken: "",
	aromasaUrl: "",
	sellerCEP: "",
	frenetKey: "",
	db_name: "",
	db_uri: "",
};

if (process.env.NODE_ENV === "development") {
	envVariables.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
	envVariables.googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.db_normalUser_uri = process.env.MONGODB_URI_NORMAL_USER ?? "";
	envVariables.aromasaUrl = process.env.AROMASA_URL_DEVELOPMENT ?? "";
	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";
	envVariables.db_name = process.env.MONGODB_DB ?? "";

	envVariables.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
	envVariables.contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD ?? "";

	envVariables.nextAuthSecret = process.env.NEXTAUTH_SECRET ?? "";

	envVariables.cloudinaryURL = process.env.CLOUDINARY_URL ?? "";

	envVariables.sellerCEP = process.env.NEXT_PUBLIC_SELLER_CEP ?? "";

	envVariables.frenetPassword = process.env.FRENET_PASSWORD ?? "";
	envVariables.frenetToken = process.env.FRENET_TOKEN ?? "";
	envVariables.frenetKey = process.env.FRENET_KEY ?? "";

	envVariables.mercadoPagoAccessToken =
		process.env.MERCADOPAGO_ACCESS_TOKEN_DEVELOPMENT ?? "";
	envVariables.mercadoPagoPublicKey =
		process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY_DEVELOPMENT ?? "";
} else if (process.env.NODE_ENV === "production") {
	envVariables.db_normalUser_uri = process.env.MONGODB_URI_NORMAL_USER ?? "";
	envVariables.aromasaUrl = process.env.AROMASA_URL_PRODUCTION ?? "";
	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";
	envVariables.db_name = process.env.MONGODB_DB ?? "";

	envVariables.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
	envVariables.googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD ?? "";
	envVariables.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

	envVariables.nextAuthSecret = process.env.NEXTAUTH_SECRET ?? "";

	envVariables.cloudinaryURL = process.env.CLOUDINARY_URL ?? "";

	envVariables.frenetPassword = process.env.FRENET_PASSWORD ?? "";
	envVariables.frenetToken = process.env.FRENET_TOKEN ?? "";
	envVariables.frenetKey = process.env.FRENET_KEY ?? "";

	envVariables.mercadoPagoAccessToken =
		process.env.MERCADOPAGO_ACCESS_TOKEN_PRODUCTION ?? "";
	envVariables.mercadoPagoPublicKey =
		process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY_PRODUCTION ?? "";
}

Object.freeze(envVariables);

export { envVariables };
