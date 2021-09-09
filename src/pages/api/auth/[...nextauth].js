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
	secret: envVariables.NextAuthSecret,
	// A database is optional, but required to persist accounts in a database
	database: process.env.MONGODB_URI,
	debug: true,
	callbacks: {
		session: async (session, user) => {
			session.id = user.id;
			return Promise.resolve(session);
		},
	},
});
