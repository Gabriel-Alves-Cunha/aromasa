import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

import { HEADER_HEIGHT } from "../../components/Header/styles";
import theme from "../../styles/theme";

export const Container = styled.div`
	margin-top: ${HEADER_HEIGHT}px;
`;

export const SecondVH = styled.div`
	width: 100vw;
	height: 100vh;
`;

export default makeStyles(theme => ({
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
	cardDetails: {
		justifyContent: "space-between",
		marginTop: "10%",
		display: "flex",
		width: "100%",
	},
}));
