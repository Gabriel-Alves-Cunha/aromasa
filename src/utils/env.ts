const envVariables = {
	contactEmailPassword: "",
	googleClientSecret: "",
	db_normalUser_uri: "",
	sumupClientSecret: "",
	sumupRedirectUri: "",
	nextAuthSecret: "",
	googleClientId: "",
	sumupClientId: "",
	cloudinaryURL: "",
	contactEmail: "",
	aromasaUrl: "",
	db_name: "",
	sumupId: "",
	db_uri: "",
};

if (process.env.NODE_ENV === "development") {
	envVariables.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
	envVariables.googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.db_normalUser_uri = process.env.MONGODB_URI_NORMAL_USER ?? "";
	envVariables.aromasaUrl = process.env.AROMASA_URL_DEVELOPMENT ?? "";
	envVariables.db_name = process.env.MONGODB_DB ?? "";
	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";

	envVariables.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
	envVariables.contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD ?? "";

	envVariables.nextAuthSecret = process.env.NEXTAUTH_SECRET ?? "";

	envVariables.cloudinaryURL = process.env.CLOUDINARY_URL ?? "";

	envVariables.sumupClientSecret =
		process.env.SUMUP_CLIENT_SECRET_DEVELOPMENT ?? "";
	envVariables.sumupRedirectUri =
		process.env.SUMUP_REDIRECT_URI_DEVELOPMENT ?? "";
	envVariables.sumupClientId = process.env.SUMUP_CLIENT_ID_DEVELOPMENT ?? "";
	envVariables.sumupId = process.env.SUMUP_ID_DEVELOPMENT ?? "";
} else if (process.env.NODE_ENV === "production") {
	envVariables.db_normalUser_uri = process.env.MONGODB_URI_NORMAL_USER ?? "";
	envVariables.aromasaUrl = process.env.AROMASA_URL_PRODUCTION ?? "";
	envVariables.db_name = process.env.MONGODB_DB ?? "";
	envVariables.db_uri = process.env.MONGODB_URI_DEVELOPMENT ?? "";

	envVariables.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
	envVariables.googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";

	envVariables.contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD ?? "";
	envVariables.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

	envVariables.nextAuthSecret = process.env.NEXTAUTH_SECRET ?? "";

	envVariables.cloudinaryURL = process.env.CLOUDINARY_URL ?? "";

	envVariables.sumupClientSecret =
		process.env.SUMUP_CLIENT_SECRET_PRODUCTION ?? "";
	envVariables.sumupRedirectUri =
		process.env.SUMUP_REDIRECT_URI_PRODUCTION ?? "";
	envVariables.sumupClientId = process.env.SUMUP_CLIENT_ID_PRODUCTION ?? "";
	envVariables.sumupId = process.env.SUMUP_ID_PRODUCTION ?? "";
}

Object.freeze(envVariables);

export { envVariables };
