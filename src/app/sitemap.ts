import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const pages = [
  { bg: "/", en: "/en", changeFrequency: "weekly" as const, priority: 1 },
  { bg: "/products", en: "/en/products", changeFrequency: "weekly" as const, priority: 0.9 },
  { bg: "/about", en: "/en/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { bg: "/contact", en: "/en/contact", changeFrequency: "monthly" as const, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ bg, en, changeFrequency, priority }) => {
    const bgUrl = `${siteUrl}${bg === "/" ? "" : bg}`;
    const enUrl = `${siteUrl}${en}`;
    const languages = {
      "bg-BG": bgUrl,
      en: enUrl,
      "x-default": bgUrl,
    };

    return [
      {
        url: bgUrl,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: enUrl,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });
}
