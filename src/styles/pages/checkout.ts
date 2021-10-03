import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import styled from "@emotion/styled";

import { HEADER_HEIGHT } from "components/Header/styles";
import theme from "styles/theme";

const { primary: f_primary } = theme.fonts;
const { primary } = theme.colors.dark;

export default makeStyles(theme =>
	createStyles({
		root: {
			marginRight: "2%",
			marginBottom: 90,
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
			[theme.breakpoints.down("sm")]: {
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

export const NoItems = styled.section`
	// Center stuff
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: calc(100vh - ${HEADER_HEIGHT}px);

	font-family: ${theme.fonts.secondary};
	text-align: center;

	margin-top: ${HEADER_HEIGHT}px;

	border: 1px solid red;
	background: linear-gradient(red, red) no-repeat center/1px 100%;

	p {
		font-family: Poppins;
		font-size: 1.3rem;
		line-height: 2rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		padding-top: 1.5rem;
	}
`;

export const Span = styled.span`
	width: 100px;
	height: 100px;
	border-style: dashed;
	border-radius: 5%;
	border-width: 1px;
	border-color: ${primary};
	stroke-width: 10px;

	// Center stuff
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
