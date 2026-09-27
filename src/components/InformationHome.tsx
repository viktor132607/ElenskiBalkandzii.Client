"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { imageUrl } from "@/lib/api";
import FeedStory from "@/components/FeedStory";
import { feedMediaType } from "@/lib/content";

export default function InformationHome() {
  const { language } = useLanguage();
  const site = useSiteContent();
  const content = site[language];
  const [activeSlide, setActiveSlide] = useState(0);
  const visible = [...site.feed].filter(item => item.visible).sort((a, b) => b.date.localeCompare(a.date));
  const latest = visible.filter(item => item.type === "news").slice(0, 3);
  const today = new Date().toISOString().slice(0, 10);
  const events = visible.filter(item => item.type === "event" && item.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const raffles = visible.filter(item => item.type === "raffle" && (!item.endDate || item.endDate >= today)).slice(0, 3);
  const featured = visible.filter(item => item.featured && (feedMediaType(item) === "slideshow" ? item.images?.[0] : feedMediaType(item) === "image" ? item.image : false));
  const slides = featured.length ? featured.map(item => ({ image: feedMediaType(item) === "slideshow" ? item.images![0] : item.image, title: language === "bg" ? item.titleBg : item.titleEn || item.titleBg, description: language === "bg" ? item.bodyBg : item.bodyEn || item.bodyBg })) : [
    { image: site.media.store, title: content.home.title, description: content.about.copy.slice(0, 190) + "…" },
    { image: site.media.products, title: language === "bg" ? "Продукти от Еленския Балкан" : "Products from the Elena Balkan", description: content.about.copy.slice(0, 190) + "…" },
  ];
  const slide = slides[activeSlide % slides.length];

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveSlide(current => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const sections = [
    { id: "latest-news", title: language === "bg" ? "Последни новини" : "Latest news", items: latest, empty: language === "bg" ? "Все още няма публикувани новини." : "No news has been published yet." },
    { id: "events", title: language === "bg" ? "Предстоящи събития" : "Upcoming events", items: events, empty: language === "bg" ? "Няма обявени предстоящи събития." : "There are no upcoming events." },
    { id: "raffles", title: language === "bg" ? "Томболи" : "Raffles", items: raffles, empty: language === "bg" ? "В момента няма активни томболи." : "There are no active raffles." },
  ];

  return <main className="bg-[#faf8f5] text-[#211915]">
    <section className="mx-auto grid max-w-[1280px] gap-0 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-12">
      <div className="flex min-h-[370px] flex-col justify-center bg-white p-8 md:p-12 lg:rounded-l-[24px] lg:p-14">
        <span className="text-xs font-black uppercase tracking-[.2em] text-[#08733a]">{content.home.eyebrow}</span>
        <h1 className="mt-5 text-[clamp(34px,4vw,58px)] font-black uppercase leading-[1.03]">{slide.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#625851]">{slide.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={language === "bg" ? "/about" : "/en/about"} className="rounded-xl bg-[#08733a] px-6 py-3 font-bold text-white hover:bg-[#0b8d47]">{language === "bg" ? "За нас" : "About us"}</Link>
          <Link href={language === "bg" ? "/contact" : "/en/contact"} className="rounded-xl border border-[#a79a90] px-6 py-3 font-bold hover:border-[#08733a] hover:text-[#08733a]">{language === "bg" ? "Адрес и контакти" : "Address and contacts"}</Link>
        </div>
      </div>
      <div className="relative min-h-[330px] overflow-hidden bg-[#e8e1d7] lg:rounded-r-[24px]">
        <Image key={slide.image} src={imageUrl(slide.image)} alt={slide.title} fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        {slides.length > 1 && <div className="absolute bottom-5 left-5 z-10 flex gap-2">{slides.map((entry, index) => <button key={`${entry.image}-${index}`} type="button" onClick={() => setActiveSlide(index)} aria-label={`${language === "bg" ? "Слайд" : "Slide"} ${index + 1}`} aria-current={index === activeSlide % slides.length ? "true" : undefined} className={`h-3 w-3 rounded-full border-2 border-white ${index === activeSlide % slides.length ? "bg-white" : "bg-transparent"}`} />)}</div>}
      </div>
    </section>

    <div className="mx-auto max-w-[1180px] px-5 pb-20">
      {sections.map(section => <section id={section.id} key={section.id} className="scroll-mt-28 border-t border-[#e4ddd7] py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-black uppercase md:text-4xl">{section.title}</h2><Link href={language === "bg" ? "/news" : "/en/news"} className="border-b-2 border-[#08733a] pb-1 text-sm font-bold text-[#08733a]">{language === "bg" ? "Виж всички" : "View all"} →</Link></div>
        {section.items.length ? <div>{section.items.map((item, index) => <FeedStory key={item.id} item={item} language={language} linked reverse={index % 2 === 1} />)}</div> : <p className="py-7 text-[#625851]">{section.empty}</p>}
      </section>)}
    </div>
  </main>;
}
