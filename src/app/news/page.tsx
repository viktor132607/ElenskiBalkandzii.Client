import NewsPage from "@/components/NewsPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("Новини, събития и томболи | Еленски Балканджии", "Последни новини, предстоящи събития и томболи от Еленски Балканджии в Русе.", "/news", "/en/news", "bg");

export default function News() {
  return <NewsPage />;
}
