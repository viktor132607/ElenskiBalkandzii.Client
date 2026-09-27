"use client";

import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import FeedStory from "@/components/FeedStory";

export default function NewsPage() {
  const { language } = useLanguage();
  const site = useSiteContent();
  const feed = [...site.feed].filter(item => item.visible).sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date().toISOString().slice(0, 10);
  const raffles = site.rafflesEnabled ? feed.filter(item => item.type === "raffle" && (!item.endDate || item.endDate >= today)) : [];
  const stories = feed.filter(item => item.type === "news" || item.type === "event");

  return <main className="min-h-[65vh] bg-[#faf8f5] py-12 text-[#211915] md:py-20"><div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
    <header className="border-b border-[#d9d0c6] pb-8"><span className="text-xs font-black uppercase tracking-[.2em] text-[#08733a]">{language === "bg" ? "Еленски Балканджии · Русе" : "Elenski Balkandzhii · Ruse"}</span><h1 className="mt-4 text-4xl font-black uppercase md:text-5xl">{language === "bg" ? raffles.length ? "Томболи, новини и събития" : "Новини и събития" : raffles.length ? "Raffles, news and events" : "News and events"}</h1></header>
    {raffles.length > 0 && <section className="py-10" aria-label={language === "bg" ? "Томболи" : "Raffles"}>
      <h2 className="border-b border-[#d9d0c6] pb-5 text-3xl font-black uppercase md:text-4xl">{language === "bg" ? "Томболи" : "Raffles"}</h2>
      {raffles.map((item, index) => <FeedStory key={item.id} item={item} language={language} linked reverse={index % 2 === 1} />)}
    </section>}
    {stories.length > 0 ? <section aria-label={language === "bg" ? "Новини и събития" : "News and events"}>
      {stories.map((item, index) => <FeedStory key={item.id} item={item} language={language} linked reverse={index % 2 === 1} />)}
    </section> : !raffles.length && <p className="py-12 text-[#625851]">{language === "bg" ? "Все още няма публикувани новини или събития." : "No news or events have been published yet."}</p>}
  </div></main>;
}
