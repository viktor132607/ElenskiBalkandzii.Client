import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти | Еленски Балканджии",
  description: "Контакти и работно време на магазин Еленски Балканджии в Русе — адрес, телефон и информация за посещение.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
