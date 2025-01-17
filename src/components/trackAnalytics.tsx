"use client";

import { useEffect } from "react";
import Script from "next/script";
import * as gtag from "@/utils/ga";
import { useRouter } from "next/router";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const TrackAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-28VTJXXRB2`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-28VTJXXRB2', {
              page_path: window.location.pathname,
              });
           `,
        }}
      />
    </>
  );
};

export default TrackAnalytics;
