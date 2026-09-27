import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CookieConsentProvider } from "@/components/CookieConsent";
import { ContentProvider } from "@/components/ContentProvider";
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
      alternateName: "Elenski Balkandzhii",
      telephone: "+359878788897",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. „Шипка“ 12, ж.к. Родина 3",
        postalCode: "7012",
        addressLocality: "Русе",
        addressCountry: "BG",
      },
      location: {
        "@id": `${siteUrl}/contact#store`,
      },
      sameAs: [
        "https://wolt.com/bg/bgr/ruse/venue/elenski-balkanjii",
      ],
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
    icon: [{ url: "/00916727-7699-47a8-a026-e30347e3d4ac.png?v=3", type: "image/png", sizes: "1254x1254" }],
    shortcut: [{ url: "/00916727-7699-47a8-a026-e30347e3d4ac.png?v=3", type: "image/png" }],
    apple: [{ url: "/00916727-7699-47a8-a026-e30347e3d4ac.png?v=3", type: "image/png", sizes: "1254x1254" }],
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
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Еленски Балканджии — месо, мезета и сирена",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Еленски Балканджии | Месо и мезета",
    description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body className="m-0 min-h-screen overflow-x-hidden bg-white font-sans text-[#211915] antialiased">
        <Script id="route-language" strategy="beforeInteractive">{`document.documentElement.lang = location.pathname === "/en" || location.pathname.startsWith("/en/") ? "en" : "bg";`}</Script>
        <StructuredData data={structuredData} />
        <CookieConsentProvider>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <LanguageProvider>
          <ContentProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-320px)]">{children}</main>
          <Footer />
        </ContentProvider>
        </LanguageProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
