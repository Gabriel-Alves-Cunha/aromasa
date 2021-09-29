module.exports = {
	presets: ["next/babel", "@linaria"],
	plugins: [
		["babel-plugin-styled-components", { ssr: true, displayName: true }],
		"inline-react-svg",
	],
};
