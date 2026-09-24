import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас | Еленски Балканджии",
  description: "Научете повече за Еленски Балканджии — продукти от Еленския Балкан, приготвени с българско месо и натурални подправки.",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
