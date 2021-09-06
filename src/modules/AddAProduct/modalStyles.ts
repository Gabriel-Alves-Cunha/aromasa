import styled from "styled-components";

import theme from "styles/theme";

const { primary: f_primary } = theme.fonts;

export const Container = styled.div`
	font-family: ${f_primary};
	align-items: center;

	padding: 20px;

	.MuiTextField-root {
		margin: 1em;
		width: 25ch;
	}
`;
