import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

module.exports = {
	i18n: {
		locales: ["en", "pt"],
		defaultLocale: "pt",
	},
	webpack: (config, options) => {
		config.node = {
			// Some libraries import Node modules but don't use them in the browser.
			// Tell Webpack to provide empty mocks for them so importing them works.
			...config.node,
			fs: "empty",
			child_process: "empty",
			net: "empty",
			tls: "empty",
			global: true,
			__filename: false,
			__dirname: false,
		};

		return config;
	},
	plugins: [new CaseSensitivePathsPlugin({ debug: true })],
};
