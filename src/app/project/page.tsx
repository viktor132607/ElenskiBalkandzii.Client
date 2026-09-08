"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ProjectPage() {
  const { language } = useLanguage();
  const categories = language === "bg" ? [
    { id: "meso", title: "Месо", ribbon: "bg-[#cf2428] text-white", items: ["Свинско месо", "Кюфтета и кебапчета", "Наденички"] },
    { id: "mezeta", title: "Мезета", ribbon: "bg-[#0b9c4a] text-white", items: ["Суджуци и луканки", "Сушени меса", "Мезе плата"] },
    { id: "sirena", title: "Сирена", ribbon: "bg-[#d8b66b] text-[#2b211c]", items: ["Бяло сирене", "Кашкавал", "Сирена за плато"] },
  ] : [
    { id: "meso", title: "Meat", ribbon: "bg-[#cf2428] text-white", items: ["Pork", "Meatballs and kebapche", "Sausages"] },
    { id: "mezeta", title: "Delicacies", ribbon: "bg-[#0b9c4a] text-white", items: ["Sudzhuk and lukanka", "Dried meats", "Delicacy platters"] },
    { id: "sirena", title: "Cheese", ribbon: "bg-[#d8b66b] text-[#2b211c]", items: ["White brined cheese", "Kashkaval", "Cheese for platters"] },
  ];

  return (
    <section className="min-h-[68vh] bg-white py-[92px] pt-[104px] max-[1100px]:py-20 max-[820px]:min-h-0 max-[820px]:py-[68px] max-[820px]:pt-[76px] max-[620px]:py-[54px]">
      <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
        {categories.map((category) => (
          <div key={category.id} id={category.id} className="mb-[72px] scroll-mt-[220px]">
            <div className={`mb-[22px] inline-block min-w-[230px] px-7 py-3 text-[34px] font-black uppercase tracking-[.04em] [clip-path:polygon(0_7%,94%_0,100%_84%,4%_100%,0_88%)] max-[620px]:min-w-[190px] max-[620px]:text-[28px] ${category.ribbon}`}>{category.title}</div>
            <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
              {category.items.map((title, index) => (
                <article key={title} className={`flex min-h-[180px] items-center border border-[#e4ddd7] border-t-[6px] bg-white p-7 max-[820px]:min-h-[140px] ${index === 0 ? "border-t-[#cf2428]" : index === 1 ? "border-t-[#0b9c4a]" : "border-t-[#d6b36d]"}`}>
                  <h2 className="text-[26px] font-black uppercase tracking-[.02em] max-[620px]:text-[22px]">{title}</h2>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
