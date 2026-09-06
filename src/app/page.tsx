import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-white py-11 pb-[72px] max-[820px]:pt-7 max-[620px]:pb-14">
        <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
          <div className="relative grid min-h-[650px] grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)] gap-10 overflow-hidden border-[8px] border-[#17120f] bg-[#342117] bg-[linear-gradient(rgba(24,13,8,.08),rgba(24,13,8,.08)),repeating-linear-gradient(90deg,#3a2418_0,#3a2418_110px,#21130d_110px,#21130d_114px,#4b2d1d_114px,#4b2d1d_226px,#24150f_226px,#24150f_230px)] px-[58px] pt-[58px] pb-[92px] text-white max-[1100px]:min-h-[610px] max-[1100px]:grid-cols-[1fr_.8fr] max-[1100px]:px-[42px] max-[1100px]:pt-[46px] max-[1100px]:pb-[86px] max-[820px]:min-h-0 max-[820px]:grid-cols-1 max-[820px]:px-[30px] max-[820px]:pt-[38px] max-[820px]:pb-[86px] max-[620px]:border-[5px] max-[620px]:px-5 max-[620px]:pt-7 max-[620px]:pb-[82px] max-[420px]:px-4">
            <div className="relative z-10 flex flex-col items-start">
              <span className="text-[clamp(54px,6.5vw,92px)] font-black uppercase leading-[.9] tracking-[.02em] max-[620px]:text-[clamp(44px,15vw,70px)]">
                Прясно
              </span>

              <h1 className="mt-1 mb-[14px] flex max-w-none flex-col text-[clamp(68px,8vw,118px)] font-black uppercase leading-[.82] tracking-[-.02em] max-[620px]:text-[clamp(58px,19vw,90px)]">
                <span className="text-[#cf2428]">Българско</span>
                <strong className="font-black text-white">Месо</strong>
              </h1>

              <div className="my-1 mb-7 bg-[#0b9c4a] px-7 py-[10px] font-serif text-[clamp(22px,2.4vw,34px)] italic [clip-path:polygon(2%_14%,98%_0,100%_77%,4%_100%,0_52%)] [transform:rotate(-2deg)] max-[620px]:px-5 max-[620px]:text-[22px]">
                Всеки ден за вас!
              </div>

              <div className="mt-1 grid w-[min(100%,430px)] gap-3 max-[620px]:w-full">
                {['Кюфтета', 'Кебапчета', 'Наденички', 'Прясно месо'].map((item) => (
                  <span
                    key={item}
                    className="block bg-[#cf2428] px-[22px] py-3 text-[clamp(24px,2.4vw,36px)] font-black uppercase tracking-[.035em] [clip-path:polygon(0_6%,94%_0,100%_82%,5%_100%,0_86%)] max-[620px]:text-[clamp(22px,7vw,30px)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3 max-[620px]:w-full max-[620px]:flex-col">
                <Link className="inline-flex min-h-12 items-center justify-center border-2 border-[#cf2428] bg-[#cf2428] px-[22px] text-[15px] font-black uppercase tracking-[.04em] text-white transition-colors hover:border-[#a8181d] hover:bg-[#a8181d] max-[620px]:w-full" href="/project#meso">
                  Разгледай продуктите
                </Link>
                <Link className="inline-flex min-h-12 items-center justify-center border-2 border-white bg-white px-[22px] text-[15px] font-black uppercase tracking-[.04em] text-[#2b211c] transition-colors hover:text-[#08733a] max-[620px]:w-full" href="/contact">
                  Поръчки и наличности
                </Link>
              </div>
            </div>

            <div className="relative z-10 flex min-h-[500px] items-center justify-center max-[820px]:min-h-[380px] max-[620px]:min-h-[300px]">
              <div className="flex aspect-[1.05/1] w-[min(100%,470px)] flex-col items-center justify-center gap-[10px] rounded-[18px] border-[3px] border-dashed border-white/75 bg-[radial-gradient(circle_at_70%_30%,rgba(207,36,40,.22),transparent_28%),radial-gradient(circle_at_34%_70%,rgba(11,156,74,.22),transparent_30%),rgba(255,255,255,.06)] text-center max-[420px]:aspect-[1/1.05]">
                <span className="text-[clamp(26px,3vw,42px)] font-black uppercase tracking-[.04em]">СНИМКА НА ПРОДУКТИ</span>
                <small className="text-sm uppercase tracking-[.12em] text-white/80">месо · мезета · сирена</small>
              </div>

              <div className="absolute right-1 bottom-[26px] flex h-[150px] w-[150px] rotate-[4deg] flex-col items-center justify-center rounded-full border-[8px] border-white bg-[#cf2428] text-center outline-[7px] outline-[#cf2428] max-[1100px]:h-[130px] max-[1100px]:w-[130px] max-[820px]:right-[10px] max-[820px]:bottom-[30px] max-[620px]:h-[104px] max-[620px]:w-[104px] max-[620px]:border-[6px] max-[620px]:outline-[5px]">
                <strong className="text-[34px] leading-none max-[620px]:text-[25px]">100%</strong>
                <span className="mt-[7px] w-[100px] text-[11px] font-black uppercase max-[620px]:w-[78px] max-[620px]:text-[9px]">гарантирано качество</span>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 left-0 z-20 flex min-h-[60px] flex-wrap items-center justify-center gap-[13px] bg-[rgba(16,10,7,.88)] px-7 py-[10px] text-[clamp(24px,3vw,42px)] font-black uppercase tracking-[.04em] max-[620px]:min-h-[54px] max-[620px]:gap-[9px] max-[620px]:px-3 max-[620px]:text-[clamp(20px,6vw,28px)]">
              <span>Прясно</span>
              <i className="h-3 w-3 rounded-full border-2 border-white bg-[#0b9c4a] max-[620px]:h-[9px] max-[620px]:w-[9px]" />
              <span className="text-[#19b961]">Чисто</span>
              <i className="h-3 w-3 rounded-full border-2 border-white bg-[#cf2428] max-[620px]:h-[9px] max-[620px]:w-[9px]" />
              <span>Вкусно</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[92px] max-[1100px]:py-20 max-[820px]:py-[68px] max-[620px]:py-[54px]">
        <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
          <div className="mb-10 grid grid-cols-[1.1fr_.9fr] items-end gap-[54px] max-[820px]:grid-cols-1 max-[820px]:gap-7">
            <div>
              <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">Еленски Балканджии</span>
              <h2 className="mb-[18px] text-[clamp(34px,4vw,56px)] font-black uppercase leading-[.98] tracking-[.01em] max-[620px]:text-[clamp(32px,10vw,46px)]">Вкусът на Балкана</h2>
            </div>
            <p className="mb-1 text-[17px] leading-[1.7] text-[#716861] max-[620px]:text-base">Прясно месо, традиционни мезета и подбрани сирена в изчистена селекция.</p>
          </div>

          <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
            <Link href="/project#meso" className="relative min-h-[250px] overflow-hidden border border-[#e4ddd7] border-t-[6px] border-t-[#cf2428] bg-white p-7 transition-transform hover:-translate-y-[3px]">
              <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#cf2428]">Месо</span>
              <h3 className="mb-[10px] text-[26px] font-black uppercase tracking-[.02em] max-[620px]:text-[22px]">Прясна селекция</h3>
              <p className="leading-[1.65] text-[#716861]">Месо за скара, домашната кухня и ежедневната трапеза.</p>
              <b className="mt-6 inline-block text-[13px] uppercase">Виж продуктите →</b>
            </Link>

            <Link href="/project#mezeta" className="relative min-h-[250px] overflow-hidden border border-[#e4ddd7] border-t-[6px] border-t-[#0b9c4a] bg-white p-7 transition-transform hover:-translate-y-[3px]">
              <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#08733a]">Мезета</span>
              <h3 className="mb-[10px] text-[26px] font-black uppercase tracking-[.02em] max-[620px]:text-[22px]">Балкански вкус</h3>
              <p className="leading-[1.65] text-[#716861]">Суджуци, луканки, сушени меса и селекции за споделяне.</p>
              <b className="mt-6 inline-block text-[13px] uppercase">Виж продуктите →</b>
            </Link>

            <Link href="/project#sirena" className="relative min-h-[250px] overflow-hidden border border-[#e4ddd7] border-t-[6px] border-t-[#d4b36d] bg-[#fffdf7] p-7 transition-transform hover:-translate-y-[3px] max-[1100px]:col-span-2 max-[820px]:col-span-1">
              <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#8b692c]">Сирена</span>
              <h3 className="mb-[10px] text-[26px] font-black uppercase tracking-[.02em] max-[620px]:text-[22px]">За добрата трапеза</h3>
              <p className="leading-[1.65] text-[#716861]">Подбрани сирена и допълнения към месата и мезетата.</p>
              <b className="mt-6 inline-block text-[13px] uppercase">Виж продуктите →</b>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative border-t border-[#e4ddd7] bg-[#f6f3ef] py-[92px] before:absolute before:top-0 before:left-0 before:h-[7px] before:w-full before:bg-[linear-gradient(90deg,#0b9c4a_0_33.333%,#fff_33.333%_66.666%,#cf2428_66.666%_100%)] max-[1100px]:py-20 max-[820px]:py-[68px] max-[620px]:py-[54px]">
        <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] grid-cols-2 items-start gap-16 max-[820px]:grid-cols-1 max-[820px]:gap-7 max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
          <div>
            <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">Български характер</span>
            <h2 className="mb-[18px] text-[clamp(34px,4vw,56px)] font-black uppercase leading-[.98] tracking-[.01em] max-[620px]:text-[clamp(32px,10vw,46px)]">Традиционно усещане. Чист сайт.</h2>
          </div>
          <div>
            <p className="text-[17px] leading-[1.7] text-[#716861] max-[620px]:text-base">
              Визията използва дървесни тонове, силно червено, българско зелено и едри надписи, вдъхновени от реалната идентичност на магазина, а съдържанието остава чисто и лесно за разглеждане.
            </p>
            <Link className="mt-[10px] inline-block border-b-2 border-[#cf2428] pb-1 font-black text-[#08733a]" href="/about">Повече за магазина →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
