"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { language } = useLanguage();
  const productsPath = language === "en" ? "/en/products" : "/products";

  const content = useSiteContent()[language];
  const t = content.home;
  const categories = content.products.categories.filter(category => category.visible);
  const accents = ['#cf2428', '#0b9c4a', '#d4b36d'];

  return (
    <section className="bg-white py-[92px] max-[1100px]:py-20 max-[820px]:py-[68px] max-[620px]:py-[54px]">
      <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
        <div className="mb-10">
          <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">{t.eyebrow}</span>
          <h1 className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">{t.title}</h1>
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
          {categories.map((category, index) => <Link key={category.id} href={`${productsPath}#${category.id}`} className="group flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-[#e4ddd7] border-t-[6px] bg-white p-7 transition-transform hover:-translate-y-[3px]" style={{ borderTopColor: accents[index % accents.length] }}>
            <div><span className="text-xs font-black uppercase tracking-[.12em] text-[#08733a]">{t.eyebrow}</span><h2 className="mt-7 text-[30px] font-black uppercase tracking-[.02em] max-[620px]:text-[24px]">{category.title}</h2>{category.description && <p className="mt-3 text-sm leading-relaxed text-[#625851]">{category.description}</p>}</div>
            <b className="mt-8 inline-block text-[13px] uppercase text-[#08733a]">{t.view}</b>
          </Link>)}
        </div>
      </div>
    </section>
  );
}
