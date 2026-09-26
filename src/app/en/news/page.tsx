import NewsPage from "@/components/NewsPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("News, events and raffles | Elenski Balkandzhii", "Latest news, upcoming events and raffles from Elenski Balkandzhii in Ruse.", "/news", "/en/news", "en");

export default function EnglishNews() {
  return <NewsPage />;
}
