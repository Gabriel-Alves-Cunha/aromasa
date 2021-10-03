import { ReactNode } from "react";

import { Footer } from "components";

export const LayoutWithFooter = (page: ReactNode) => (
	<>
		<main style={{ position: "relative", minHeight: "100vh" }}>{page}</main>
		<Footer />
	</>
);
