const withPlugins = require("next-compose-plugins");

const nextConfig = {
	reactStrictMode: true,
	next: "latest",
	node: "--trace-warnings",
	images: {
		domains: ["fakestoreapi.com"],
	},
};

module.exports = withPlugins([], nextConfig);
