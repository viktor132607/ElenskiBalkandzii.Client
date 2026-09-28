"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FeedStory from "@/components/FeedStory";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { apiUrl } from "@/lib/api";
import { normalizeContent, type SiteContent } from "@/lib/content";

export default function FeedArticle() {
  const { language } = useLanguage();
  const params = useSearchParams();
  const id = params.get("post");
  const site = useSiteContent();
  const [fresh, setFresh] = useState<SiteContent | null>(null);
  const [ready, setReady] = useState(false);
  const newsHref = language === "bg" ? "/news" : "/en/news";

  useEffect(() => {
    const controller = new AbortController();
    fetch(apiUrl("/api/content"), { cache: "no-store", signal: controller.signal })
      .then(response => response.ok && response.status !== 204 ? response.json() : null)
      .then(value => setFresh(normalizeContent(value)))
      .catch(() => {})
      .finally(() => { if (!controller.signal.aborted) setReady(true); });
    return () => controller.abort();
  }, []);

  const content = fresh || site;
  const today = new Date().toISOString().slice(0, 10);
  const item = content.feed.find(entry => entry.id === id && entry.visible && (entry.type !== "raffle" || (content.rafflesEnabled && (!entry.endDate || entry.endDate >= today))));
  return <main className="min-h-[65vh] bg-[#faf8f5] py-12 text-[#211915] md:py-20">
    <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
      <Link href={newsHref} className="inline-block border-b-2 border-[#08733a] pb-1 text-sm font-bold text-[#08733a]">← {language === "bg" ? "Всички новини и събития" : "All news and events"}</Link>
      {item ? <FeedStory key={item.id} item={item} language={language} detail /> :
        <p className="py-16 text-lg text-[#625851]">{!ready ? language === "bg" ? "Зареждане…" : "Loading…" : language === "bg" ? "Публикацията не е намерена." : "This post was not found."}</p>}
    </div>
  </main>;
}
