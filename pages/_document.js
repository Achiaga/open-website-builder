import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <meta
            name="google-site-verification"
            content="UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E"
          />
          <script
            async
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
