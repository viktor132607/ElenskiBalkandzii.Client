"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { language } = useLanguage();

  const t = language === "bg"
    ? {
        eyebrow: "404",
        title: "Страницата не е намерена",
        copy: "Адресът може да е променен или страницата вече да не съществува.",
        home: "Към началото",
        products: "Виж продуктите",
      }
    : {
        eyebrow: "404",
        title: "Page not found",
        copy: "The address may have changed or the page may no longer exist.",
        home: "Back to home",
        products: "View products",
      };

  return (
    <section className="min-h-[60vh] bg-white px-5 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block text-sm font-black uppercase tracking-[.18em] text-[#08733a]">
          {t.eyebrow}
        </span>
        <h1 className="text-[clamp(38px,6vw,64px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">
          {t.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-[#514943]">
          {t.copy}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-[14px] bg-[#08733a] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            {t.home}
          </Link>
          <Link
            href="/products"
            className="rounded-[14px] border border-[#d7d2cc] bg-white px-6 py-3 font-bold text-[#211915] transition-colors hover:border-[#08733a] hover:text-[#08733a]"
          >
            {t.products}
          </Link>
        </div>
      </div>
    </section>
  );
}
