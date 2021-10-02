import { ServerStyleSheets } from "@mui/styles";
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
		const sheet = new ServerStyleSheets();

		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collect(<App {...props} />),
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
