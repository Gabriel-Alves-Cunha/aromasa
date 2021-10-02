import { CloudinaryContext } from "cloudinary-react";
import React, { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { AppLayoutProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "next-auth/client";

import { CartProvider } from "hooks/useCart";

import { GlobalStyle } from "styles/global";
import { muiTheme } from "styles/theme";

export const cloudName =
	process.env.NODE_ENV === "development" ? "demo" : "aromasa-decor";

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return getLayout(
		<ThemeProvider theme={muiTheme}>
			<GlobalStyle />

			<CloudinaryContext cloudName={cloudName} secure={true}>
				<Provider session={pageProps.session}>
					<CookiesProvider>
						<CartProvider>
							<Component {...pageProps} />
						</CartProvider>
					</CookiesProvider>
				</Provider>
			</CloudinaryContext>
		</ThemeProvider>
	);
}
