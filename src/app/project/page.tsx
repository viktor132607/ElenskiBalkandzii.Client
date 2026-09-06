const categories = [
  {
    id: "meso",
    title: "Месо",
    ribbon: "bg-[#cf2428] text-white",
    items: [
      ["Прясно", "Свинско месо", "Място за актуални разфасовки, грамажи, цени и наличности."],
      ["Скара", "Кюфтета и кебапчета", "Прясно приготвени предложения за скара и домашната трапеза."],
      ["Класика", "Наденички", "Традиционни и сезонни предложения, готови за реален каталог."],
    ],
  },
  {
    id: "mezeta",
    title: "Мезета",
    ribbon: "bg-[#0b9c4a] text-white",
    items: [
      ["Сушено", "Суджуци и луканки", "Класически сухи колбаси и традиционни балкански вкусове."],
      ["Селекция", "Сушени меса", "Подходящи за плато, аперитив, гости и подаръчни комбинации."],
      ["Комбо", "Мезе плата", "Комбинирани селекции от различни продукти за споделяне."],
    ],
  },
  {
    id: "sirena",
    title: "Сирена",
    ribbon: "bg-[#d8b66b] text-[#2b211c]",
    items: [
      ["Класика", "Бяло сирене", "Подбрани предложения за ежедневната и празничната трапеза."],
      ["Подбор", "Кашкавал", "Категория за различни разфасовки, марки и сезонни предложения."],
      ["Комбинация", "Сирена за плато", "Подходящи допълнения към месата, мезетата и подаръчните селекции."],
    ],
  },
];

export default function ProjectPage() {
  return (
    <section className="min-h-[68vh] bg-white py-[92px] pt-[104px] max-[1100px]:py-20 max-[820px]:min-h-0 max-[820px]:py-[68px] max-[820px]:pt-[76px] max-[620px]:py-[54px]">
      <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
        <div className="mb-[58px] max-w-[760px]">
          <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">Продукти</span>
          <h1 className="mb-6 max-w-[900px] text-[clamp(50px,7vw,88px)] font-black uppercase leading-[.95] tracking-[.01em] max-[620px]:text-[clamp(40px,13vw,62px)]">Подбрано за трапезата</h1>
          <p className="text-[17px] leading-[1.7] text-[#716861] max-[620px]:text-base">Категориите са готови за реални артикули, снимки, цени и наличности от магазина.</p>
        </div>

        {categories.map((category) => (
          <div key={category.id} id={category.id} className="mb-[72px] scroll-mt-[220px]">
            <div className={`mb-[22px] inline-block min-w-[230px] px-7 py-3 text-[34px] font-black uppercase tracking-[.04em] [clip-path:polygon(0_7%,94%_0,100%_84%,4%_100%,0_88%)] max-[620px]:min-w-[190px] max-[620px]:text-[28px] ${category.ribbon}`}>
              {category.title}
            </div>

            <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
              {category.items.map(([label, title, copy], index) => (
                <article
                  key={title}
                  className={`min-h-[250px] border border-[#e4ddd7] border-t-[6px] bg-white p-7 max-[820px]:min-h-0 ${index === 0 ? "border-t-[#cf2428]" : index === 1 ? "border-t-[#0b9c4a]" : "border-t-[#d6b36d]"}`}
                >
                  <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#cf2428]">{label}</span>
                  <h3 className="mb-[10px] text-[26px] font-black uppercase tracking-[.02em] max-[620px]:text-[22px]">{title}</h3>
                  <p className="leading-[1.65] text-[#716861]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
