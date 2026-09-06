const workingHours = [
  ["Понеделник", "09:00–20:00"],
  ["Вторник", "09:00–20:00"],
  ["Сряда", "09:00–20:00"],
  ["Четвъртък", "09:00–20:00"],
  ["Петък", "09:00–20:00"],
  ["Събота", "09:00–18:00"],
  ["Неделя", "09:00–14:00"],
];

export default function ContactPage() {
  return (
    <section className="min-h-[68vh] bg-white py-[72px] max-[620px]:py-[48px]">
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-10 lg:grid-cols-[0.9fr_1.1fr] max-[620px]:w-[min(100%_-_28px,1180px)]">
        <div className="flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
            <img
              src="/logo-elenski.jpg"
              alt="Еленски Балканджии"
              className="h-28 w-28 shrink-0 rounded-full border border-[#d9d1ca] bg-white object-cover max-[620px]:h-24 max-[620px]:w-24"
            />
            <div>
              <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">
                Контакти
              </span>
              <h1 className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">
                Еленски Балканджии
              </h1>
            </div>
          </div>

          <div className="divide-y divide-[#e4ddd7] border-y border-[#e4ddd7]">
            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
              <strong className="font-black uppercase text-[#08733a]">Адрес</strong>
              <span className="text-lg leading-[1.65] text-[#514943]">
                ж.к. Родина 3, ул. „Шипка“ 12, 7012 Русе
              </span>
            </div>

            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
              <strong className="font-black uppercase text-[#08733a]">Телефон</strong>
              <a
                href="tel:+359878788897"
                className="text-lg font-bold text-[#211915] transition-colors hover:text-[#08733a]"
              >
                087 878 8897
              </a>
            </div>

            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-3">
              <strong className="font-black uppercase text-[#08733a]">Работно време</strong>
              <div className="space-y-2 text-[#514943]">
                {workingHours.map(([day, hours]) => (
                  <div key={day} className="flex max-w-[360px] items-center justify-between gap-6 border-b border-[#eee9e4] pb-2 last:border-0 last:pb-0">
                    <span>{day}</span>
                    <span className="font-semibold text-[#211915]">{hours}</span>
                  </div>
                ))}
                <p className="pt-2 text-sm text-[#8a817a]">
                  По празници работното време може да бъде различно.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef]">
          <img
            src="/713204707_122129263227145268_2373551330353913854_n.jpg"
            alt="Магазин Еленски Балканджии в Русе"
            className="h-full min-h-[460px] w-full object-cover max-[820px]:min-h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
