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
  const groups = [
    ...(raffles.length ? [{ type: "raffle" as const, title: language === "bg" ? "Томболи" : "Raffles" }] : []),
    { type: "news", title: language === "bg" ? "Новини" : "News" },
    { type: "event", title: language === "bg" ? "Събития" : "Events" },
  ] as const;

  return <main className="min-h-[65vh] bg-[#faf8f5] py-12 text-[#211915] md:py-20"><div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
    <header className="border-b border-[#d9d0c6] pb-8"><span className="text-xs font-black uppercase tracking-[.2em] text-[#08733a]">{language === "bg" ? "Еленски Балканджии · Русе" : "Elenski Balkandzhii · Ruse"}</span><h1 className="mt-4 text-4xl font-black uppercase md:text-5xl">{language === "bg" ? raffles.length ? "Томболи, новини и събития" : "Новини и събития" : raffles.length ? "Raffles, news and events" : "News and events"}</h1></header>
    {groups.map(group => {
      const items = group.type === "raffle" ? raffles : feed.filter(item => item.type === group.type);
      return items.length ? <section key={group.type} className="py-10" aria-label={group.title}>
        <h2 className="border-b border-[#d9d0c6] pb-5 text-3xl font-black uppercase md:text-4xl">{group.title}</h2>
        {items.map((item, index) => <FeedStory key={item.id} item={item} language={language} linked reverse={index % 2 === 1} />)}
      </section> : null;
    })}
    {!feed.some(item => item.type === "news" || item.type === "event") && !raffles.length && <p className="py-12 text-[#625851]">{language === "bg" ? "Все още няма публикувани новини или събития." : "No news or events have been published yet."}</p>}
  </div></main>;
}
