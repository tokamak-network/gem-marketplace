// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  // @ts-ignore
  if (typeof window.gtag !== 'undefined') {
    // @ts-ignore
    window.gtag('config', "G-28VTJXXRB2" as string, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent): void => {
  // @ts-ignore
  if (typeof window.gtag !== 'undefined') {
    // @ts-ignore
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
