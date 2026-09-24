import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/StructuredData";
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
  title: "Еленски Балканджии | Месо и мезета",
  description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body className="m-0 min-h-screen overflow-x-hidden bg-white font-sans text-[#211915] antialiased">
        <StructuredData data={structuredData} />
        <LanguageProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-320px)]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
