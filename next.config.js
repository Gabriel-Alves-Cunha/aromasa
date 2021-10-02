const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
	"@mui/material",
	"@mui/system",
]);

module.exports = withPlugins([withTM], {
	images: {
		domains: ["", "lh3.googleusercontent.com"], //, "res.cloudinary.com"
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	node: "--trace-warnings",
	reactStrictMode: true,
	webpack5: true,
	next: "latest",
});
