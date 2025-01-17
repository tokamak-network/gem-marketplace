import TrackAnalytics from "@/components/trackAnalytics";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-28VTJXXRB2"
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-28VTJXXRB2');`}
      </Script>
    </>
  );
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <GoogleAnalyticsScript />
      <TrackAnalytics />
      <title>GemSTON MVP</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
