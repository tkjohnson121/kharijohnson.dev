import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Khari Johnson" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Khari Johnson" />
          <meta
            name="description"
            content="Khari Johnson | Software Developer"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="kharijohnson.dev" />
          <meta name="twitter:title" content="Khari Johnson" />
          <meta
            name="twitter:description"
            content="Khari Johnson | Software Developer"
          />
          <meta
            name="twitter:image"
            content="kharijohnson.dev/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@tkjohnson121" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Khari Johnson" />
          <meta
            property="og:description"
            content="Khari Johnson | Software Developer"
          />
          <meta property="og:site_name" content="Khari Johnson" />
          <meta property="og:url" content="kharijohnson.dev" />
          <meta
            property="og:image"
            content="kharijohnson.dev/icons/apple-touch-icon.png"
          />
        </Head>
        <body className="bg-white text-purple-900 dark:bg-purple-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
