import { makeStyles } from "@material-ui/core/styles";

import theme from "../../styles/theme";

const { primary } = theme.colors.light;

export default makeStyles(() => ({
	root: {
		border: "0.1px solid lightgray",
		justifyContent: "space-between",
		transition: "all 0.3s ease",
		flexDirection: "column",
		boxShadow: "none",
		maxWidth: "100%",
		display: "flex",
		height: "100%",
	},
	media: {
		paddingTop: "56.25%", // 16:9
		height: 0,
	},
	actionArea: {
		justifyContent: "flex-start",
	},
	cardActions: {
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		height: "30px",
	},
	title: {
		width: "70%",
	},
	price: { color: primary },
	cardContent: {
		justifyContent: "space-between",
		display: "flex",
	},
}));
