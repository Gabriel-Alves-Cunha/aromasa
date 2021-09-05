const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
	reactStrictMode: true,
	next: "latest",
	node: "--trace-warnings",
	images: {
		domains: [""],
	},
	webpack5: true,
});
