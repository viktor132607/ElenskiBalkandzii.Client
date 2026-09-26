import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Начало",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "За нас",
      item: `${siteUrl}/about`,
    },
  ],
};

export const metadata: Metadata = {
  title: "За нас | Еленски Балканджии",
  description: "Научете повече за Еленски Балканджии — продукти от Еленския Балкан, приготвени с българско месо и натурални подправки.",
  alternates: {
    canonical: "/about",
    languages: {
      "bg-BG": "/about",
      en: "/en/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: "Еленски Балканджии",
    title: "За нас | Еленски Балканджии",
    description: "Научете повече за Еленски Балканджии — продукти от Еленския Балкан, приготвени с българско месо и натурални подправки.",
    url: "/about",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Еленски Балканджии — месо, мезета и сирена",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "За нас | Еленски Балканджии",
    description: "Научете повече за Еленски Балканджии — продукти от Еленския Балкан, приготвени с българско месо и натурални подправки.",
    images: ["/twitter-image"],
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StructuredData data={structuredData} />
      {children}
    </>
  );
}
