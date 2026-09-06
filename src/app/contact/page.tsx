export default function ContactPage() {
  const rows = [
    ["Телефон", "Предстои добавяне"],
    ["Адрес", "Предстои добавяне"],
    ["Работно време", "Предстои добавяне"],
  ];

  return (
    <section className="min-h-[68vh] bg-white py-[92px] pt-[104px] max-[820px]:min-h-0 max-[820px]:pt-[76px] max-[620px]:py-[54px]">
      <div className="mx-auto w-[min(820px,calc(100%_-_40px))] max-[620px]:w-[min(820px,calc(100%_-_28px))]">
        <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">Контакти</span>
        <h1 className="mb-6 text-[clamp(50px,7vw,88px)] font-black uppercase leading-[.95] tracking-[.01em] max-[620px]:text-[clamp(40px,13vw,62px)]">Поръчки и наличности</h1>
        <p className="mb-8 max-w-[760px] text-[clamp(18px,2vw,22px)] leading-[1.65] text-[#716861] max-[620px]:text-base">
          Страницата е подготвена за реалните контакти на магазина, работно време, адрес и информация за поръчки.
        </p>

        <div className="mt-[52px] border-t border-[#e4ddd7] max-[620px]:mt-9">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[180px_minmax(0,1fr)] gap-7 border-b border-[#e4ddd7] py-6 max-[820px]:grid-cols-1 max-[820px]:gap-2">
              <strong className="font-black uppercase text-[#08733a]">{label}</strong>
              <span className="leading-[1.65] text-[#716861]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
