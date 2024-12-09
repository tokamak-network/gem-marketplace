import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RSTR92STYJ"
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RSTR92STYJ');`}
      </Script>
    </>
  );
};

export default function Document() {
  return (
    <Html lang="en">
      <GoogleAnalyticsScript />
      <Head />
      <title>GemSTON MVP</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
