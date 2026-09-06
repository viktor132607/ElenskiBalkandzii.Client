import { logoDataUri } from "@/lib/logoAsset";
import { shopDataUri } from "@/lib/shopAsset";

export default function ContactPage() {
  return (
    <section className="min-h-[68vh] bg-white py-[72px] max-[620px]:py-[48px]">
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-10 lg:grid-cols-[0.9fr_1.1fr] max-[620px]:w-[min(100%_-_28px,1180px)]">
        <div className="flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
            <img
              src={logoDataUri}
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

          <div className="border-y border-[#e4ddd7] py-6">
            <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
              <strong className="font-black uppercase text-[#08733a]">Адрес</strong>
              <span className="text-lg leading-[1.65] text-[#514943]">
                ж.к. Родина 3, ул. „Шипка“ 12, 7012 Русе
              </span>
            </div>
          </div>

          <p className="mt-6 max-w-[560px] text-base leading-7 text-[#716861]">
            Посетете магазина за прясно месо, мезета и сирена. За телефон и работно време може да добавим отделни полета, когато ми ги дадеш.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e4ddd7] bg-[#f6f3ef]">
          <img
            src={shopDataUri}
            alt="Магазин Еленски Балканджии в Русе"
            className="h-full min-h-[460px] w-full object-cover max-[820px]:min-h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
