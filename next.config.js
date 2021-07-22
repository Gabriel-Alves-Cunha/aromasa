const withPlugins = require("next-compose-plugins");

const nextConfig = {
	reactStrictMode: true,
	next: "latest",
};

module.exports = withPlugins([], nextConfig);
