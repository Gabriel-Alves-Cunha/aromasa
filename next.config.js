const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
	"@mui/material",
	"@mui/system",
]);
const withLinaria = require("next-linaria");

const dev = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";

module.exports = withPlugins([withTM], {
	reactStrictMode: true,
	webpack5: true,
	linaria: {
		cacheDirectory: ".next/cache/linaria",
		sourceMap: !dev,
	},
	next: "latest",
	node: "--trace-warnings",
	images: {
		domains: ["", "lh3.googleusercontent.com"], //, "res.cloudinary.com"
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
});

// module.exports = withLinaria(
// 	withPlugins([withTM], {
// 		reactStrictMode: true,
// 		webpack5: true,
// 		linaria: {
// 			cacheDirectory: ".next/cache/linaria",
// 			sourceMap: !dev,
// 		},
// 		next: "latest",
// 		node: "--trace-warnings",
// 		images: {
// 			domains: ["", "lh3.googleusercontent.com"], //, "res.cloudinary.com"
// 		},
// 		serverRuntimeConfig: {
// 			PROJECT_ROOT: __dirname,
// 		},
// 	})
// );
