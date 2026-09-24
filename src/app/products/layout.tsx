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
