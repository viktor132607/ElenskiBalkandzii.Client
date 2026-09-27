"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useCookieConsent } from "@/components/CookieConsent";
import { useSiteContent } from "@/components/ContentProvider";

export default function ConsentMap() {
  const [loaded, setLoaded] = useState(false);
  const { language } = useLanguage();
  const { choice } = useCookieConsent();
  const address = useSiteContent()[language].contact.address;
  const query = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${query}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  return <div className="space-y-3">
    {(loaded || choice === "accepted") ? <iframe title={language === "bg" ? "Google карта — Еленски Балканджии, Русе" : "Google Map — Elenski Balkandzhii, Ruse"} src={mapUrl} className="block h-[260px] w-full rounded-2xl border border-[#e4ddd7]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    : <div className="flex h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] p-6 text-center">
      <p>{language === "bg" ? "Картата е услуга на Google и се зарежда само след ваш избор." : "The map is provided by Google and loads only when you choose to view it."}</p>
      <button type="button" onClick={() => setLoaded(true)} className="rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">{language === "bg" ? "Зареди картата" : "Load map"}</button>
    </div>}
    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl border border-[#08733a] px-4 py-2 font-bold text-[#08733a]">{language === "bg" ? "Отвори в Google Maps ↗" : "Open in Google Maps ↗"}</a>
  </div>;
}
