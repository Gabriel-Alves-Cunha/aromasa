import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div`
	width: 100%;
`;

export default makeStyles(theme => ({
	addHeaderHeight: { marginTop: "90px" },
	content: {
		flexGrow: 1,
		backgroundColor: "white",
		padding: theme.spacing(3),
	},
	root: {
		flexGrow: 1,
	},
}));
