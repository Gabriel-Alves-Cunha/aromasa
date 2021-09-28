import { ThemeProvider as SCThemeProvider } from "styled-components";
import { CloudinaryContext } from "cloudinary-react";
import React, { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { AppLayoutProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "next-auth/client";

import { CartProvider } from "hooks/useCart";

import theme, { muiTheme } from "styles/theme";
import GlobalStyle from "styles/global";

export const cloudName =
	process.env.NODE_ENV === "development" ? "demo" : "aromasa-decor";

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return getLayout(
		// <StyledEngineProvider injectFirst>
		<ThemeProvider theme={muiTheme}>
			<SCThemeProvider theme={theme}>
				<GlobalStyle />

				<Provider session={pageProps.session}>
					<CookiesProvider>
						<CartProvider>
							<CloudinaryContext cloudName={cloudName} secure={true}>
								<Component {...pageProps} />
							</CloudinaryContext>
						</CartProvider>
					</CookiesProvider>
				</Provider>
			</SCThemeProvider>
		</ThemeProvider>
		// </StyledEngineProvider>
	);
}
