import Providers from "next-auth/providers";
import NextAuth from "next-auth";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// ...add more providers here
	],

	// A database is optional, but required to persist accounts in a database
	database: process.env.MONGODB_URI,
	// session: {
	// 	jwt: true,
	// 	maxAge: 30 * 24 * 60 * 60, // 30 days
	// 	updateAge: 30 * 24 * 60 * 60,
	// },
	// jwt: {
	// 	secret: process.env.JWT_SECRET,
	// 	encryption: true,
	// },
	debug: true,
	callbacks: {
		session: async (session, user) => {
			session.id = user.id;
			return Promise.resolve(session);
		},
	},
});
