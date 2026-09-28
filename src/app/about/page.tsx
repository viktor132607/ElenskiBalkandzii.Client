"use client";

import Image from "next/image";
import { imageUrl } from "@/lib/api";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { defaultImagePlacement, imagePlacementStyle } from "@/lib/content";

export default function AboutPage() {
  const { language } = useLanguage();
  const site = useSiteContent();
  const media = site.media;
  const t = useSiteContent()[language].about;
  const rows = t.rows;

  return (
    <section className="min-h-[68vh] bg-white py-[72px] max-[620px]:py-[48px]" aria-labelledby="about-heading">
      <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-10 lg:grid-cols-[minmax(0,1fr)_728px] max-[620px]:w-[min(100%_-_28px,1460px)]">
        <article className="flex flex-col pt-6 max-[1100px]:pt-0">
          <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
            <span className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-[#d9d1ca] bg-white max-[620px]:h-24 max-[620px]:w-24"><Image src={imageUrl(media.logo)} alt={language === "bg" ? "Лого на Еленски Балканджии" : "Elenski Balkandzhii logo"} width={112} height={112} priority className="h-full w-full" style={imagePlacementStyle(site.mediaPlacements?.logo || defaultImagePlacement)} /></span>
            <div><span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">{t.eyebrow}</span><h1 id="about-heading" className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">{t.title}</h1></div>
          </div>
          <p className="mb-8 max-w-[760px] text-lg leading-[1.65] text-[#514943] max-[620px]:text-base">{t.copy}</p>
          <dl className="divide-y divide-[#e4ddd7] border-y border-[#e4ddd7]">
            {rows.map(({label, copy}, index) => <div key={`${index}-${label}`} className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2"><dt className="font-black uppercase text-[#08733a]">{label}</dt><dd className="m-0 leading-[1.65] text-[#514943]">{copy}</dd></div>)}
          </dl>
        </article>
        <figure className="m-0 h-full min-h-[688px] w-[728px] overflow-hidden rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:w-full max-[1100px]:aspect-[903/1024]"><Image src={imageUrl(media.about || '/elenski-balkandzhii-fresh-meat.webp')} alt={language === "bg" ? "Прясно месо на Еленски Балканджии" : "Fresh meat from Elenski Balkandzhii"} width={903} height={1024} priority sizes="(max-width: 1100px) calc(100vw - 40px), 728px" className="h-full w-full" style={imagePlacementStyle(site.mediaPlacements?.about || defaultImagePlacement)} /></figure>
      </div>
    </section>
  );
}
