import styled from "styled-components";

import theme from "styles/theme";

export const Container = styled.div`
	width: 100%;
`;

export const Content = styled.div`
	position: relative;

	top: 6rem;
	margin: 3rem;
	margin-bottom: 3rem;

	border: 1px solid #dee2e6;
	padding: 32px;

	line-height: 1.5rem;

	font-family: ${theme.fonts.primary};
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	letter-spacing: 0.05em;

	h2 {
		font-weight: 600;
		font-size: 20px;
		color: #576d96;
		padding-bottom: 20px;
		padding-top: 20px;
	}

	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;

		font-size: 1rem;
		font-weight: 300;

		color: #576d96;

		margin-top: 0;
		margin-bottom: 1rem;
	}

	a {
		color: #055af9;
	}

	h3 {
		font-weight: 600;
		font-size: 16px;
		margin-bottom: 20px;
		color: #576d96;
		padding-bottom: 20px;
		padding-top: 20px;
	}

	ul {
		display: block;
		list-style-type: disc;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 40px;
		color: #576d96;
	}

	dl,
	ol,
	ul {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	li {
		display: list-item;
		text-align: -webkit-match-parent;
	}
`;
