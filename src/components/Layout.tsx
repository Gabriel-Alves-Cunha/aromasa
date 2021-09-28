import { ReactNode } from "react";

import { Footer } from "./Footer";

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div style={{ position: "relative", minHeight: "100vh" }}>
			<main>{children}</main>

			<Footer />
		</div>
	);
}

export const getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
