"use client";

import Image from "next/image";
import { imageUrl } from "@/lib/api";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import ConsentMap from "@/components/ConsentMap";
import { defaultImagePlacement, imagePlacementStyle } from "@/lib/content";

function formatDate(value: string, language: "bg" | "en") {
  return new Intl.DateTimeFormat(language === "bg" ? "bg-BG" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export default function ContactPage() {
  const { language } = useLanguage();
  const site = useSiteContent();
  const media = site.media;
  const data = useSiteContent()[language].contact;
  const workingHours = data.hours;
  const specialHours = [...(data.specialHours || [])].sort((a, b) => a.date.localeCompare(b.date));
  const t = language === "bg" ? {
    contacts: "Контакти", address: "Адрес", phone: "Телефон", email: "Имейл", hours: "Обичайно работно време", special: "Специално работно време", alt: "Магазин Еленски Балканджии в Русе"
  } : { contacts: "Contacts", address: "Address", phone: "Phone", email: "Email", hours: "Regular opening hours", special: "Special opening hours", alt: "Elenski Balkandzhii store in Ruse" };

  return (
    <section className="min-h-[68vh] bg-white py-[72px] max-[620px]:py-[48px]" aria-labelledby="contact-heading">
      <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-10 lg:grid-cols-[minmax(0,1fr)_728px] max-[620px]:w-[min(100%_-_28px,1460px)]">
        <article className="flex flex-col pt-6 max-[1100px]:pt-0">
          <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
            <span className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-[#d9d1ca] bg-white max-[620px]:h-24 max-[620px]:w-24"><Image src={imageUrl(media.logo)} alt={language === "bg" ? "Лого на Еленски Балканджии" : "Elenski Balkandzhii logo"} width={112} height={112} priority className="h-full w-full" style={imagePlacementStyle(site.mediaPlacements?.logo || defaultImagePlacement)} /></span>
            <div><span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">{t.contacts}</span><h1 id="contact-heading" className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">{data.heading}</h1></div>
          </div>
          <dl className="mt-auto divide-y divide-[#e4ddd7] border-y border-[#e4ddd7]">
            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
              <dt className="font-black uppercase text-[#08733a]">{t.address}</dt>
              <dd className="m-0"><address className="not-italic text-lg leading-[1.65] text-[#514943]">{data.address}</address></dd>
            </div>
            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
              <dt className="font-black uppercase text-[#08733a]">{t.phone}</dt>
              <dd className="m-0 flex flex-col gap-2">{[data.phone, data.phone2].filter((number): number is string => !!number?.trim()).map(number => <a key={number} href={`tel:${number.replace(/[^+\d]/g, "")}`} className="w-fit text-lg font-bold text-[#211915] transition-colors hover:text-[#08733a]" aria-label={`${language === "bg" ? "Обадете се на" : "Call"} ${number}`}>{number}</a>)}</dd>
            </div>
            {data.email?.trim() && <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
              <dt className="font-black uppercase text-[#08733a]">{t.email}</dt>
              <dd className="m-0 break-all"><a href={`mailto:${data.email.trim()}`} className="text-lg font-bold text-[#211915] transition-colors hover:text-[#08733a]">{data.email.trim()}</a></dd>
            </div>}
            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-3">
              <dt className="font-black uppercase text-[#08733a]">{t.hours}</dt>
              <dd className="m-0 space-y-2 text-[#514943]">{workingHours.map(({day, hours}) => <div key={day} className="flex max-w-[360px] items-center justify-between gap-6 border-b border-[#eee9e4] pb-2 last:border-0 last:pb-0"><span>{day}</span><time>{hours}</time></div>)}<p className="pt-2 text-sm text-[#8a817a]">{data.note}</p></dd>
            </div>
            {specialHours.length > 0 && <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-3">
              <dt className="font-black uppercase text-[#08733a]">{t.special}</dt>
              <dd className="m-0 space-y-3 text-[#514943]">{specialHours.map(entry => <div key={entry.id} className="max-w-[430px] border-b border-[#eee9e4] pb-3 last:border-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><span className="font-bold text-[#211915]">{entry.label}</span><time dateTime={entry.date} className="text-sm">{formatDate(entry.date, language)}</time></div>
                <p className="mt-1 font-semibold text-[#08733a]">{entry.hours}</p>
              </div>)}</dd>
            </div>}
          </dl>
        </article>
        <div className="flex w-[728px] flex-col gap-[20px] max-[1100px]:w-full">
          <figure className="m-0 h-[588px] w-full overflow-hidden rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] max-[1100px]:h-auto max-[1100px]:aspect-[728/588]">
            <Image
              src={imageUrl(media.store)}
              alt={t.alt}
              width={728}
              height={688}
              priority
              sizes="(max-width: 1100px) calc(100vw - 40px), 728px"
              className={site.mediaPlacements?.store ? "h-full w-full" : "h-[calc(100%_+_50px)] w-full translate-y-[-20px] object-cover"}
              style={site.mediaPlacements?.store ? imagePlacementStyle(site.mediaPlacements.store) : { objectPosition: "center 40%" }}
            />
          </figure>
          <ConsentMap />
        </div>
      </div>
    </section>
  );
}
