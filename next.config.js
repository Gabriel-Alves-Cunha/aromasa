const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
	"@mui/material",
	"@mui/system",
]);

module.exports = withPlugins([withTM], {
	reactStrictMode: true,
	next: "latest",
	node: "--trace-warnings",
	images: {
		domains: ["", "lh3.googleusercontent.com"], //, "res.cloudinary.com"
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
});
