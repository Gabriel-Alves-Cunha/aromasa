import { ServerStyleSheet } from "styled-components";
import Document, {
	DocumentInitialProps,
	DocumentContext,
	NextScript,
	Html,
	Head,
	Main,
} from "next/document";

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="pt">
				<Head>
					<meta charSet="utf-8" />

					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&family=Roboto:wght@200;300;400;500&display=swap"
						rel="stylesheet"
					/>

					<link href="/static/fonts/styles.css" rel="stylesheet" />

					<link rel="icon" href="favicon.png" type="image/x-icon" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
