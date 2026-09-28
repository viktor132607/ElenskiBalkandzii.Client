"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { imageUrl } from "@/lib/api";
import FeedStory from "@/components/FeedStory";
import { defaultImagePlacement, feedMediaType, imagePlacementFor, imagePlacementStyle } from "@/lib/content";

export default function InformationHome() {
  const { language } = useLanguage();
  const site = useSiteContent();
  const content = site[language];
  const [activeSlide, setActiveSlide] = useState(0);
  const visible = [...site.feed].filter(item => item.visible).sort((a, b) => b.date.localeCompare(a.date));
  const latest = visible.filter(item => item.type === "news").slice(0, 3);
  const today = new Date().toISOString().slice(0, 10);
  const events = visible.filter(item => item.type === "event" && item.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const raffles = site.rafflesEnabled ? visible.filter(item => item.type === "raffle" && (!item.endDate || item.endDate >= today)).slice(0, 3) : [];
  const stories = [...latest, ...events].sort((a, b) => b.date.localeCompare(a.date));
  const featured = visible.filter(item => item.featured && (item.type !== "raffle" || (site.rafflesEnabled && (!item.endDate || item.endDate >= today))));
  const featuredSlides = featured.flatMap(item => {
    const photos = feedMediaType(item) === "slideshow" ? item.images || [] : feedMediaType(item) === "image" && item.image ? [item.image] : [];
    return photos.filter(Boolean).map(image => ({ image, placement: imagePlacementFor(item, image), title: language === "bg" ? item.titleBg : item.titleEn || item.titleBg, description: language === "bg" ? item.bodyBg : item.bodyEn || item.bodyBg }));
  });
  const intro = content.about.copy.match(/^.*?[.!?](?=\s|$)/u)?.[0] || content.about.copy;
  const slides = featuredSlides.length ? featuredSlides : [
    { image: site.media.store, placement: site.mediaPlacements?.store || defaultImagePlacement, title: content.home.title, description: intro },
    { image: site.media.products, placement: site.mediaPlacements?.products || defaultImagePlacement, title: language === "bg" ? "Продукти от Еленския Балкан" : "Products from the Elena Balkan", description: intro },
  ];
  const slide = slides[activeSlide % slides.length];
  const [previousSlide, setPreviousSlide] = useState<typeof slide | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  function showSlide(index: number, step: "next" | "previous") {
    if (index === activeSlide % slides.length) return;
    setPreviousSlide(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : slide);
    setDirection(step);
    setActiveSlide(index);
  }

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setPreviousSlide(slide);
      setDirection("next");
      setActiveSlide((activeSlide + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [activeSlide, slide, slides.length]);

  const sections = [
    ...(raffles.length ? [{ id: "raffles", title: language === "bg" ? "Томболи" : "Raffles", items: raffles, empty: "" }] : []),
    { id: "latest-news", title: language === "bg" ? "Новини и събития" : "News and events", items: stories, empty: language === "bg" ? "Все още няма публикувани новини или предстоящи събития." : "No news or upcoming events have been published yet." },
  ];

  return <main className="bg-[#faf8f5] text-[#211915]">
    <section className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-0 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-12 max-[620px]:w-[min(100%_-_28px,1460px)]">
      <div className="flex min-h-[370px] min-w-0 flex-col justify-center bg-white p-8 md:p-12 lg:min-h-[524px] lg:rounded-l-[24px] lg:p-14">
        <span className="text-xs font-black uppercase tracking-[.2em] text-[#08733a]">{content.home.eyebrow}</span>
        <div className="grid w-full">
          {slides.map((entry, index) => <div key={`${index}-${entry.image}-${language}`} aria-hidden={index !== activeSlide % slides.length} className={`col-start-1 row-start-1 ${index === activeSlide % slides.length ? "hero-copy-fade" : "invisible"}`}>
            <h1 className="mt-5 text-[clamp(34px,4vw,58px)] font-black uppercase leading-[1.03]">{entry.title}</h1>
            <p className="mt-6 max-w-xl whitespace-pre-line text-lg leading-relaxed text-[#625851]">{entry.description}</p>
          </div>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={language === "bg" ? "/about" : "/en/about"} className="rounded-xl bg-[#08733a] px-6 py-3 font-bold text-white hover:bg-[#0b8d47]">{language === "bg" ? "За нас" : "About us"}</Link>
          <Link href={language === "bg" ? "/contact" : "/en/contact"} className="rounded-xl border border-[#a79a90] px-6 py-3 font-bold hover:border-[#08733a] hover:text-[#08733a]">{language === "bg" ? "Адрес и контакти" : "Address and contacts"}</Link>
        </div>
      </div>
      <div className="group relative h-[330px] overflow-hidden bg-[#e8e1d7] md:h-[440px] lg:h-auto lg:self-stretch lg:rounded-r-[24px]">
        {previousSlide && <Image src={imageUrl(previousSlide.image)} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" style={imagePlacementStyle(previousSlide.placement)} aria-hidden="true" />}
        <div key={`${activeSlide}-${slide.image}`} className={`absolute inset-0 ${previousSlide ? direction === "next" ? "hero-photo-next" : "hero-photo-previous" : ""}`} onAnimationEnd={() => setPreviousSlide(null)}>
          <Image src={imageUrl(slide.image)} alt={slide.title} fill priority sizes="(max-width: 1023px) 100vw, 50vw" style={imagePlacementStyle(slide.placement)} />
        </div>
        {slides.length > 1 && <>
          <button type="button" onClick={() => showSlide((activeSlide - 1 + slides.length) % slides.length, "previous")} aria-label={language === "bg" ? "Предишен слайд" : "Previous slide"} className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,.9)] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><path d="m15 4-8 8 8 8" /></svg></button>
          <button type="button" onClick={() => showSlide((activeSlide + 1) % slides.length, "next")} aria-label={language === "bg" ? "Следващ слайд" : "Next slide"} className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,.9)] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><path d="m9 4 8 8-8 8" /></svg></button>
        </>}
      </div>
    </section>

    <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] pb-20 max-[620px]:w-[min(100%_-_28px,1460px)]">
      {sections.map(section => <section id={section.id} key={section.id} className="scroll-mt-28 border-t border-[#e4ddd7] py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-black uppercase md:text-4xl">{section.title}</h2><Link href={language === "bg" ? "/news" : "/en/news"} className="border-b-2 border-[#08733a] pb-1 text-sm font-bold text-[#08733a]">{language === "bg" ? "Виж всички" : "View all"} →</Link></div>
        {section.items.length ? <div>{section.items.map((item, index) => <FeedStory key={item.id} item={item} language={language} linked reverse={index % 2 === 1} />)}</div> : <p className="py-7 text-[#625851]">{section.empty}</p>}
      </section>)}
    </div>
  </main>;
}
