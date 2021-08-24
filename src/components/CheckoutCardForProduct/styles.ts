import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(2),
				width: "25ch",
			},
		},
		actionArea: {},
		media: {},
		cardContent: {},
		title: {},
		price: {},
		cardActions: {},
	})
);
