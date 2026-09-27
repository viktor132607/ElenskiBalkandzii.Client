"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCookieConsent } from "@/components/CookieConsent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const { choice, ready } = useCookieConsent();

  useEffect(() => {
    if (!ready || choice !== "accepted" || !measurementId) return;
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => { window.dataLayer.push(args); };
      window.gtag("js", new Date());
      window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      window.gtag("config", measurementId, { send_page_view: false });
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.async = true;
      document.head.append(script);
    }
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [choice, measurementId, pathname, ready]);
  return null;
}

export function trackAnalyticsEvent(name: string, parameters: Record<string, unknown>) {
  if (document.cookie.split("; ").includes("elenski_cookie_choice=accepted")) {
    window.gtag?.("event", name, parameters);
  }
}
