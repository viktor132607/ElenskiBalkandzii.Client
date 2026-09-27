import { Suspense } from "react";
import FeedArticle from "@/components/FeedArticle";

export const metadata = { title: "Публикация | Еленски Балканджии", description: "Новини и събития от Еленски Балканджии." };

export default function NewsArticlePage() {
  return <Suspense fallback={<main className="min-h-[65vh] bg-[#faf8f5]" />}><FeedArticle /></Suspense>;
}
