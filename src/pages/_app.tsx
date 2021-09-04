import React, { ReactNode } from "react";
import { AppLayoutProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Provider } from "next-auth/client";

import { CartProvider } from "hooks/useCart";

import GlobalStyle from "styles/global";
import theme from "styles/theme";

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return getLayout(
		<ThemeProvider theme={theme}>
			<GlobalStyle />

			<Provider session={pageProps.session}>
				<CartProvider>
					<Component {...pageProps} />
				</CartProvider>
			</Provider>
		</ThemeProvider>
	);
}
