import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Еленски Балканджии | Месо и мезета",
  description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body>
        <Navbar />
        <main className="page-shell">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
