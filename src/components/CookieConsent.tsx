"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type Choice = "accepted" | "rejected" | null;
type ConsentContext = { choice: Choice; ready: boolean; choose: (value: Exclude<Choice, null>) => void; openSettings: () => void };
const Context = createContext<ConsentContext | null>(null);
const cookieName = "elenski_cookie_choice";

function readChoice(): Choice {
  const value = document.cookie.split("; ").find(part => part.startsWith(`${cookieName}=`))?.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const saved = readChoice();
    queueMicrotask(() => { setChoice(saved); setReady(true); });
  }, []);

  function choose(value: Exclude<Choice, null>) {
    const wasAccepted = choice === "accepted";
    document.cookie = `${cookieName}=${value}; Max-Age=15552000; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setChoice(value);
    setSettingsOpen(false);
    if (wasAccepted && value === "rejected") {
      for (const part of document.cookie.split("; ")) {
        const name = part.split("=")[0];
        if (/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) {
          document.cookie = `${name}=; Max-Age=0; Path=/`;
          const labels = location.hostname.split(".");
          for (let index = 0; index < labels.length - 1; index++) {
            document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${labels.slice(index).join(".")}`;
          }
        }
      }
      location.reload();
    }
  }

  const t = english ? {
    title: "Cookie preferences", body: "Essential storage keeps your cookie choice. With your permission, Google Analytics measures page visits and which product cards are viewed. You can change your choice at any time.",
    accept: "Accept analytics", reject: "Reject analytics", policy: "Cookie policy", close: "Close",
  } : {
    title: "Настройки за бисквитки", body: "Задължителното съхранение пази избора ви. С ваше съгласие Google Analytics измерва посещенията на страници и разглежданията на продуктови карти. Можете да промените избора си по всяко време.",
    accept: "Приемам статистиката", reject: "Отказвам статистиката", policy: "Политика за бисквитки", close: "Затвори",
  };

  return <Context.Provider value={{ choice, ready, choose, openSettings: () => setSettingsOpen(true) }}>
    {children}
    {ready && (choice === null || settingsOpen) && <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-[#d8d0c8] bg-white p-5 text-[#211915] shadow-[0_14px_45px_rgba(0,0,0,.23)] sm:p-6" role="dialog" aria-modal="false" aria-label={t.title}>
      <div className="flex items-start justify-between gap-4"><h2 className="text-xl font-black">{t.title}</h2>{choice !== null && <button type="button" onClick={() => setSettingsOpen(false)} aria-label={t.close} className="rounded p-1 text-xl">×</button>}</div>
      <p className="mt-2 text-sm leading-6 text-[#514943]">{t.body} <Link href={english ? "/en/cookies" : "/cookies"} className="font-bold text-[#08733a] underline">{t.policy}</Link>.</p>
      <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => choose("rejected")} className="rounded-xl border border-[#08733a] px-5 py-3 font-bold text-[#08733a]">{t.reject}</button><button type="button" onClick={() => choose("accepted")} className="rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">{t.accept}</button></div>
    </div>}
  </Context.Provider>;
}

export function useCookieConsent() {
  const context = useContext(Context);
  if (!context) throw new Error("CookieConsentProvider is missing");
  return context;
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useCookieConsent();
  const pathname = usePathname();
  return <button type="button" onClick={openSettings} className={className}>{pathname.startsWith("/en") ? "Cookie settings" : "Настройки на бисквитките"}</button>;
}
