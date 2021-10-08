import { CloudinaryContext } from "cloudinary-react";
import React, { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { AppLayoutProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "next-auth/client";

import { CartProvider } from "hooks/useCart";

import { GlobalStyle } from "styles/global";
import { muiTheme } from "styles/theme";

export const cloudName = "aromasa-decor" as const;

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return getLayout(
		<ThemeProvider theme={muiTheme}>
			<GlobalStyle />

			<CloudinaryContext cloudName={cloudName} secure={true}>
				<CookiesProvider>
					<Provider session={pageProps.session}>
						<CartProvider>
							<Component {...pageProps} />
						</CartProvider>
					</Provider>
				</CookiesProvider>
			</CloudinaryContext>
		</ThemeProvider>
	);
}
