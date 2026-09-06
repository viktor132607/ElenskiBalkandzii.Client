export default function AboutPage() {
  const rows = [
    ["Произход", "Продукти от Еленския Балкан."],
    ["Подправки", "За направата им се използват само натурални подправки."],
    ["Месо", "Използва се единствено българско месо."],
  ];

  return (
    <section className="min-h-[68vh] bg-white py-[72px] max-[620px]:py-[48px]">
      <div className="mx-auto grid w-[min(1420px,calc(100%_-_40px))] gap-10 lg:grid-cols-[minmax(0,1fr)_688px] max-[620px]:w-[min(100%_-_28px,1420px)]">
        <div className="flex flex-col justify-center">
          <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">За нас</span>
          <h1 className="mb-6 text-[clamp(50px,7vw,88px)] font-black uppercase leading-[.95] tracking-[.01em] max-[620px]:text-[clamp(40px,13vw,62px)]">Вкус с корен.</h1>
          <p className="mb-8 max-w-[760px] text-[clamp(18px,2vw,22px)] leading-[1.65] text-[#716861] max-[620px]:text-base">
            Магазини &quot;Еленски Балканджии&quot; предлагат на своите клиенти продукти от Еленския Балкан, съдържащи само натурални подправки. За направата им се използва единствено българско месо.
          </p>

          <div className="mt-[28px] border-t border-[#e4ddd7] max-[620px]:mt-9">
            {rows.map(([label, copy]) => (
              <div key={label} className="grid grid-cols-[180px_minmax(0,1fr)] gap-7 border-b border-[#e4ddd7] py-6 max-[820px]:grid-cols-1 max-[820px]:gap-2">
                <strong className="font-black uppercase text-[#08733a]">{label}</strong>
                <span className="leading-[1.65] text-[#716861]">{copy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[688px] w-[688px] overflow-hidden rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] max-[1100px]:h-auto max-[1100px]:w-full max-[1100px]:aspect-square">
          <img
            src="/593663067_122100551799145268_2918894313617910344_n.jpg"
            alt="Еленски Балканджии"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
