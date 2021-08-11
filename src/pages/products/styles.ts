import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div`
	width: 100%;
`;

export default makeStyles(theme => ({
	addHeaderHeight: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	root: {
		flexGrow: 1,
	},
}));
