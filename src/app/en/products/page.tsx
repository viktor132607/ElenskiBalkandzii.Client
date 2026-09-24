import type { Metadata } from "next";
import ProductsPage from "../../products/page";
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
      name: "Products",
      item: `${siteUrl}/en/products`,
    },
  ],
};

export const metadata: Metadata = {
  title: "Products | Elenski Balkandzhii",
  description: "Explore Elenski Balkandzhii products — meat, dried delicacies and cheese with traditional Bulgarian flavour.",
  alternates: {
    canonical: "/en/products",
    languages: {
      "bg-BG": "/products",
      en: "/en/products",
      "x-default": "/products",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["bg_BG"],
    siteName: "Elenski Balkandzhii",
    title: "Products | Elenski Balkandzhii",
    description: "Explore Elenski Balkandzhii products — meat, dried delicacies and cheese with traditional Bulgarian flavour.",
    url: "/en/products",
    images: [
      {
        url: "/elenski-balkandzhii-traditional-products.jpg",
        alt: "Meat, delicacies and cheese from Elenski Balkandzhii",
      },
    ],
  },
};

export default function EnglishProductsPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <ProductsPage />
    </>
  );
}
