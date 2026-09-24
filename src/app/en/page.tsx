import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Elenski Balkandzhii | Meat and Delicacies",
  description: "Elenski Balkandzhii — meat, delicacies, cheese and traditional Bulgarian flavours.",
  alternates: {
    canonical: "/en",
    languages: {
      "bg-BG": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["bg_BG"],
    siteName: "Elenski Balkandzhii",
    title: "Elenski Balkandzhii | Meat and Delicacies",
    description: "Elenski Balkandzhii — meat, delicacies, cheese and traditional Bulgarian flavours.",
    url: "/en",
    images: [
      {
        url: "/elenski-balkandzhii-traditional-products.jpg",
        alt: "Traditional products from Elenski Balkandzhii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elenski Balkandzhii | Meat and Delicacies",
    description: "Elenski Balkandzhii — meat, delicacies, cheese and traditional Bulgarian flavours.",
    images: ["/elenski-balkandzhii-traditional-products.jpg"],
  },
};

export default function EnglishHomePage() {
  return <Home />;
}
