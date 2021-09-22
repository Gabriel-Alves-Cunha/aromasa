import { ReactNode } from "react";
import styled from "styled-components";

import { Footer } from "./Footer";

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<PageContainer>
			<main>{children}</main>

			<Footer />
		</PageContainer>
	);
}

export const getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

const PageContainer = styled.div`
	position: relative;
	min-height: 100vh;
`;
