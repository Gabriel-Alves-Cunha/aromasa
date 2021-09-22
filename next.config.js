const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
	reactStrictMode: true,
	next: "latest",
	node: "--trace-warnings",
	images: {
		domains: [""], //, "res.cloudinary.com"
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
});
