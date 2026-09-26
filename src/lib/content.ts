export type CatalogProduct = { id: string; title: string; description: string; image: string; visible: boolean };
export type CatalogCategory = { id: string; title: string; description: string; image: string; visible: boolean; items: CatalogProduct[] };

export type LocaleContent = {
  home: { eyebrow: string; title: string; view: string };
  about: { eyebrow: string; title: string; copy: string; rows: { label: string; copy: string }[] };
  contact: { heading: string; address: string; phone: string; note: string; hours: { day: string; hours: string }[] };
  products: { categories: CatalogCategory[] };
};
export type SiteContent = { bg: LocaleContent; en: LocaleContent; media: { logo: string; store: string; products: string } };
export const defaults: SiteContent = {
  media: { logo: '/elenski-balkandzhii-logo.jpg', store: '/elenski-balkandzhii-store-ruse.jpg', products: '/elenski-balkandzhii-traditional-products.jpg' },
  bg: {
    home: { eyebrow: 'Еленски Балканджии', title: 'Вкусът на Балкана', view: 'Виж продуктите →' },
    about: { eyebrow: 'За нас', title: 'Вкус с корен.', copy: 'Магазини "Еленски Балканджии" предлагат на своите клиенти продукти от Еленския Балкан, съдържащи само натурални подправки. За направата им се използва единствено българско месо.', rows: [{ label: 'Произход', copy: 'Продукти от Еленския Балкан.' }, { label: 'Подправки', copy: 'За направата им се използват само натурални подправки.' }, { label: 'Месо', copy: 'Използва се единствено българско месо.' }] },
    contact: { heading: 'Еленски Балканджии — Контакти', address: 'ж.к. Родина 3, ул. „Шипка“ 12, 7012 Русе', phone: '087 878 8897', note: 'По празници работното време може да бъде различно.', hours: [{day:'Понеделник',hours:'09:00–20:00'},{day:'Вторник',hours:'09:00–20:00'},{day:'Сряда',hours:'09:00–20:00'},{day:'Четвъртък',hours:'09:00–20:00'},{day:'Петък',hours:'09:00–20:00'},{day:'Събота',hours:'09:00–18:00'},{day:'Неделя',hours:'09:00–14:00'}] },
    products: { categories: [
      { id: 'meso', title: 'Месо', description: 'Разгледайте асортимента от месо в нашия магазин.', image: '', visible: true, items: [
        { id: 'pork', title: 'Свинско месо', description: '', image: '', visible: true },
        { id: 'meatballs', title: 'Кюфтета и кебапчета', description: '', image: '', visible: true },
        { id: 'sausages', title: 'Наденички', description: '', image: '', visible: true }] },
      { id: 'mezeta', title: 'Мезета', description: 'Традиционни мезета и сушени месни продукти.', image: '', visible: true, items: [
        { id: 'sudzhuk', title: 'Суджуци и луканки', description: '', image: '', visible: true },
        { id: 'dried', title: 'Сушени меса', description: '', image: '', visible: true },
        { id: 'platters', title: 'Мезе плата', description: '', image: '', visible: true }] },
      { id: 'sirena', title: 'Сирена', description: 'Сирена и кашкавал за вашата трапеза.', image: '', visible: true, items: [
        { id: 'white', title: 'Бяло сирене', description: '', image: '', visible: true },
        { id: 'kashkaval', title: 'Кашкавал', description: '', image: '', visible: true },
        { id: 'cheese-platter', title: 'Сирена за плато', description: '', image: '', visible: true }] }
    ] }
  },
  en: {
    home: { eyebrow: 'Elenski Balkandzhii', title: 'The taste of the Balkan', view: 'View products →' },
    about: { eyebrow: 'About us', title: 'Taste with roots.', copy: 'Elenski Balkandzhii stores offer products from the Elena Balkan region, made only with natural spices. Only Bulgarian meat is used in their preparation.', rows: [{label:'Origin',copy:'Products from the Elena Balkan region.'},{label:'Spices',copy:'Only natural spices are used in their preparation.'},{label:'Meat',copy:'Only Bulgarian meat is used.'}] },
    contact: { heading: 'Elenski Balkandzhii — Contacts', address: 'Rodina 3, 12 Shipka St., 7012 Ruse, Bulgaria', phone: '087 878 8897', note: 'Opening hours may vary on public holidays.', hours: [{day:'Monday',hours:'09:00–20:00'},{day:'Tuesday',hours:'09:00–20:00'},{day:'Wednesday',hours:'09:00–20:00'},{day:'Thursday',hours:'09:00–20:00'},{day:'Friday',hours:'09:00–20:00'},{day:'Saturday',hours:'09:00–18:00'},{day:'Sunday',hours:'09:00–14:00'}] },
    products: { categories: [
      { id: 'meso', title: 'Meat', description: 'Explore the selection of meat in our store.', image: '', visible: true, items: [
        { id: 'pork', title: 'Pork', description: '', image: '', visible: true },
        { id: 'meatballs', title: 'Meatballs and kebapche', description: '', image: '', visible: true },
        { id: 'sausages', title: 'Sausages', description: '', image: '', visible: true }] },
      { id: 'mezeta', title: 'Delicacies', description: 'Traditional delicacies and cured meats.', image: '', visible: true, items: [
        { id: 'sudzhuk', title: 'Sudzhuk and lukanka', description: '', image: '', visible: true },
        { id: 'dried', title: 'Dried meats', description: '', image: '', visible: true },
        { id: 'platters', title: 'Delicacy platters', description: '', image: '', visible: true }] },
      { id: 'sirena', title: 'Cheese', description: 'Cheese and kashkaval for your table.', image: '', visible: true, items: [
        { id: 'white', title: 'White brined cheese', description: '', image: '', visible: true },
        { id: 'kashkaval', title: 'Kashkaval', description: '', image: '', visible: true },
        { id: 'cheese-platter', title: 'Cheese for platters', description: '', image: '', visible: true }] }
    ] }
  }
};

export function normalizeContent(value: unknown): SiteContent | null {
  if (!value || typeof value !== 'object') return null;
  try {
    const site = value as SiteContent;
    if (!(['logo', 'store', 'products'] as const).every(key => typeof site.media[key] === 'string')) return null;
    for (const lang of ['bg', 'en'] as const) {
      const section = site[lang];
      if (typeof section.home.title !== 'string' || typeof section.about.copy !== 'string' ||
          !Array.isArray(section.contact.hours) || !Array.isArray(section.products.categories)) return null;
    }
    // Convert content saved before product details were introduced.
    if (site.bg.products.categories.some(category => !category.id)) {
      const converted = structuredClone(site);
      for (const lang of ['bg', 'en'] as const) {
        converted[lang].products.categories = converted[lang].products.categories.map((category, index) => ({
          id: ['meso', 'mezeta', 'sirena'][index] ?? `category-${index}`,
          title: category.title, description: '', image: '', visible: true,
          items: (category.items as unknown as string[]).map((title, itemIndex) => ({
            id: `item-${index}-${itemIndex}`, title, description: '', image: '', visible: true,
          })),
        }));
      }
      return converted;
    }
    if (site.bg.products.categories.length !== site.en.products.categories.length) return null;
    for (let index = 0; index < site.bg.products.categories.length; index++) {
      const bg = site.bg.products.categories[index];
      const en = site.en.products.categories[index];
      if (bg.id !== en.id || !Array.isArray(bg.items) || bg.items.length !== en.items.length) return null;
      for (let item = 0; item < bg.items.length; item++) {
        if (bg.items[item].id !== en.items[item].id || typeof bg.items[item].title !== 'string' || typeof en.items[item].title !== 'string') return null;
      }
    }
    return site;
  } catch { return null; }
}

export function validContent(value: unknown): value is SiteContent {
  return normalizeContent(value) === value;
}
