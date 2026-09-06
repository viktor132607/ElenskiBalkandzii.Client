import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#211914] pb-6 text-white">
      <div className="h-[5px] bg-[linear-gradient(90deg,#0b9c4a_0_33.333%,#fff_33.333%_66.666%,#cf2428_66.666%_100%)]" aria-hidden="true" />

      <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] grid-cols-[1.6fr_1fr_1fr] gap-12 pt-[72px] max-[1100px]:grid-cols-[1.3fr_1fr_1fr] max-[1100px]:gap-8 max-[820px]:grid-cols-2 max-[820px]:gap-[34px] max-[620px]:w-[min(1180px,calc(100%_-_32px))] max-[620px]:grid-cols-1 max-[620px]:pt-14">
        <div className="max-[820px]:col-span-2 max-[620px]:col-span-1">
          <div className="text-[28px] font-black uppercase tracking-[-0.02em]">Еленски Балканджии</div>
        </div>

        <div>
          <div className="mb-[18px] text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#a99d95]">Навигация</div>
          <div className="grid gap-3 text-sm text-[#efe9e5]">
            <Link className="hover:text-white" href="/">Начало</Link>
            <Link className="hover:text-white" href="/project#meso">Месо</Link>
            <Link className="hover:text-white" href="/project#mezeta">Мезета</Link>
            <Link className="hover:text-white" href="/project#sirena">Сирена</Link>
          </div>
        </div>

        <div>
          <div className="mb-[18px] text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#a99d95]">Информация</div>
          <div className="grid gap-3 text-sm text-[#efe9e5]">
            <Link className="hover:text-white" href="/about">За нас</Link>
            <Link className="hover:text-white" href="/contact">Контакти</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 w-[min(1180px,calc(100%_-_40px))] border-t border-[#463a33] pt-[22px] text-xs text-[#a99d95] max-[620px]:w-[min(1180px,calc(100%_-_32px))] max-[620px]:mt-[38px]">
        © {new Date().getFullYear()} Еленски Балканджии
      </div>
    </footer>
  );
}
