"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { imageUrl } from "@/lib/api";
import { defaultImagePlacement, imagePlacementStyle } from "@/lib/content";

export default function Footer() {
  const { language } = useLanguage();
  const site = useSiteContent();
  const { contact } = site[language];
  const localizedHref = (href: string) => {
    const [path, hash] = href.split("#");
    const localizedPath = language === "en"
      ? path === "/" ? "/en" : `/en${path}`
      : path;

    return `${localizedPath}${hash ? `#${hash}` : ""}`;
  };

  const t = language === "bg" ? {
    nav: "Страници",
    info: "Информация",
    contactTitle: "Контакти",
    home: "Начало",
    products: "Асортимент",
    news: "Новини",
    meat: "Месо",
    delicacies: "Мезета",
    cheese: "Сирена",
    about: "За нас",
    contacts: "Контакти",
    privacy: "Политика за поверителност",
    terms: "Общи условия",
    cookies: "Бисквитки",
    facebook: "Facebook страницата на Еленски Балканджии",
    rights: "Всички права запазени.",
    createdBy: "Сайтът е създаден от",
  } : {
    nav: "Pages",
    info: "Information",
    contactTitle: "Contact",
    home: "Home",
    products: "Selection",
    news: "News",
    meat: "Meat",
    delicacies: "Delicacies",
    cheese: "Cheese",
    about: "About us",
    contacts: "Contacts",
    privacy: "Privacy policy",
    terms: "Terms and conditions",
    cookies: "Cookies",
    facebook: "Elenski Balkandzhii on Facebook",
    rights: "All rights reserved.",
    createdBy: "Site created by",
  };

  return (
    <footer className="bg-[#211914] pb-5 text-white">
      <div className="h-[5px] bg-[linear-gradient(90deg,#0b9c4a_0_33.333%,#fff_33.333%_66.666%,#cf2428_66.666%_100%)]" aria-hidden="true" />
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] grid-cols-[1.2fr_1fr_1fr] gap-10 pt-9 max-[800px]:gap-6 max-[700px]:grid-cols-2 max-[620px]:w-[min(1180px,calc(100%_-_32px))] max-[620px]:grid-cols-1 max-[620px]:gap-8">
        <div className="max-[700px]:col-span-2 max-[620px]:col-span-1">
          <Link href={localizedHref("/")} className="inline-flex items-center gap-3.5" aria-label={language === "bg" ? "Еленски Балканджии — начало" : "Elenski Balkandzhii — home"}>
            <span className="h-[62px] w-[62px] shrink-0 overflow-hidden rounded-full border-2 border-[#c4a87b] bg-white max-[620px]:h-[50px] max-[620px]:w-[50px]"><Image src={imageUrl(site.media.logo)} alt="" width={62} height={62} className="h-full w-full" style={imagePlacementStyle(site.mediaPlacements?.logo || defaultImagePlacement)} /></span>
            <span className="flex flex-col font-serif text-[21px] font-bold uppercase leading-[1.05] tracking-[0.06em] text-[#f7f0e5] max-[620px]:text-[15px]"><span>Еленски</span><span>Балканджии</span></span>
          </Link>
          <a href="https://www.facebook.com/100057496117481/" target="_blank" rel="noopener noreferrer" aria-label={t.facebook} title={t.facebook} className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#211914] transition-colors hover:bg-[#e6bd7e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>
          </a>
        </div>
        <nav aria-label={language === "bg" ? "Навигация във футъра" : "Footer navigation"}>
          <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#a99d95]">{t.nav}</div>
          <div className="grid gap-2.5 text-sm text-[#efe9e5]">
            <Link className="hover:text-white" href={localizedHref("/")}>{t.home}</Link>
            <Link className="hover:text-white" href={localizedHref("/products")}>{t.products}</Link>
            <Link className="hover:text-white" href={localizedHref("/news")}>{t.news}</Link>
            <Link className="hover:text-white" href={localizedHref("/about")}>{t.about}</Link>
          </div>
        </nav>
        <div>
          <nav aria-label={language === "bg" ? "Информация във футъра" : "Footer information"}>
            <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#a99d95]">{t.info}</div>
            <div className="grid gap-2.5 text-sm text-[#efe9e5]">
              <Link className="hover:text-white" href={localizedHref("/privacy")}>{t.privacy}</Link>
              <Link className="hover:text-white" href={localizedHref("/terms")}>{t.terms}</Link>
              <Link className="hover:text-white" href={localizedHref("/cookies")}>{t.cookies}</Link>
            </div>
          </nav>
          <div className="mt-5">
            <Link href={localizedHref("/contact")} className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#a99d95] hover:text-white">{t.contactTitle}</Link>
            <address className="grid gap-2 text-sm not-italic leading-6 text-[#efe9e5]">
              <a href="https://www.google.com/maps/search/?api=1&query=%D1%83%D0%BB.+%D0%A8%D0%B8%D0%BF%D0%BA%D0%B0+12%2C+%D0%A0%D1%83%D1%81%D0%B5" target="_blank" rel="noopener noreferrer" className="hover:text-white">{contact.address}</a>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">{contact.phone}</a>
              {contact.phone2?.trim() && <a href={`tel:${contact.phone2.replace(/[^+\d]/g, "")}`} className="hover:text-white">{contact.phone2}</a>}
              {contact.email?.trim() && <a href={`mailto:${contact.email.trim()}`} className="break-all hover:text-white">{contact.email.trim()}</a>}
            </address>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex w-[min(1180px,calc(100%_-_40px))] flex-col gap-2 border-t border-[#463a33] pt-4 text-xs text-[#a99d95] sm:flex-row sm:items-center sm:justify-between max-[620px]:w-[min(1180px,calc(100%_-_32px))]">
        <span>© {new Date().getFullYear()} Еленски Балканджии. {t.rights}</span>
        <span>{t.createdBy} <a href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer" className="font-bold text-[#efe9e5] hover:text-white hover:underline">Viktor Iliev</a></span>
      </div>
    </footer>
  );
}
