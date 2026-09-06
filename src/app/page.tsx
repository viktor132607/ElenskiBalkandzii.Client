import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-white py-[92px] max-[1100px]:py-20 max-[820px]:py-[68px] max-[620px]:py-[54px]">
      <div className="mx-auto w-[min(1180px,calc(100%_-_40px))] max-[620px]:w-[min(1180px,calc(100%_-_28px))]">
        <div className="mb-10">
          <span className="mb-[18px] inline-block text-[11px] font-black uppercase tracking-[.16em] text-[#08733a]">Еленски Балканджии</span>
          <h1 className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em] text-[#211915]">Вкусът на Балкана</h1>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[820px]:grid-cols-1">
          <Link href="/project#meso" className="relative min-h-[210px] overflow-hidden border border-[#e4ddd7] border-t-[6px] border-t-[#cf2428] bg-white p-7 transition-transform hover:-translate-y-[3px]">
            <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#cf2428]">Месо</span>
            <h2 className="text-[30px] font-black uppercase tracking-[.02em] max-[620px]:text-[24px]">Месо</h2>
            <b className="mt-8 inline-block text-[13px] uppercase">Виж продуктите →</b>
          </Link>

          <Link href="/project#mezeta" className="relative min-h-[210px] overflow-hidden border border-[#e4ddd7] border-t-[6px] border-t-[#0b9c4a] bg-white p-7 transition-transform hover:-translate-y-[3px]">
            <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#08733a]">Мезета</span>
            <h2 className="text-[30px] font-black uppercase tracking-[.02em] max-[620px]:text-[24px]">Мезета</h2>
            <b className="mt-8 inline-block text-[13px] uppercase">Виж продуктите →</b>
          </Link>

          <Link href="/project#sirena" className="relative min-h-[210px] overflow-hidden border border-[#e4ddd7] border-t-[6px] border-t-[#d4b36d] bg-[#fffdf7] p-7 transition-transform hover:-translate-y-[3px] max-[1100px]:col-span-2 max-[820px]:col-span-1">
            <span className="mb-9 inline-block text-xs font-black uppercase tracking-[.12em] text-[#8b692c]">Сирена</span>
            <h2 className="text-[30px] font-black uppercase tracking-[.02em] max-[620px]:text-[24px]">Сирена</h2>
            <b className="mt-8 inline-block text-[13px] uppercase">Виж продуктите →</b>
          </Link>
        </div>
      </div>
    </section>
  );
}
