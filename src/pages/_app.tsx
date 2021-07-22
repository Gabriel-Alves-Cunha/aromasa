import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import GlobalStyle from "../styles/global";
import theme from "../styles/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider session={pageProps.session}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
				<GlobalStyle />
			</ThemeProvider>
		</Provider>
	);
}
