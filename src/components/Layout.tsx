import { ReactNode } from "react";

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

			<main>{children}</main>

			<Footer />
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
