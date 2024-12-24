"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TrackAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-RSTR92STYJ`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", "G-RSTR92STYJ");

    const handleRouteChange = (url: string) => {
      gtag("config", "G-RSTR92STYJ", {
        page_path: url,
      });
    };

    window.addEventListener("popstate", () =>
      handleRouteChange(window.location.pathname)
    );

    return () => {
      script.remove();
      window.removeEventListener("popstate", () =>
        handleRouteChange(window.location.pathname)
      );
    };
  }, [pathname]);

  return null;
};

export default TrackAnalytics;
