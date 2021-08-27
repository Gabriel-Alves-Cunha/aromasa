import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import { CartProvider } from "hooks/useCart";

import GlobalStyle from "styles/global";
import theme from "styles/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
	const getLayout =
		(Component.getLayout as (page: ReactNode) => ReactNode) ||
		((page: ReactNode) => page);

	return getLayout(
		<Provider session={pageProps.session}>
			<ThemeProvider theme={theme}>
				<CartProvider>
					<Component {...pageProps} />
				</CartProvider>
				<GlobalStyle />
			</ThemeProvider>
		</Provider>
	);
}
