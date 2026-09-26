import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, bg: string, en: string, language: "bg" | "en"): Metadata {
  const route = language === "bg" ? bg : en;
  return {
    title,
    description,
    alternates: { canonical: route, languages: { "bg-BG": bg, en, "x-default": bg } },
    openGraph: {
      type: "website",
      locale: language === "bg" ? "bg_BG" : "en_GB",
      siteName: "Еленски Балканджии",
      title,
      description,
      url: route,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Еленски Балканджии — Русе" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  };
}
