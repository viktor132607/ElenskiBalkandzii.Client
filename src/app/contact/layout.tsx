import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
          name: "Контакти",
          item: `${siteUrl}/contact`,
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/contact#store`,
      name: "Еленски Балканджии",
      alternateName: "Elenski Balkandzhii",
      url: `${siteUrl}/contact`,
      image: `${siteUrl}/elenski-balkandzhii-store-ruse.jpg`,
      telephone: "+359878788897",
      sameAs: [
        "https://wolt.com/bg/bgr/ruse/venue/elenski-balkanjii",
      ],
      areaServed: {
        "@type": "City",
        name: "Русе",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. „Шипка“ 12, ж.к. Родина 3",
        postalCode: "7012",
        addressLocality: "Русе",
        addressCountry: "BG",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Контакти | Еленски Балканджии",
  description: "Контакти и работно време на магазин Еленски Балканджии в Русе — адрес, телефон и информация за посещение.",
  alternates: {
    canonical: "/contact",
    languages: {
      "bg-BG": "/contact",
      en: "/en/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: "Еленски Балканджии",
    title: "Контакти | Еленски Балканджии",
    description: "Контакти и работно време на магазин Еленски Балканджии в Русе — адрес, телефон и информация за посещение.",
    url: "/contact",
    images: [
      {
        url: "/elenski-balkandzhii-store-ruse.jpg",
        alt: "Магазин Еленски Балканджии в Русе",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакти | Еленски Балканджии",
    description: "Контакти и работно време на магазин Еленски Балканджии в Русе — адрес, телефон и информация за посещение.",
    images: ["/elenski-balkandzhii-store-ruse.jpg"],
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StructuredData data={structuredData} />
      {children}
    </>
  );
}
