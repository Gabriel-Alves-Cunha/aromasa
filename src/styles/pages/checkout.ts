import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import styled from "styled-components";

import theme from "styles/theme";

const { primary: f_primary } = theme.fonts;
const { primary } = theme.colors.dark;

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
			[theme.breakpoints.down('sm')]: {
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
			fontFamily: f_primary,
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
	})
);

export const ConfirmButton = styled.input`
	font-family: ${f_primary};
	font-size: 1.1em;

	width: 60%;
	height: 30px;

	display: block !important;
	margin: auto !important;
	margin-top: 90px !important;

	background: ${primary};
	color: white;

	border: none;
	padding: 10px;

	cursor: pointer;

	transition: box-shadow 0.2s ease-in 0s, opacity 0.1s ease 0s;

	&:disabled {
		cursor: default;
		opacity: 0.4;
	}

	&:hover:enabled {
		box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
			0 17px 20px 0 rgba(0, 0, 0, 0.19);
	}

	&:active {
		opacity: 0.3;
	}
`;
