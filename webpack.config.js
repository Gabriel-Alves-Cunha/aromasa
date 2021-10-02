import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

module.exports = {
	i18n: {
		locales: ["en", "pt"],
		defaultLocale: "pt",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
		filename: "[name].bundle.js",
	},
	plugins: [new CaseSensitivePathsPlugin({ debug: true })],
};
