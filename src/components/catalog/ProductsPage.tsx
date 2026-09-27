"use client";

import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/api";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import ProductImpressions from "@/components/catalog/ProductImpressions";

const accents = ["#cf2428", "#08733a", "#a77d36"];

export default function ProductsPage() {
  const { language } = useLanguage();
  const content = useSiteContent()[language];
  const categories = content.products.categories.filter(category => category.visible);
  const contactPath = language === "en" ? "/en/contact" : "/contact";
  const t = language === "bg" ? {
    contact: "Адрес и контакти", products: "В тази категория", visit: "Открийте ни в магазина",
    disclaimer: "Асортиментът може да се променя. Попитайте ни за актуална информация.", empty: "Скоро ще добавим продукти в тази категория.",
  } : {
    contact: "Address and contacts", products: "In this category", visit: "Visit our store",
    disclaimer: "The selection may change. Contact us for current information.", empty: "Products will be added to this category soon.",
  };

  return <div className="bg-[#faf8f5] text-[#211915]">
    <ProductImpressions signature={categories.map(category => `${category.id}:${category.items.map(item => item.id).join(',')}`).join('|')} />
    <section id="categories" aria-labelledby="products-heading" className="scroll-mt-24 border-b border-[#e7ded5] bg-white px-5 py-8 md:py-10">
      <div className="mx-auto max-w-[1180px]">
        <h1 id="products-heading" className="sr-only">{language === "bg" ? "Асортимент" : "Selection"}</h1>
        <div className="flex flex-wrap gap-3 border-b border-[#e7ded5] pb-7">
          <a href="#selection" className="rounded-xl bg-[#08733a] px-6 py-3 font-bold text-white transition-colors hover:bg-[#0b8d47]">{content.home.view}</a>
          <Link href={contactPath} className="rounded-xl border border-[#a79a90] px-6 py-3 font-bold text-[#211915] transition-colors hover:border-[#08733a] hover:text-[#08733a]">{t.contact}</Link>
        </div>
        <nav aria-label={language === "bg" ? "Категории в асортимента" : "Selection categories"} className="flex flex-wrap gap-3 pt-7">
          {categories.map((category, index) => <a key={category.id} href={`#${category.id}`} className="rounded-full border border-[#e4ddd7] px-5 py-2 text-sm font-black uppercase tracking-wide hover:border-[#08733a] hover:text-[#08733a]" style={{ borderLeft: `5px solid ${accents[index % accents.length]}` }}>{category.title}</a>)}
        </nav>
      </div>
    </section>

    <div id="selection" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 pb-16 md:pb-24">
      {categories.map((category, categoryIndex) => {
        const products = category.items.filter(product => product.visible);
        const accent = accents[categoryIndex % accents.length];
        return <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`} className="scroll-mt-28 pt-16 md:pt-24">
          <div data-category-id={category.id} data-category-name={category.title} className="grid overflow-hidden rounded-[24px] border border-[#e4ddd7] bg-white md:grid-cols-[minmax(0,1fr)_minmax(300px,44%)]">
            <div className="flex flex-col justify-center p-7 md:p-12">
              <span className="text-xs font-black uppercase tracking-[.2em]" style={{color:accent}}>{String(categoryIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}</span>
              <h2 id={`${category.id}-heading`} className="mt-4 text-[clamp(32px,4vw,52px)] font-black uppercase leading-tight">{category.title}</h2>
              {category.description && <p className="mt-4 max-w-[550px] text-lg leading-relaxed text-[#625851]">{category.description}</p>}
              <a href={`#${category.id}-items`} className="mt-8 self-start border-b-2 pb-1 text-sm font-black uppercase tracking-wide" style={{borderColor:accent}}>{t.products} ↓</a>
            </div>
            <div className="relative min-h-[230px] bg-[#eae4dd] md:min-h-[350px]">
              {category.image ? <Image src={imageUrl(category.image)} alt={category.title} fill sizes="(max-width: 767px) 100vw, 44vw" className="object-cover" /> : <div className="flex h-full min-h-[230px] items-end bg-[radial-gradient(circle_at_70%_25%,#d7d0c5,transparent_45%),linear-gradient(135deg,#efe9e1,#d6cbc0)] p-8 md:min-h-[350px]"><span className="max-w-full break-words text-[clamp(28px,4vw,50px)] font-black uppercase leading-none text-[#665548]/30">{category.title}</span></div>}
            </div>
          </div>
          <div id={`${category.id}-items`} className="grid scroll-mt-28 gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.length ? products.map(product => <article key={product.id} data-category-id={category.id} data-category-name={category.title} data-product-id={product.id} data-product-name={product.title} className="overflow-hidden rounded-2xl border border-[#e4ddd7] bg-white shadow-[0_8px_26px_rgba(33,25,20,.04)]">
              {product.image && <div className="relative aspect-[4/3] bg-[#eee9e4]"><Image src={imageUrl(product.image)} alt={product.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div>}
              <div className="border-t-4 p-6" style={{borderTopColor:accent}}><h3 className="text-[22px] font-black uppercase leading-tight">{product.title}</h3>{product.description && <p className="mt-3 leading-relaxed text-[#625851]">{product.description}</p>}</div>
            </article>) : <p className="col-span-full py-8 text-[#625851]">{t.empty}</p>}
          </div>
        </section>;
      })}
      <aside className="mt-20 rounded-2xl bg-[#f0e9df] p-7 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
        <div><h2 className="text-2xl font-black uppercase">{t.visit}</h2><p className="mt-2 text-[#625851]">{t.disclaimer}</p></div>
        <Link href={contactPath} className="mt-6 inline-block shrink-0 rounded-xl bg-[#08733a] px-6 py-3 font-bold text-white md:mt-0">{t.contact} →</Link>
      </aside>
    </div>
  </div>;
}
