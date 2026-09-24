import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти | Еленски Балканджии",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
