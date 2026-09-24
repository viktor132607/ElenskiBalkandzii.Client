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
      name: "Продукти",
      item: `${siteUrl}/products`,
    },
  ],
};

export const metadata: Metadata = {
  title: "Продукти | Еленски Балканджии",
  description: "Разгледайте продуктите на Еленски Балканджии — месо, мезета, сушени деликатеси и сирена с традиционен български вкус.",
  alternates: {
    canonical: "/products",
    languages: {
      "bg-BG": "/products",
      en: "/en/products",
      "x-default": "/products",
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: "Еленски Балканджии",
    title: "Продукти | Еленски Балканджии",
    description: "Разгледайте продуктите на Еленски Балканджии — месо, мезета, сушени деликатеси и сирена с традиционен български вкус.",
    url: "/products",
    images: [
      {
        url: "/elenski-balkandzhii-traditional-products.jpg",
        alt: "Месо, мезета и сирена от Еленски Балканджии",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Продукти | Еленски Балканджии",
    description: "Разгледайте продуктите на Еленски Балканджии — месо, мезета, сушени деликатеси и сирена с традиционен български вкус.",
    images: ["/elenski-balkandzhii-traditional-products.jpg"],
  },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StructuredData data={structuredData} />
      {children}
    </>
  );
}
