import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

const dev = process.env.NODE_ENV !== "production";

module.exports = {
	mode: dev ? "development" : "production",
	i18n: {
		locales: ["en", "pt"],
		defaultLocale: "pt",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
		filename: "[name].bundle.js",
	},
	// rules: [
	// 	{
	// 		test: /\.(js|ts|tsx)$/,
	// 		exclude: /node_modules/,
	// 		use: [
	// 			{ loader: "babel-loader" },
	// 			{
	// 				loader: "@linaria/webpack-loader",
	// 				options: {
	// 					sourceMap: process.env.NODE_ENV !== "production",
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		test: /\.css$/,
	// 		use: [
	// 			{
	// 				loader: MiniCssExtractPlugin.loader,
	// 			},
	// 			{
	// 				loader: "css-loader",
	// 				options: {
	// 					sourceMap: process.env.NODE_ENV !== "production",
	// 				},
	// 			},
	// 		],
	// 	},
	// ],
	plugins: [
		new CaseSensitivePathsPlugin({ debug: true }),
		// new MiniCssExtractPlugin({
		// 	filename: "styles.css",
		// }),
	],
};
