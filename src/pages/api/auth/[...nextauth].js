import Providers from "next-auth/providers";
import NextAuth from "next-auth";

import { envVariables } from "utils/env";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	// secret: envVariables.NextAuthSecret,
	// A database is optional, but required to persist accounts in a database
	database: envVariables.db_uri,
	debug: process.env.NODE_ENV === "development",
	callbacks: {
		session: async (session, user) => {
			session.id = user.id;
			return Promise.resolve(session);
		},
	},
});
