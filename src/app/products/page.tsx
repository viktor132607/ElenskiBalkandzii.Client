"use client";

import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductsPage() {
  const { language } = useLanguage();
  const categories = useSiteContent()[language].products.categories.map((category, index) => ({ ...category, id: ["meso", "mezeta", "sirena"][index], ribbon: ["bg-[#cf2428] text-white", "bg-[#0b9c4a] text-white", "bg-[#d8b66b] text-[#2b211c]"][index] }));

  return (
    <section className="min-h-[68vh] bg-white py-[92px] pt-[104px] max-[1100px]:py-20 max-[820px]:min-h-0 max-[820px]:py-[68px] max-[820px]:pt-[76px] max-[620px]:py-[54px]" aria-labelledby="products-heading">
      <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
        <h1 id="products-heading" className="sr-only">{language === "bg" ? "Продукти" : "Products"}</h1>
        {categories.map((category, categoryIndex) => (
          <section key={category.id} id={category.id} className={`mb-[72px] scroll-mt-[220px] ${categoryIndex > 0 ? "deferred-render" : ""}`} aria-labelledby={`${category.id}-heading`}>
            <h2 id={`${category.id}-heading`} className={`mb-[22px] inline-block min-w-[230px] px-7 py-3 text-[34px] font-black uppercase tracking-[.04em] [clip-path:polygon(0_7%,94%_0,100%_84%,4%_100%,0_88%)] max-[620px]:min-w-[190px] max-[620px]:text-[28px] ${category.ribbon}`}>{category.title}</h2>
            <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
              {category.items.map((title, index) => (
                <article key={title} className={`flex min-h-[180px] items-center border border-[#e4ddd7] border-t-[6px] bg-white p-7 max-[820px]:min-h-[140px] ${index === 0 ? "border-t-[#cf2428]" : index === 1 ? "border-t-[#0b9c4a]" : "border-t-[#d6b36d]"}`}>
                  <h3 className="text-[26px] font-black uppercase tracking-[.02em] max-[620px]:text-[22px]">{title}</h3>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
