"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

type LegalKind = "privacy" | "terms" | "cookies";

const content = {
  privacy: {
    bg: {
      eyebrow: "Еленски Балканджии · Информация",
      title: "Политика за поверителност",
      intro: "Тази страница описва какви данни могат да бъдат обработвани при използване на сайта на Еленски Балканджии и какви права имате.",
      sections: [
        ["1. Администратор и контакт", "Сайтът представя Еленски Балканджии в гр. Русе. За въпроси относно личните данни можете да използвате данните за контакт на сайта: ул. „Шипка“ 12, ж.к. Родина 3, 7012 Русе, телефон 087 878 8897."],
        ["2. Какви данни могат да се обработват", "При обичайно разглеждане на сайта не се изисква регистрация и не се събират директно име, адрес или телефон. В браузъра може да се съхранява избраният език. При активирана Google Analytics конфигурация могат да се обработват технически и статистически данни за посещенията."],
        ["3. Цели на обработването", "Данните се използват за нормалната работа на сайта, запазване на езиковите предпочитания, статистика за посещаемостта и подобряване на съдържанието и потребителското изживяване."],
        ["4. Правно основание", "Обработването се извършва според приложимото законодателство, включително когато е необходимо за легитимен интерес по поддръжката и сигурността на сайта или въз основа на съгласие, когато такова е необходимо."],
        ["5. Трети страни", "Сайтът се хоства чрез външни технически доставчици и може да използва Google Analytics. Тези услуги могат да обработват технически данни съгласно собствените си политики и приложимите правила за защита на данните."],
        ["6. Вашите права", "При приложимост имате право на достъп, коригиране, изтриване, ограничаване, възражение, преносимост и оттегляне на съгласие. Имате право и да подадете жалба до компетентния надзорен орган."],
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
        ["1. Controller and contact", "The website presents Elenski Balkandzhii in Ruse, Bulgaria. For privacy questions, use the contact details published on the website: 12 Shipka St., Rodina 3, 7012 Ruse, phone 087 878 8897."],
        ["2. Data that may be processed", "Normal browsing does not require registration and the website does not directly request your name, address or phone number. The selected language may be stored in your browser. If Google Analytics is configured, technical and statistical visit data may be processed."],
        ["3. Purposes of processing", "Data is used for normal website operation, language preference storage, visit statistics and improving content and user experience."],
        ["4. Legal basis", "Processing is carried out under applicable law, including where necessary for legitimate interests in website maintenance and security or on the basis of consent where required."],
        ["5. Third parties", "The website is hosted through external technical providers and may use Google Analytics. These services may process technical data under their own policies and applicable data-protection rules."],
        ["6. Your rights", "Where applicable, you have rights of access, rectification, erasure, restriction, objection, portability and withdrawal of consent. You also have the right to lodge a complaint with the competent supervisory authority."],
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
        ["1. Предназначение на сайта", "Сайтът предоставя информация за Еленски Балканджии, асортимента, магазина, работното време и начините за контакт. Информацията има общ информационен характер."],
        ["2. Използване на сайта", "Сайтът може да се използва за лични и информационни цели. Не се допуска злоупотреба с функционалностите, опити за неоторизиран достъп или действия, които нарушават нормалната му работа."],
        ["3. Авторски права", "Текстове, снимки, лого, графични елементи и други материали могат да бъдат защитени от авторско право и други права на интелектуална собственост. Използването им извън обичайното разглеждане следва да зачита правата на съответните носители."],
        ["4. Цени, продукти и наличности", "Публикуваните продукти, описания, цени и наличности могат да бъдат актуализирани. За информация, която е важна за покупка или посещение, проверете актуалните данни в магазина или чрез посочения телефон."],
        ["5. Външни услуги и връзки", "Сайтът може да съдържа връзки или вградени услуги на трети страни. Еленски Балканджии не контролира съдържанието, сигурността и политиките на външните сайтове и услуги."],
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
        ["1. Purpose of the website", "The website provides information about Elenski Balkandzhii, its product range, store, opening hours and contact details. The information is provided for general informational purposes."],
        ["2. Use of the website", "The website may be used for personal and informational purposes. Misuse of functionality, unauthorized-access attempts or actions that interfere with normal operation are not permitted."],
        ["3. Copyright", "Texts, photos, logos, graphics and other materials may be protected by copyright and other intellectual-property rights. Use beyond normal website browsing must respect the rights of the relevant rights holders."],
        ["4. Prices, products and availability", "Published products, descriptions, prices and availability may be updated. For information important to a purchase or visit, verify the current details in the store or by the published phone number."],
        ["5. External services and links", "The website may contain links to or embedded services from third parties. Elenski Balkandzhii does not control the content, security or policies of external websites and services."],
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
      intro: "Тази страница описва използваното локално съхранение и възможните бисквитки от външни услуги.",
      sections: [
        ["1. Локално съхранение", "Сайтът използва localStorage в браузъра за запазване на избрания език. Това позволява предпочитанието да се запази между отделните посещения."],
        ["2. Google Analytics", "Когато е конфигуриран идентификатор за Google Analytics, сайтът зарежда услугата за статистика на посещенията. Google Analytics може да използва бисквитки или други технически идентификатори за измерване на трафика и начина на използване на сайта."],
        ["3. Google Maps", "Страницата за контакти съдържа вградена Google карта. При зареждането ѝ Google може да получи технически данни за заявката и да приложи собствените си настройки за бисквитки и поверителност."],
        ["4. Управление и изтриване", "Можете да изтриете бисквитки и локално съхранени данни от настройките на браузъра. Ограничаването на определени технологии може да повлияе на статистиката или на вградените услуги, но основното съдържание на сайта остава достъпно."],
        ["5. Промени в политиката", "При добавяне или премахване на аналитични, рекламни или други външни услуги тази политика може да бъде актуализирана, за да отразява реално използваните технологии."],
      ],
      related: "За повече информация относно обработването на лични данни вижте политиката за поверителност.",
      relatedHref: "/privacy",
      relatedLabel: "Политика за поверителност",
    },
    en: {
      eyebrow: "Elenski Balkandzhii · Information",
      title: "Cookie Policy",
      intro: "This page describes browser storage used by the website and possible cookies from external services.",
      sections: [
        ["1. Local storage", "The website uses browser localStorage to remember the selected language. This allows the preference to persist between visits."],
        ["2. Google Analytics", "When a Google Analytics measurement ID is configured, the website loads the analytics service for visit statistics. Google Analytics may use cookies or other technical identifiers to measure traffic and website usage."],
        ["3. Google Maps", "The contact page contains an embedded Google map. When it loads, Google may receive technical request data and apply its own cookie and privacy settings."],
        ["4. Managing and deleting data", "You can delete cookies and locally stored website data from your browser settings. Restricting some technologies may affect analytics or embedded services, while the website's main content remains available."],
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
        <div className="mx-auto w-[min(980px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,980px)]">
          <span className="text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">{data.eyebrow}</span>
          <h1 className="mt-3 text-[clamp(38px,6vw,64px)] font-black uppercase leading-[.95] tracking-[-.02em]">{data.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#665c55]">{data.intro}</p>
        </div>
      </header>
      <div className="mx-auto grid w-[min(980px,calc(100%_-_40px))] gap-8 py-16 max-[620px]:w-[min(100%_-_28px,980px)] max-[620px]:py-12">
        {data.sections.map(([title, text]) => (
          <section key={title} className="border-b border-[#e4ddd7] pb-8 last:border-b-0">
            <h2 className="text-2xl font-black tracking-[-.01em]">{title}</h2>
            <p className="mt-3 text-[16px] leading-8 text-[#665c55]">{text}</p>
          </section>
        ))}
        <section className="rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] p-6">
          <p className="text-[15px] leading-7 text-[#665c55]">{data.related}</p>
          <Link href={localizedHref} className="mt-3 inline-block font-bold text-[#08733a] hover:underline">{data.relatedLabel}</Link>
        </section>
      </div>
    </main>
  );
}
