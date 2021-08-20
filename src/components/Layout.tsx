import { ReactNode } from "react";
import styled from "styled-components";

import { FOOTER_HEIGHT } from "./Footer/styles";
import { Footer } from "./Footer";

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<>
			<PageContainer>
				<ContentWrap>
					<main>{children}</main>
				</ContentWrap>

				<Footer />
			</PageContainer>
		</>
	);
}

export const getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export const ContentWrap = styled.div`
	padding-bottom: ${FOOTER_HEIGHT}; /* Footer height */
`;

export const PageContainer = styled.div`
	position: relative;
	min-height: 100vh;
`;
