"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { imageUrl } from "@/lib/api";
import type { FeedItem } from "@/lib/content";

export function formatFeedDate(value: string, language: "bg" | "en") {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  return new Intl.DateTimeFormat(language === "bg" ? "bg-BG" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function videoSource(value: string): { src: string; embedded: boolean } | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const youtubeId = host === "youtu.be" ? url.pathname.slice(1) : host === "youtube.com" || host === "www.youtube.com" ? (url.pathname.startsWith("/shorts/") ? url.pathname.split("/")[2] : url.searchParams.get("v")) : null;
    if (youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(youtubeId)) return { src: `https://www.youtube-nocookie.com/embed/${youtubeId}`, embedded: true };
    if (host === "vimeo.com" || host === "www.vimeo.com") {
      const id = url.pathname.split("/")[1];
      if (/^\d+$/.test(id)) return { src: `https://player.vimeo.com/video/${id}`, embedded: true };
    }
    if (/\.mp4$/i.test(url.pathname)) return { src: url.toString(), embedded: false };
  } catch { return null; }
  return null;
}

export default function FeedStory({ item, language, linked = false, reverse = false }: { item: FeedItem; language: "bg" | "en"; linked?: boolean; reverse?: boolean }) {
  const title = language === "bg" ? item.titleBg : item.titleEn || item.titleBg;
  const body = language === "bg" ? item.bodyBg : item.bodyEn || item.bodyBg;
  const photos = item.images?.length ? item.images : item.image ? [item.image] : [];
  const video = item.videoUrl ? videoSource(item.videoUrl) : null;
  const count = photos.length + (video ? 1 : 0);
  const [active, setActive] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const label = language === "bg" ? { news: "Новина", event: "Събитие", raffle: "Томбола" }[item.type] : { news: "News", event: "Event", raffle: "Raffle" }[item.type];

  useEffect(() => {
    if (count < 2 || (active === photos.length && video) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % count), 6500);
    return () => window.clearInterval(timer);
  }, [active, count, photos.length, video]);

  return <article id={item.id} className={`grid scroll-mt-28 items-center gap-8 border-b border-[#e4ddd7] py-12 md:gap-12 md:py-16 ${count ? "lg:grid-cols-2" : ""}`}>
    <div className={`max-w-2xl ${reverse && count ? "lg:order-2" : ""}`}>
      <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-[.14em] text-[#08733a]"><span>{label}</span><time dateTime={item.date}>{formatFeedDate(item.date, language)}</time></div>
      <h3 className="mt-4 text-[clamp(28px,3vw,44px)] font-black leading-tight">{linked ? <Link href={`${language === "bg" ? "/news" : "/en/news"}#${item.id}`} className="hover:text-[#08733a]">{title}</Link> : title}</h3>
      <p className="mt-5 whitespace-pre-line text-lg leading-8 text-[#625851]">{body}</p>
      {item.type === "raffle" && item.endDate && <p className="mt-5 font-bold text-[#08733a]">{language === "bg" ? "Край на томболата: " : "Raffle ends: "}{formatFeedDate(item.endDate, language)}</p>}
      {linked && <Link href={`${language === "bg" ? "/news" : "/en/news"}#${item.id}`} className="mt-6 inline-block border-b-2 border-[#08733a] pb-1 font-bold text-[#08733a]">{language === "bg" ? "Виж публикацията" : "View post"} →</Link>}
    </div>
    {count > 0 && <div className={`relative overflow-hidden rounded-2xl bg-[#eee9e4] ${reverse ? "lg:order-1" : ""}`}>
      <div className="relative aspect-[16/10]">
        {active < photos.length ? <Image src={imageUrl(photos[active])} alt={`${title} — ${active + 1}`} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
          : video && (playVideo ? video.embedded ? <iframe title={title} src={video.src} className="h-full w-full" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <video controls playsInline src={video.src} className="h-full w-full" />
            : <button type="button" onClick={() => setPlayVideo(true)} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#211914] p-8 text-center font-bold text-white"><span className="text-5xl">▶</span>{language === "bg" ? "Пусни видеото" : "Play video"}</button>)}
      </div>
      {count > 1 && <div className="flex items-center justify-center gap-2 bg-white p-3">{Array.from({ length: count }, (_, index) => <button key={index} type="button" onClick={() => { setActive(index); setPlayVideo(false); }} aria-label={`${index < photos.length ? language === "bg" ? "Снимка" : "Photo" : language === "bg" ? "Видео" : "Video"} ${index + 1}`} aria-current={active === index ? "true" : undefined} className={`h-3 w-3 rounded-full border border-[#08733a] ${active === index ? "bg-[#08733a]" : "bg-white"}`} />)}</div>}
    </div>}
  </article>;
}
