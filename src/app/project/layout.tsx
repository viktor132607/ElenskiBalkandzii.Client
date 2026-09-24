import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукти | Еленски Балканджии",
  alternates: {
    canonical: "/products",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
