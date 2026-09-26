"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { formatFeedDate } from "@/components/InformationHome";
import { imageUrl } from "@/lib/api";

export default function NewsPage() {
  const { language } = useLanguage();
  const feed = [...useSiteContent().feed].filter(item => item.visible).sort((a, b) => b.date.localeCompare(a.date));
  const labels = language === "bg" ? { news: "Новина", event: "Събитие", raffle: "Томбола" } : { news: "News", event: "Event", raffle: "Raffle" };

  return <main className="min-h-[65vh] bg-[#faf8f5] px-5 py-12 text-[#211915] md:py-20"><div className="mx-auto max-w-[1180px]">
    <header className="border-b border-[#d9d0c6] pb-8"><span className="text-xs font-black uppercase tracking-[.2em] text-[#08733a]">{language === "bg" ? "Еленски Балканджии · Русе" : "Elenski Balkandzhii · Ruse"}</span><h1 className="mt-4 text-4xl font-black uppercase md:text-5xl">{language === "bg" ? "Новини, събития и томболи" : "News, events and raffles"}</h1></header>
    {feed.length ? <div className="grid gap-8 py-10 md:grid-cols-2">{feed.map(item => <article id={item.id} key={item.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-[#e4ddd7] bg-white">
      {item.image && <div className="relative aspect-[16/9] bg-[#eee9e4]"><Image src={imageUrl(item.image)} alt={language === "bg" ? item.titleBg : item.titleEn || item.titleBg} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>}
      <div className="p-7"><div className="flex flex-wrap justify-between gap-3 text-xs font-bold uppercase tracking-wide text-[#08733a]"><span>{labels[item.type]}</span><time dateTime={item.date}>{formatFeedDate(item.date, language)}</time></div><h2 className="mt-4 text-2xl font-black">{language === "bg" ? item.titleBg : item.titleEn || item.titleBg}</h2><p className="mt-4 whitespace-pre-line leading-7 text-[#625851]">{language === "bg" ? item.bodyBg : item.bodyEn || item.bodyBg}</p>{item.type === "raffle" && item.endDate && <p className="mt-5 font-bold text-[#08733a]">{language === "bg" ? "Край на томболата: " : "Raffle ends: "}{formatFeedDate(item.endDate, language)}</p>}</div>
    </article>)}</div> : <p className="my-10 rounded-2xl border border-dashed border-[#d9d0c6] bg-white p-8 text-[#625851]">{language === "bg" ? "Все още няма публикувани новини, събития или томболи." : "No news, events or raffles have been published yet."}</p>}
  </div></main>;
}
