import { createTheme, Theme } from "@mui/material/styles";

import shadows, { customShadows } from "./shadows";

export const muiTheme = createTheme(
	{
		shadows,
	},
	customShadows
);

const theme = {
	colors: {
		dark: {
			background: "#151515",
			text: "#e1e1e6",
			text_light: "#e1e1e6",

			primary: "#017785",

			footer: "#02C4DB",

			navbar: "white",
		},
		light: {
			background: "white",
			text: "#151515",
			text_light: "hsl(100, 0%, 40%)",

			primary: "#017785",

			footer: "#6098be",

			navbar: "white",
		},
	},
	fonts: {
		primary: "Poppins",
		secondary: "Roboto",
		brand: "Nesans",
	},
};

declare module "@mui/styles" {
	interface DefaultTheme extends Theme {}
}

export default theme;
