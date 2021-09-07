const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
	reactStrictMode: true,
	next: "latest",
	node: "--trace-warnings",
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
});
