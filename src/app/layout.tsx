import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Еленски Балканджии | Месо и мезета",
  description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/588283015_25323651390578829_4300945585916792863_n.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body className="m-0 min-h-screen overflow-x-hidden bg-white font-sans text-[#211915] antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-320px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
