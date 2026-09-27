"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { CookieSettingsButton } from "@/components/CookieConsent";

type LegalKind = "privacy" | "terms" | "cookies";

const content = {
  privacy: {
    bg: {
      eyebrow: "Еленски Балканджии · Информация",
      title: "Политика за поверителност",
      intro: "Тази страница описва какви данни могат да бъдат обработвани при използване на сайта на Еленски Балканджии и какви права имате.",
      sections: [
        ["1. Кой поддържа сайта и контакт", "Сайтът представя магазина „Еленски Балканджии“ в Русе. За въпроси относно обработването на данни използвайте адрес ул. „Шипка“ 12, ж.к. Родина 3, 7012 Русе или телефон 087 878 8897."],
        ["2. Какви данни се обработват", "Публичното разглеждане не изисква профил и формуляр с лични данни. Сайтът пази вашия избор за бисквитки. Хостингът и API могат да обработват технически данни за заявките, например IP адрес и време на достъп, за работа и сигурност на услугата. Само при „Приемам всички“ и конфигуриран Google Analytics се изпращат данни за посетените страници и видимите категории и продуктови карти."],
        ["3. Защо и на какво основание", "Необходимите технически данни се използват за предоставяне и защита на сайта; предпочитанието за бисквитки пази вашия избор. Статистиката е незадължителна и се включва само въз основа на вашето съгласие, което можете да оттеглите чрез „Настройки на бисквитките“ на страницата „Бисквитки“. Отказът не ограничава достъпа до публичното съдържание."],
        ["4. Получатели и външно съдържание", "Сайтът се хоства в Render, а администраторското съдържание се поддържа чрез API и база данни. При съгласие може да се използва Google Analytics. Картата на Google се зарежда автоматично само при „Приемам всички“, а при друг избор — след натискане на „Зареди картата“. Видеа от YouTube или Vimeo се зареждат след натискане на „Пусни видеото“. При отваряне на външна връзка съответният доставчик обработва заявката по собствената си политика."],
        ["5. Срокове", "Изборът за бисквитки се пази 180 дни. Ако разрешите статистика, Google Analytics може да използва бисквитки _ga и _ga_* с обичаен срок до 2 години. Администраторският достъп се пази в sessionStorage за сесията на браузъра. За сроковете на техническите логове и данните при външните доставчици се прилагат техните настройки и политики."],
        ["6. Вашите права", "Според приложимите условия можете да поискате достъп, коригиране, изтриване, ограничаване или преносимост на данните и да възразите срещу обработване. Можете да оттеглите съгласието си по всяко време, без това да засяга обработването преди оттеглянето. За въпроси използвайте посочените контакти; жалба може да се подаде до Комисията за защита на личните данни (КЗЛД)."],
      ],
      related: "За информация относно бисквитките и локалното съхранение вижте политиката за бисквитки.",
      relatedHref: "/cookies",
      relatedLabel: "Политика за бисквитки",
    },
    en: {
      eyebrow: "Elenski Balkandzhii · Information",
      title: "Privacy Policy",
      intro: "This page explains what data may be processed when using the Elenski Balkandzhii website and what rights you have.",
      sections: [
        ["1. Website operator and contact", "This website presents the Elenski Balkandzhii store in Ruse. For questions about data processing, use the address 12 Shipka St., Rodina 3, 7012 Ruse, Bulgaria, or call 087 878 8897."],
        ["2. Data processed", "Browsing public pages does not require an account or a personal-data form. The website stores your cookie choice. The hosting provider and API may process request details such as IP address and access time to operate and secure the service. Only after ‘Accept all’, and if Google Analytics is configured, are page visits and visible category and product-card views sent for analytics."],
        ["3. Purposes and legal basis", "Necessary technical data is used to provide and secure the website; the preference cookie remembers your choice. Analytics is optional and relies on your consent, which you can withdraw using ‘Cookie settings’ on the Cookies page. Refusing analytics does not restrict access to public content."],
        ["4. Recipients and external content", "The website is hosted on Render, while admin content is served by an API and database. With consent, Google Analytics may be used. The Google map loads automatically only after ‘Accept all’; otherwise it loads when you select ‘Load map’. YouTube or Vimeo videos load after you select ‘Play video’. Opening an external link sends a request to that service, whose own privacy policy applies."],
        ["5. Retention", "The cookie choice is kept for 180 days. If you allow analytics, Google Analytics may set _ga and _ga_* cookies with a typical lifetime of up to two years. Admin access is held in sessionStorage for the browser session. Technical log retention and data held by outside providers depend on their settings and policies."],
        ["6. Your rights", "Where applicable, you may request access, correction, erasure, restriction or portability of your data and object to processing. You can withdraw consent at any time without affecting prior processing. Use the contact details above for questions; you may lodge a complaint with Bulgaria's Commission for Personal Data Protection (CPDP)."],
      ],
      related: "For information about cookies and browser storage, see the Cookie Policy.",
      relatedHref: "/cookies",
      relatedLabel: "Cookie Policy",
    },
  },
  terms: {
    bg: {
      eyebrow: "Еленски Балканджии · Информация",
      title: "Общи условия",
      intro: "Тези условия уреждат използването на публичния сайт на Еленски Балканджии и публикуваното в него съдържание.",
      sections: [
        ["1. Предназначение на сайта", "Сайтът предоставя информация за Еленски Балканджии, асортимента, новини, събития, магазина, работното време и начините за контакт. Сайтът не приема поръчки и плащания; публикуваното съдържание има информационен характер."],
        ["2. Използване на сайта", "Сайтът може да се използва за лични и информационни цели. Не се допуска злоупотреба с функционалностите, опити за неоторизиран достъп или действия, които нарушават нормалната му работа."],
        ["3. Авторски права", "Текстове, снимки, лого, графични елементи и други материали могат да бъдат защитени от авторско право и други права на интелектуална собственост. Използването им извън обичайното разглеждане следва да зачита правата на съответните носители."],
        ["4. Асортимент и събития", "Асортиментът, наличностите, описанията и обявените събития могат да се променят. Публикуването на продукт в сайта не означава, че е наличен в конкретния момент. За актуални данни относно покупка или посещение проверете в магазина или на посочения телефон."],
        ["5. Външни услуги и бисквитки", "Сайтът може да съдържа връзки към външни сайтове, карта на Google и видеа от външни платформи. При отварянето им се прилагат условията на съответната услуга. Изборът за статистика и вградена карта се управлява от „Настройки на бисквитките“, а подробностите са в политиките за поверителност и бисквитки."],
        ["6. Наличност и отговорност", "Полагат се разумни усилия сайтът и информацията в него да бъдат достъпни и актуални, но не се гарантира непрекъсната работа без технически прекъсвания или абсолютна липса на грешки."],
        ["7. Промени", "Условията могат да бъдат актуализирани при промяна на сайта, услугите или приложимите изисквания. Актуалната версия се публикува на тази страница."],
      ],
      related: "Информация за личните данни е достъпна в политиката за поверителност.",
      relatedHref: "/privacy",
      relatedLabel: "Политика за поверителност",
    },
    en: {
      eyebrow: "Elenski Balkandzhii · Information",
      title: "Terms and Conditions",
      intro: "These terms govern use of the public Elenski Balkandzhii website and the content published on it.",
      sections: [
        ["1. Purpose of the website", "The website provides information about Elenski Balkandzhii, its product range, news, events, store, opening hours and contact details. It does not accept orders or payments; published content is informational."],
        ["2. Use of the website", "The website may be used for personal and informational purposes. Misuse of functionality, unauthorized-access attempts or actions that interfere with normal operation are not permitted."],
        ["3. Copyright", "Texts, photos, logos, graphics and other materials may be protected by copyright and other intellectual-property rights. Use beyond normal website browsing must respect the rights of the relevant rights holders."],
        ["4. Selection and events", "The product selection, availability, descriptions and announced events may change. A listed product is not necessarily in stock at any given time. For details relevant to a purchase or visit, check with the store or call the published phone number."],
        ["5. External services and cookies", "The website may contain external links, a Google map and videos hosted on other platforms. Their terms apply when you open them. Your choice about analytics and the embedded map is managed through ‘Cookie settings’; see the privacy and cookie policies for details."],
        ["6. Availability and liability", "Reasonable efforts are made to keep the website and its information available and current, but uninterrupted operation without technical issues or absolute freedom from errors cannot be guaranteed."],
        ["7. Changes", "These terms may be updated when the website, services or applicable requirements change. The current version is published on this page."],
      ],
      related: "Information about personal data is available in the Privacy Policy.",
      relatedHref: "/privacy",
      relatedLabel: "Privacy Policy",
    },
  },
  cookies: {
    bg: {
      eyebrow: "Еленски Балканджии · Информация",
      title: "Политика за бисквитки",
      intro: "Тази страница описва задължителното съхранение и незадължителните статистически бисквитки.",
      sections: [
        ["Трите избора", "„Само задължителни“ оставя включено единствено съхранението, нужно за запомняне на избора. „Приемам всички“ разрешава Google Analytics (ако е настроен) и автоматично зарежда вградената карта. „Отказвам всички“ отказва незадължителните технологии; задължителната бисквитка остава, за да помни отказа. „Само задължителни“ и „Отказвам всички“ имат еднакъв ефект върху незадължителните услуги. Картата и външните видеа могат да се отворят поотделно с бутон. Изборът може да се промени по всяко време."],
        ["1. Задължителни", "Бисквитката elenski_cookie_choice пази избора ви („само задължителни“, „приемам всички“ или „отказвам всички“) за 180 дни (SameSite=Lax, Secure при HTTPS). При отказ задължителната бисквитка продължава да помни отказа. Администраторският панел използва sessionStorage за сесията на редактора. Езикът се определя от адреса на страницата."],
        ["2. Незадължителна статистика", "Само след „Приемам всички“ и при настроен Google Analytics сайтът зарежда Google tag. Услугата може да създава бисквитки _ga и _ga_* (обичайно до 2 години) и измерва посещения на страници и видими продуктови карти/категории. „Само задължителни“ и „Отказвам всички“ не включват статистиката. Не използваме рекламно проследяване."],
        ["3. Google Maps и видео", "При „Приемам всички“ картата в „Контакти“ се зарежда автоматично. При останалите избори тя се зарежда само след натискане на „Зареди картата“. Можете да отворите адреса и директно в Google Maps, включително на телефон. Външните видеа се зареждат само след натискане на „Пусни видеото“. Външните услуги могат да обработват технически данни и да използват бисквитки според собствените си политики."],
        ["4. Промяна на избора", "Използвайте „Настройки на бисквитките“ на тази страница, за да промените избора по всяко време. При оттегляне сайтът спира измерването и премахва достъпните за него бисквитки на Google Analytics. Можете да изтриете бисквитките и от браузъра. Съдържанието остава достъпно при отказ."],
        ["5. Промени в политиката", "При добавяне или премахване на аналитични, рекламни или други външни услуги тази политика може да бъде актуализирана, за да отразява реално използваните технологии."],
      ],
      related: "За повече информация относно обработването на лични данни вижте политиката за поверителност.",
      relatedHref: "/privacy",
      relatedLabel: "Политика за поверителност",
    },
    en: {
      eyebrow: "Elenski Balkandzhii · Information",
      title: "Cookie Policy",
      intro: "This page describes essential storage and optional analytics cookies.",
      sections: [
        ["Your three choices", "‘Essential only’ retains only the storage required to remember your choice. ‘Accept all’ allows Google Analytics (if configured) and loads the embedded map automatically. ‘Reject all’ declines optional technologies; the essential cookie still remembers your refusal. Essential only and reject all have the same effect on optional services. You can load the map or an external video individually using its button, and change your choice at any time."],
        ["1. Essential storage", "The elenski_cookie_choice cookie remembers your choice (essential only, accept all or reject all) for 180 days (SameSite=Lax, Secure on HTTPS). Even after reject all, this essential cookie remembers the refusal. The editor uses sessionStorage for its admin session. Language is determined from the page URL."],
        ["2. Optional analytics", "Only after you select ‘Accept all’, and only if Google Analytics is configured, the website loads the Google tag. It may set _ga and _ga_* cookies (typically up to two years) and measures page visits and visible product cards and categories. Essential only and reject all do not enable analytics. We do not use advertising tracking."],
        ["3. Google Maps and videos", "Accept all automatically loads the map on the contact page. With either other choice, the map loads only if you select ‘Load map’. You can also open the address directly in Google Maps on a phone. Third-party videos load only when you select ‘Play video’. External services may process technical data and set cookies under their own policies."],
        ["4. Changing your choice", "Use ‘Cookie settings’ on this page to change your choice at any time. On withdrawal, the website stops measurement and removes Google Analytics cookies accessible to this website. You can also remove cookies in browser settings. The website remains available if you decline."],
        ["5. Policy changes", "If analytics, advertising or other external services are added or removed, this policy may be updated to reflect the technologies actually in use."],
      ],
      related: "For more information about personal-data processing, see the Privacy Policy.",
      relatedHref: "/privacy",
      relatedLabel: "Privacy Policy",
    },
  },
} as const;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const { language } = useLanguage();
  const data = content[kind][language];
  const localizedHref = language === "en" ? `/en${data.relatedHref}` : data.relatedHref;

  return (
    <main className="bg-white text-[#211915]">
      <header className="border-b border-[#e4ddd7] bg-[#f6f3ef] py-16 max-[620px]:py-12">
        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
          <span className="text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">{data.eyebrow}</span>
          <h1 className="mt-3 text-[clamp(38px,6vw,64px)] font-black uppercase leading-[.95] tracking-[-.02em]">{data.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#665c55]">{data.intro}</p>
        </div>
      </header>
      <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-8 py-16 max-[620px]:w-[min(100%_-_28px,1460px)] max-[620px]:py-12">
        {data.sections.map(([title, text]) => (
          <section key={title} className="border-b border-[#e4ddd7] pb-8 last:border-b-0">
            <h2 className="text-2xl font-black tracking-[-.01em]">{title}</h2>
            <p className="mt-3 text-[16px] leading-8 text-[#665c55]">{text}</p>
          </section>
        ))}
        {kind === "cookies" && <section className="rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] p-6">
          <h2 className="text-xl font-black">{language === "bg" ? "Промени избора си" : "Change your choice"}</h2>
          <CookieSettingsButton className="mt-4 rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white" />
        </section>}
        <section className="rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] p-6">
          <p className="text-[15px] leading-7 text-[#665c55]">{data.related}</p>
          <Link href={localizedHref} className="mt-3 inline-block font-bold text-[#08733a] hover:underline">{data.relatedLabel}</Link>
        </section>
      </div>
    </main>
  );
}
