import type { Metadata } from "next";
import ContactPage from "../../contact/page";
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
          name: "Home",
          item: `${siteUrl}/en`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contacts",
          item: `${siteUrl}/en/contact`,
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
        name: "Ruse",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "12 Shipka St., Rodina 3",
        postalCode: "7012",
        addressLocality: "Ruse",
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
  title: "Contacts | Elenski Balkandzhii",
  description: "Contact details and opening hours for the Elenski Balkandzhii store in Ruse, Bulgaria.",
  alternates: {
    canonical: "/en/contact",
    languages: {
      "bg-BG": "/contact",
      en: "/en/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["bg_BG"],
    siteName: "Elenski Balkandzhii",
    title: "Contacts | Elenski Balkandzhii",
    description: "Contact details and opening hours for the Elenski Balkandzhii store in Ruse, Bulgaria.",
    url: "/en/contact",
    images: [
      {
        url: "/elenski-balkandzhii-store-ruse.jpg",
        alt: "Elenski Balkandzhii store in Ruse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacts | Elenski Balkandzhii",
    description: "Contact details and opening hours for the Elenski Balkandzhii store in Ruse, Bulgaria.",
    images: ["/elenski-balkandzhii-store-ruse.jpg"],
  },
};

export default function EnglishContactPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <ContactPage />
    </>
  );
}
