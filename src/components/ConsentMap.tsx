"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const mapUrl = "https://www.google.com/maps?q=%D0%B6.%D0%BA.%20%D0%A0%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0%203%2C%20%D1%83%D0%BB.%20%D0%A8%D0%B8%D0%BF%D0%BA%D0%B0%2012%2C%207012%20%D0%A0%D1%83%D1%81%D0%B5&output=embed";

export default function ConsentMap() {
  const [loaded, setLoaded] = useState(false);
  const { language } = useLanguage();
  return loaded ? <iframe title={language === "bg" ? "Google карта — Еленски Балканджии, Русе" : "Google Map — Elenski Balkandzhii, Ruse"} src={mapUrl} className="block h-[260px] w-full rounded-2xl border border-[#e4ddd7]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    : <div className="flex h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] p-6 text-center">
      <p>{language === "bg" ? "Картата е услуга на Google и се зарежда само след ваш избор." : "The map is provided by Google and loads only when you choose to view it."}</p>
      <button type="button" onClick={() => setLoaded(true)} className="rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">{language === "bg" ? "Зареди картата" : "Load map"}</button>
    </div>;
}
