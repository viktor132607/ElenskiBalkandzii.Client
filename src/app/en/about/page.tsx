import type { Metadata } from "next";
import AboutPage from "../../about/page";
import StructuredData from "@/components/StructuredData";

const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/en`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About us",
      item: `${siteUrl}/en/about`,
    },
  ],
};

export const metadata: Metadata = {
  title: "About us | Elenski Balkandzhii",
  description: "Learn more about Elenski Balkandzhii — products from the Elena Balkan region made with Bulgarian meat and natural spices.",
  alternates: {
    canonical: "/en/about",
    languages: {
      "bg-BG": "/about",
      en: "/en/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["bg_BG"],
    siteName: "Elenski Balkandzhii",
    title: "About us | Elenski Balkandzhii",
    description: "Learn more about Elenski Balkandzhii — products from the Elena Balkan region made with Bulgarian meat and natural spices.",
    url: "/en/about",
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
    title: "About us | Elenski Balkandzhii",
    description: "Learn more about Elenski Balkandzhii — products from the Elena Balkan region made with Bulgarian meat and natural spices.",
    images: ["/twitter-image"],
  },
};

export default function EnglishAboutPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <AboutPage />
    </>
  );
}
