import { Theme } from "@mui/material";

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "row",

			height: "200px",
			"& > *": {
				margin: theme.spacing(2),
				width: "80%",
				border: "1px solid red",
			},
		},
		media: {
			position: "relative",
			height: "auto",
			width: "100%",

			borderRadius: 5,
			objectFit: "cover",
			transition: "all 0.2s ease",
			cursor: "pointer",

			"&:hover": {
				boxShadow:
					"0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
			},
		},
		cardContent: {},
		title: {},
		price: {},
		cardActions: {
			justifyContent: "flex-end",
			alignItems: "flex-end",
		},
	})
);
