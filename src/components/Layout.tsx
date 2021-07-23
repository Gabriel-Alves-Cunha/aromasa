import { ReactNode } from "react";

import { HeaderData } from "./Header/header.data";
import { Header } from "./Header";
import { Footer } from "./Footer";

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

export const getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Layout;
