import { ReactNode } from "react";
import styled from "styled-components";

import { FOOTER_HEIGHT } from "./Footer/styles";
import { HeaderData } from "./Header/header.data";
import { Footer } from "./Footer";
import Header from "./Header";

type Props = {
	currentPage?: HeaderData["label"];
	children: ReactNode;
};

function Layout({ children, currentPage }: Props) {
	return (
		<>
			<Header currentPage={currentPage} />

			<PageContainer>
				<ContentWrap>
					<main>{children}</main>
				</ContentWrap>

				<Footer />
			</PageContainer>
		</>
	);
}

function FooterlessLayout({ children, currentPage }: Props) {
	return (
		<>
			<Header currentPage={currentPage} />

			<main>{children}</main>
		</>
	);
}

export const getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export const getFooterlessLayout = (page: ReactNode) => (
	<FooterlessLayout>{page}</FooterlessLayout>
);

export default Layout;

export const ContentWrap = styled.div`
	padding-bottom: ${FOOTER_HEIGHT}; /* Footer height */
`;

export const PageContainer = styled.div`
	position: relative;
	min-height: 100vh;
`;
