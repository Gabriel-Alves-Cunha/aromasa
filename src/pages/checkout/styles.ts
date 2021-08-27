import { createStyles, makeStyles } from "@material-ui/core";

import theme from "styles/theme";

const { primary } = theme.fonts;

export default makeStyles(theme =>
	createStyles({
		root: {
			marginRight: "2%",
			marginLeft: "2%",
			marginTop: 90,
			flexGrow: 1,
		},
		a: {
			color: "lightgray",
			fontSize: 13,
			"&:hover": {
				textDecoration: "underline",
				transition: "all 0.1s ease",
				color: "#3e47ee",
			},
		},
		toolbar: theme.mixins.toolbar,
		title: {
			marginTop: "5%",
		},
		emptyButton: {
			minWidth: "150px",
			[theme.breakpoints.down("xs")]: {
				marginBottom: "5px",
			},
			[theme.breakpoints.up("xs")]: {
				marginRight: "20px",
			},
		},
		checkoutButton: {
			minWidth: "150px",
		},
		link: {
			textDecoration: "none",
		},
		totalDetails: {
			justifyContent: "space-between",
			marginTop: "5%",
			display: "flex",
			width: "100%",
		},
		formWrapper: {
			border: "1px solid lightgray",
			fontFamily: primary,
			color: "#6a9db0",
			marginTop: "5%",
			padding: "1em",
		},
		form: {
			marginTop: "1em",
			"& > *": {
				margin: theme.spacing(2),
				width: "40ch",
			},
		},
		submit: {
			justifyContent: "center",
			alignItems: "center",
			marginBottom: "3em",
			display: "flex",
			margin: "1em",
			width: "4em",
		},
	})
);
