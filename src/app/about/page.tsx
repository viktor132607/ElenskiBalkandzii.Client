export default function AboutPage() {
  const rows = [
    ["Произход", "Продукти от Еленския Балкан."],
    ["Подправки", "За направата им се използват само натурални подправки."],
    ["Месо", "Използва се единствено българско месо."],
  ];

  return (
    <section className="min-h-[68vh] bg-white py-[72px] max-[620px]:py-[48px]">
      <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-10 lg:grid-cols-[minmax(0,1fr)_728px] max-[620px]:w-[min(100%_-_28px,1460px)]">
        <div className="flex flex-col pt-6 max-[1100px]:pt-0">
          <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
            <img
              src="/588283015_25323651390578829_4300945585916792863_n.jpg"
              alt="Еленски Балканджии"
              className="h-28 w-28 shrink-0 rounded-full border border-[#d9d1ca] bg-white object-cover max-[620px]:h-24 max-[620px]:w-24"
            />
            <div>
              <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">
                За нас
              </span>
              <h1 className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">
                Вкус с корен.
              </h1>
            </div>
          </div>

          <p className="mb-8 max-w-[760px] text-lg leading-[1.65] text-[#514943] max-[620px]:text-base">
            Магазини &quot;Еленски Балканджии&quot; предлагат на своите клиенти продукти от Еленския Балкан, съдържащи само натурални подправки. За направата им се използва единствено българско месо.
          </p>

          <div className="divide-y divide-[#e4ddd7] border-y border-[#e4ddd7]">
            {rows.map(([label, copy]) => (
              <div key={label} className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
                <strong className="font-black uppercase text-[#08733a]">{label}</strong>
                <span className="leading-[1.65] text-[#514943]">{copy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[688px] w-[728px] overflow-hidden rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef] max-[1100px]:h-auto max-[1100px]:w-full max-[1100px]:aspect-[728/688]">
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
