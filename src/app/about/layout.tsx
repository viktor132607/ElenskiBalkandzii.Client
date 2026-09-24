import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас | Еленски Балканджии",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
