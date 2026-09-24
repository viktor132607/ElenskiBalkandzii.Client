import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Еленски Балканджии",
      url: siteUrl,
      logo: `${siteUrl}/elenski-balkandzhii-logo.jpg`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Еленски Балканджии",
      inLanguage: ["bg", "en"],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Еленски Балканджии",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Еленски Балканджии",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/elenski-balkandzhii-logo.jpg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  title: "Еленски Балканджии | Месо и мезета",
  description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
  alternates: {
    canonical: "/",
    languages: {
      "bg-BG": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: "Еленски Балканджии",
    title: "Еленски Балканджии | Месо и мезета",
    description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
    url: "/",
    images: [
      {
        url: "/elenski-balkandzhii-traditional-products.jpg",
        alt: "Традиционни продукти на Еленски Балканджии",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body className="m-0 min-h-screen overflow-x-hidden bg-white font-sans text-[#211915] antialiased">
        <Script id="route-language" strategy="beforeInteractive">{`document.documentElement.lang = location.pathname === "/en" || location.pathname.startsWith("/en/") ? "en" : "bg";`}</Script>
        <StructuredData data={structuredData} />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <LanguageProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-320px)]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
