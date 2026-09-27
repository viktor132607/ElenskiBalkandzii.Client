export type CatalogProduct = { id: string; title: string; description: string; image: string; visible: boolean };
export type CatalogCategory = { id: string; title: string; description: string; image: string; visible: boolean; items: CatalogProduct[] };
export type FeedItem = { id: string; type: 'news' | 'event' | 'raffle'; date: string; endDate: string; image: string; visible: boolean; featured: boolean; titleBg: string; titleEn: string; bodyBg: string; bodyEn: string };

export type LocaleContent = {
  home: { eyebrow: string; title: string; view: string };
  about: { eyebrow: string; title: string; copy: string; rows: { label: string; copy: string }[] };
  contact: { heading: string; address: string; phone: string; note: string; hours: { day: string; hours: string }[] };
  products: { categories: CatalogCategory[] };
};
export type SiteContent = { bg: LocaleContent; en: LocaleContent; media: { logo: string; store: string; products: string }; feed: FeedItem[]; seedVersion?: number };
const seededFeed: FeedItem[] = [
  { id: 'urban-wine-fest-ruse-2026', type: 'event', date: '2026-10-02', endDate: '2026-10-03', image: '', visible: true, featured: false,
    titleBg: 'Urban Wine Fest – Русе 2026', titleEn: 'Urban Wine Fest – Ruse 2026',
    bodyBg: 'На 2 и 3 октомври Еленски Балканджии са сред участниците в Urban Wine Fest на площад „Свобода“ в Русе. Фестивалът събира българско вино, музика и кулинарни щандове. Входът е свободен; консумацията се заплаща на място. Програма: 2 октомври, 14:00–22:00 ч.; 3 октомври, 12:00–22:00 ч. Източник: Туристически информационен център – Русе (visitruse.bg/location/1305).',
    bodyEn: 'Elenski Balkandzhii is among the participants at Urban Wine Fest in Ruse, on Freedom Square, October 2–3. The festival features Bulgarian wine, music and food stands. Entry is free; food and drinks are paid for on site. Hours: October 2, 14:00–22:00; October 3, 12:00–22:00. Source: Ruse Tourist Information Centre (visitruse.bg/location/1305).' },
  { id: 'third-store-veliko-tarnovo-2025', type: 'news', date: '2025-03-10', endDate: '', image: '', visible: true, featured: false,
    titleBg: 'Трети магазин във Велико Търново', titleEn: 'Third store opens in Veliko Tarnovo',
    bodyBg: 'В публично съобщение от 10 март 2025 г. „Еленски Балканджии“ обявяват откриването на третия си магазин във Велико Търново — на Централния кооперативен пазар. Това е новина от архива на марката, не ново откриване в Русе. Източник: публичната публикация на „Еленски Балканджии“ (findglocal.com/BG/Elena/100648771375825/).',
    bodyEn: 'In a public announcement dated March 10, 2025, Elenski Balkandzhii reported the opening of its third store in Veliko Tarnovo at the Central Cooperative Market. This is an archived brand update, not a new opening in Ruse. Source: the public Elenski Balkandzhii post (findglocal.com/BG/Elena/100648771375825/).' },
];
const seededProducts = [
  { category: 'meso', id: 'pork-neck-boneless', bg: 'Свински врат без кост', en: 'Boneless pork neck' },
  { category: 'meso', id: 'pork-ribs', bg: 'Свински ребра', en: 'Pork ribs' },
  { category: 'meso', id: 'grill-sausage', bg: 'Балканджийска грил наденица', en: 'Balkandzhii grill sausage' },
  { category: 'meso', id: 'minced-sausage', bg: 'Кълцана наденица', en: 'Coarsely minced sausage' },
  { category: 'mezeta', id: 'homemade-sudzhuk', bg: 'Домашен суджук', en: 'Homemade sudzhuk' },
];

function seedPublishedContent(site: SiteContent): SiteContent {
  if (site.seedVersion !== undefined) return site;
  const copy = structuredClone(site);
  copy.seedVersion = 1;
  for (const entry of seededFeed) {
    if (copy.feed.length < 30 && !copy.feed.some(item => item.id === entry.id)) copy.feed.push(structuredClone(entry));
  }
  for (const item of seededProducts) {
    const bg = copy.bg.products.categories.find(category => category.id === item.category);
    const en = copy.en.products.categories.find(category => category.id === item.category);
    if (!bg || !en || bg.items.some(product => product.id === item.id) || en.items.some(product => product.id === item.id)) continue;
    bg.items.push({ id: item.id, title: item.bg, description: '', image: '', visible: true });
    en.items.push({ id: item.id, title: item.en, description: '', image: '', visible: true });
  }
  return copy;
}
export const defaults: SiteContent = {
  media: { logo: '/elenski-balkandzhii-logo.jpg', store: '/elenski-balkandzhii-store-ruse.jpg', products: '/elenski-balkandzhii-traditional-products.jpg' },
  feed: structuredClone(seededFeed),
  seedVersion: 1,
  bg: {
    home: { eyebrow: 'Еленски Балканджии · Русе', title: 'Традиционни вкусове от Еленския Балкан', view: 'Разгледай асортимента' },
    about: { eyebrow: 'За нас', title: 'Вкус с корен.', copy: 'Магазини "Еленски Балканджии" предлагат на своите клиенти продукти от Еленския Балкан, съдържащи само натурални подправки. За направата им се използва единствено българско месо.', rows: [{ label: 'Произход', copy: 'Продукти от Еленския Балкан.' }, { label: 'Подправки', copy: 'За направата им се използват само натурални подправки.' }, { label: 'Месо', copy: 'Използва се единствено българско месо.' }] },
    contact: { heading: 'Еленски Балканджии — Контакти', address: 'ж.к. Родина 3, ул. „Шипка“ 12, 7012 Русе', phone: '087 878 8897', note: 'По празници работното време може да бъде различно.', hours: [{day:'Понеделник',hours:'09:00–20:00'},{day:'Вторник',hours:'09:00–20:00'},{day:'Сряда',hours:'09:00–20:00'},{day:'Четвъртък',hours:'09:00–20:00'},{day:'Петък',hours:'09:00–20:00'},{day:'Събота',hours:'09:00–18:00'},{day:'Неделя',hours:'09:00–14:00'}] },
    products: { categories: [
      { id: 'meso', title: 'Месо', description: 'Разгледайте асортимента от месо в нашия магазин.', image: '', visible: true, items: [
        { id: 'pork', title: 'Свинско месо', description: '', image: '', visible: true },
        { id: 'meatballs', title: 'Кюфтета и кебапчета', description: '', image: '', visible: true },
        { id: 'sausages', title: 'Наденички', description: '', image: '', visible: true },
        { id: 'pork-neck-boneless', title: 'Свински врат без кост', description: '', image: '', visible: true },
        { id: 'pork-ribs', title: 'Свински ребра', description: '', image: '', visible: true },
        { id: 'grill-sausage', title: 'Балканджийска грил наденица', description: '', image: '', visible: true },
        { id: 'minced-sausage', title: 'Кълцана наденица', description: '', image: '', visible: true }] },
      { id: 'mezeta', title: 'Мезета', description: 'Традиционни мезета и сушени месни продукти.', image: '', visible: true, items: [
        { id: 'sudzhuk', title: 'Суджуци и луканки', description: '', image: '', visible: true },
        { id: 'dried', title: 'Сушени меса', description: '', image: '', visible: true },
        { id: 'platters', title: 'Мезе плата', description: '', image: '', visible: true },
        { id: 'homemade-sudzhuk', title: 'Домашен суджук', description: '', image: '', visible: true }] },
      { id: 'sirena', title: 'Сирена', description: 'Сирена и кашкавал за вашата трапеза.', image: '', visible: true, items: [
        { id: 'white', title: 'Бяло сирене', description: '', image: '', visible: true },
        { id: 'kashkaval', title: 'Кашкавал', description: '', image: '', visible: true },
        { id: 'cheese-platter', title: 'Сирена за плато', description: '', image: '', visible: true }] }
    ] }
  },
  en: {
    home: { eyebrow: 'Elenski Balkandzhii · Ruse', title: 'Traditional flavours from the Elena Balkan', view: 'Explore the selection' },
    about: { eyebrow: 'About us', title: 'Taste with roots.', copy: 'Elenski Balkandzhii stores offer products from the Elena Balkan region, made only with natural spices. Only Bulgarian meat is used in their preparation.', rows: [{label:'Origin',copy:'Products from the Elena Balkan region.'},{label:'Spices',copy:'Only natural spices are used in their preparation.'},{label:'Meat',copy:'Only Bulgarian meat is used.'}] },
    contact: { heading: 'Elenski Balkandzhii — Contacts', address: 'Rodina 3, 12 Shipka St., 7012 Ruse, Bulgaria', phone: '087 878 8897', note: 'Opening hours may vary on public holidays.', hours: [{day:'Monday',hours:'09:00–20:00'},{day:'Tuesday',hours:'09:00–20:00'},{day:'Wednesday',hours:'09:00–20:00'},{day:'Thursday',hours:'09:00–20:00'},{day:'Friday',hours:'09:00–20:00'},{day:'Saturday',hours:'09:00–18:00'},{day:'Sunday',hours:'09:00–14:00'}] },
    products: { categories: [
      { id: 'meso', title: 'Meat', description: 'Explore the selection of meat in our store.', image: '', visible: true, items: [
        { id: 'pork', title: 'Pork', description: '', image: '', visible: true },
        { id: 'meatballs', title: 'Meatballs and kebapche', description: '', image: '', visible: true },
        { id: 'sausages', title: 'Sausages', description: '', image: '', visible: true },
        { id: 'pork-neck-boneless', title: 'Boneless pork neck', description: '', image: '', visible: true },
        { id: 'pork-ribs', title: 'Pork ribs', description: '', image: '', visible: true },
        { id: 'grill-sausage', title: 'Balkandzhii grill sausage', description: '', image: '', visible: true },
        { id: 'minced-sausage', title: 'Coarsely minced sausage', description: '', image: '', visible: true }] },
      { id: 'mezeta', title: 'Delicacies', description: 'Traditional delicacies and cured meats.', image: '', visible: true, items: [
        { id: 'sudzhuk', title: 'Sudzhuk and lukanka', description: '', image: '', visible: true },
        { id: 'dried', title: 'Dried meats', description: '', image: '', visible: true },
        { id: 'platters', title: 'Delicacy platters', description: '', image: '', visible: true },
        { id: 'homemade-sudzhuk', title: 'Homemade sudzhuk', description: '', image: '', visible: true }] },
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
    // Existing content predates the separate home and news pages.
    if (!Array.isArray(site.feed) || site.bg.home.title === "Нашият асортимент" || site.en.home.title === "Our selection") {
      const migrated = structuredClone(site);
      if (!Array.isArray(migrated.feed)) migrated.feed = [];
      if (site.bg.home.title === "Нашият асортимент") migrated.bg.home.title = defaults.bg.home.title;
      if (site.en.home.title === "Our selection") migrated.en.home.title = defaults.en.home.title;
      return normalizeContent(migrated);
    }
    if (site.feed.length > 30 || site.feed.some(item =>
      typeof item.id !== 'string' || !['news', 'event', 'raffle'].includes(item.type) ||
      typeof item.date !== 'string' || typeof item.endDate !== 'string' || typeof item.image !== 'string' ||
      typeof item.visible !== 'boolean' || typeof item.featured !== 'boolean' ||
      ['titleBg', 'titleEn', 'bodyBg', 'bodyEn'].some(key => typeof item[key as keyof FeedItem] !== 'string')) ||
      new Set(site.feed.map(item => item.id)).size !== site.feed.length) return null;
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
    return seedPublishedContent(site);
  } catch { return null; }
}

export function validContent(value: unknown): value is SiteContent {
  return normalizeContent(value) === value;
}
