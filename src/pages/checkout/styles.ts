import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(2),
				width: "25ch",
			},
		},
		submit: {},
		a: {
			fontSize: 13,
			color: "lightgray",
			"&:hover": {
				color: "#3e47ee",
				transition: "all 0.1s ease",
				textDecoration: "underline",
			},
		},
		cep: { width: 400 },
	})
);
