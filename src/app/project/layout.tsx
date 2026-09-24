import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукти | Еленски Балканджии",
  description: "Разгледайте продуктите на Еленски Балканджии — месо, мезета, сушени деликатеси и сирена с традиционен български вкус.",
  alternates: {
    canonical: "/project",
  },
};

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
