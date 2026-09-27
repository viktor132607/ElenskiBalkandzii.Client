import { Suspense } from "react";
import FeedArticle from "@/components/FeedArticle";

export const metadata = { title: "Post | Elenski Balkandzhii", description: "News and events from Elenski Balkandzhii." };

export default function EnglishNewsArticlePage() {
  return <Suspense fallback={<main className="min-h-[65vh] bg-[#faf8f5]" />}><FeedArticle /></Suspense>;
}
