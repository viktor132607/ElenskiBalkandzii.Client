export type CatalogProduct = { id: string; title: string; description: string; image: string; visible: boolean };
export type CatalogCategory = { id: string; title: string; description: string; image: string; visible: boolean; items: CatalogProduct[] };
export type FeedMediaType = 'none' | 'image' | 'video' | 'slideshow';
export type FeedItem = { id: string; type: 'news' | 'event' | 'raffle'; date: string; endDate: string; image: string; images?: string[]; videoUrl?: string; mediaType?: FeedMediaType; visible: boolean; featured: boolean; titleBg: string; titleEn: string; bodyBg: string; bodyEn: string };

export function feedMediaType(item: FeedItem): FeedMediaType {
  if (item.mediaType) return item.mediaType;
  if (item.images?.length) return 'slideshow';
  if (item.videoUrl) return 'video';
  if (item.image || item.id === 'urban-wine-fest-ruse-2026' || item.id === 'third-store-veliko-tarnovo-2025') return 'image';
  return 'none';
}

export type LocaleContent = {
  home: { eyebrow: string; title: string; view: string };
  about: { eyebrow: string; title: string; copy: string; rows: { label: string; copy: string }[] };
  contact: { heading: string; address: string; phone: string; note: string; hours: { day: string; hours: string }[] };
  products: { categories: CatalogCategory[] };
};
export type SiteContent = { bg: LocaleContent; en: LocaleContent; media: { logo: string; store: string; products: string; about?: string }; feed: FeedItem[]; rafflesEnabled?: boolean; seedVersion?: number; aboutCopyVersion?: number; catalogVersion?: number };
const aboutText = {
  bg: {
    copy: 'Фабриката на „Еленските балканджии“ се намира в екологично чист район в покрайнините на град Елена и е специализирана в производство на висококачествени местни продукти по стари домашни рецепти от Еленския край. За производството на техните специалитети балканджиите използват само висококачествено българско месо, при това незамразено. В магазините наред с прясното месо и вкусните свински, телешки и биволски мезенца се предлагат домашни сирена, сушени гъби, билки и плодове, ядки, домашни лютеници и туршии, както и омайно вино с тяхна собствена марка.',
    rows: [
      { label: 'Мезета', copy: 'Мезетата на фирмата пък носят уникалните имена на Балкана и са над 30. Сред тях са „Мийковска луканка“, „Блъсковска луканка“, „Биволска луканка“, „Еленски суджук“, „Болярски суджук“, „Балканджийски суджук“, „Вълчевско мезе“, „Кайзерована пастърма“, филе „Елена“.' },
      { label: 'Нашата амбиция', copy: 'Амбицията на младия колектив на фирмата е да покаже, че без бомбастични цени на месото и пържолата българинът може да похапне наистина нещо прясно, което не е минало през фризера. Към всичко това винаги се добавят прекрасни вина, които носят същата марка на дружеството. Както се казва, да ни е сладко и пивко!' },
    ],
  },
  en: {
    copy: 'The Elenski Balkandzhii factory is located in an environmentally clean area on the outskirts of Elena and specialises in producing high-quality local products from traditional home recipes of the Elena region. Only high-quality Bulgarian meat, never frozen, is used to make its specialities. Alongside fresh meat and tasty pork, beef and buffalo delicacies, the shops offer homemade cheeses, dried mushrooms, herbs and fruit, nuts, homemade lutenitsa and pickles, as well as delightful wine under the company’s own label.',
    rows: [
      { label: 'Delicacies', copy: 'The company’s delicacies carry the unique names of the Balkan region and number more than 30. They include Miykovska lukanka, Blaskovska lukanka, Buffalo lukanka, Elenski sudzhuk, Bolyarski sudzhuk, Balkandzhiyski sudzhuk, Valchevsko meze, Kaiser-style pastrami and Elena fillet.' },
      { label: 'Our ambition', copy: 'The young team aims to show that Bulgarians can enjoy truly fresh meat that has never been through a freezer without inflated prices for meat and steaks. The company’s own wines are always offered alongside its specialities. As the saying goes, enjoy your food and drink!' },
    ],
  },
};
const seededFeed: FeedItem[] = [
  { id: 'urban-wine-fest-ruse-2026', type: 'event', date: '2026-10-02', endDate: '2026-10-03', image: '', mediaType: 'image', visible: true, featured: false,
    titleBg: 'Urban Wine Fest – Русе 2026', titleEn: 'Urban Wine Fest – Ruse 2026',
    bodyBg: 'На 2 и 3 октомври ще ни откриете на Urban Wine Fest на площад „Свобода“ в Русе. Фестивалът събира български вина, музика и кулинарни щандове. Входът е свободен, а консумацията се заплаща на място. Заповядайте на 2 октомври от 14:00 до 22:00 ч. и на 3 октомври от 12:00 до 22:00 ч.',
    bodyEn: 'Join Elenski Balkandzhii at Urban Wine Fest on Freedom Square in Ruse on October 2 and 3. Explore Bulgarian wines, music and food stands. Admission is free; food and drinks are paid for on site. Visit on October 2 from 14:00 to 22:00 or on October 3 from 12:00 to 22:00.' },
  { id: 'third-store-veliko-tarnovo-2025', type: 'news', date: '2025-03-10', endDate: '', image: '', visible: true, featured: false,
    titleBg: 'Трети магазин във Велико Търново', titleEn: 'Third store opens in Veliko Tarnovo',
    bodyBg: 'През март 2025 г. „Еленски Балканджии“ обявиха откриването на третия си магазин във Велико Търново. Новата локация е на Централния кооперативен пазар и събира вкусовете на Еленския Балкан на още едно място.',
    bodyEn: 'In March 2025, Elenski Balkandzhii announced the opening of its third store in Veliko Tarnovo. Located at the Central Cooperative Market, the new shop brings the flavours of the Elena Balkan to another part of the city.' },
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
  media: { logo: '/elenski-balkandzhii-logo.jpg', store: '/elenski-balkandzhii-store-ruse.jpg', products: '/elenski-balkandzhii-traditional-products.jpg', about: '/elenski-balkandzhii-fresh-meat.webp' },
  feed: structuredClone(seededFeed),
  rafflesEnabled: false,
  seedVersion: 1,
  aboutCopyVersion: 2,
  catalogVersion: 1,
  bg: {
    home: { eyebrow: 'Еленски Балканджии · Русе', title: 'Традиционни вкусове от Еленския Балкан', view: 'Разгледай асортимента' },
    about: { eyebrow: 'За нас', title: 'Вкус с корен.', ...aboutText.bg },
    contact: { heading: 'Еленски Балканджии', address: 'ж.к. Родина 3, ул. „Шипка“ 12, 7012 Русе', phone: '087 878 8897', note: 'По празници работното време може да бъде различно.', hours: [{day:'Понеделник',hours:'09:00–20:00'},{day:'Вторник',hours:'09:00–20:00'},{day:'Сряда',hours:'09:00–20:00'},{day:'Четвъртък',hours:'09:00–20:00'},{day:'Петък',hours:'09:00–20:00'},{day:'Събота',hours:'09:00–18:00'},{day:'Неделя',hours:'09:00–14:00'}] },
    products: { categories: [
      { id: 'meso', title: 'Месо', description: 'Разгледайте асортимента от месо в нашия магазин.', image: '', visible: true, items: [
        { id: 'pork', title: 'Свинско месо', description: '', image: '', visible: true },
        { id: 'meatballs', title: 'Кюфтета', description: '', image: '', visible: true },
        { id: 'kebapche', title: 'Кебапчета', description: '', image: '', visible: true },
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
    about: { eyebrow: 'About us', title: 'Taste with roots.', ...aboutText.en },
    contact: { heading: 'Elenski Balkandzhii', address: 'Rodina 3, 12 Shipka St., 7012 Ruse, Bulgaria', phone: '087 878 8897', note: 'Opening hours may vary on public holidays.', hours: [{day:'Monday',hours:'09:00–20:00'},{day:'Tuesday',hours:'09:00–20:00'},{day:'Wednesday',hours:'09:00–20:00'},{day:'Thursday',hours:'09:00–20:00'},{day:'Friday',hours:'09:00–20:00'},{day:'Saturday',hours:'09:00–18:00'},{day:'Sunday',hours:'09:00–14:00'}] },
    products: { categories: [
      { id: 'meso', title: 'Meat', description: 'Explore the selection of meat in our store.', image: '', visible: true, items: [
        { id: 'pork', title: 'Pork', description: '', image: '', visible: true },
        { id: 'meatballs', title: 'Meatballs', description: '', image: '', visible: true },
        { id: 'kebapche', title: 'Kebapcheta', description: '', image: '', visible: true },
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
    if (site.rafflesEnabled !== undefined && typeof site.rafflesEnabled !== 'boolean') return null;
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
      ['titleBg', 'titleEn', 'bodyBg', 'bodyEn'].some(key => typeof item[key as keyof FeedItem] !== 'string') ||
      (item.images !== undefined && (!Array.isArray(item.images) || item.images.length > 12 || item.images.some(image => typeof image !== 'string'))) ||
      (item.videoUrl !== undefined && typeof item.videoUrl !== 'string') ||
      (item.mediaType !== undefined && !['none', 'image', 'video', 'slideshow'].includes(item.mediaType))) ||
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
    if (site.aboutCopyVersion !== 2 || typeof site.media.about !== 'string') {
      const updated = structuredClone(site);
      if (site.aboutCopyVersion !== 2) {
        updated.bg.about = { ...updated.bg.about, ...structuredClone(aboutText.bg) };
        updated.en.about = { ...updated.en.about, ...structuredClone(aboutText.en) };
        updated.aboutCopyVersion = 2;
      }
      if (typeof updated.media.about !== 'string') updated.media.about = defaults.media.about;
      return normalizeContent(updated);
    }
    // Refresh the original seeded announcements and the redundant contact heading without replacing admin edits.
    if (site.bg.contact.heading === 'Еленски Балканджии — Контакти' ||
        site.en.contact.heading === 'Elenski Balkandzhii — Contacts' ||
        site.feed.some(item =>
          (item.id === 'urban-wine-fest-ruse-2026' || item.id === 'third-store-veliko-tarnovo-2025') &&
          (item.bodyBg === 'На 2 и 3 октомври Еленски Балканджии са сред участниците в Urban Wine Fest на площад „Свобода“ в Русе. Фестивалът събира българско вино, музика и кулинарни щандове. Входът е свободен; консумацията се заплаща на място. Програма: 2 октомври, 14:00–22:00 ч.; 3 октомври, 12:00–22:00 ч. Източник: Туристически информационен център – Русе (visitruse.bg/location/1305).' || item.bodyBg === 'В публично съобщение от 10 март 2025 г. „Еленски Балканджии“ обявяват откриването на третия си магазин във Велико Търново — на Централния кооперативен пазар. Това е новина от архива на марката, не ново откриване в Русе. Източник: публичната публикация на „Еленски Балканджии“ (findglocal.com/BG/Elena/100648771375825/).'))) {
      const updated = structuredClone(site);
      if (updated.bg.contact.heading === 'Еленски Балканджии — Контакти') updated.bg.contact.heading = defaults.bg.contact.heading;
      if (updated.en.contact.heading === 'Elenski Balkandzhii — Contacts') updated.en.contact.heading = defaults.en.contact.heading;
      for (const item of updated.feed) {
        if (item.id === 'urban-wine-fest-ruse-2026') {
          if (item.bodyBg === 'На 2 и 3 октомври Еленски Балканджии са сред участниците в Urban Wine Fest на площад „Свобода“ в Русе. Фестивалът събира българско вино, музика и кулинарни щандове. Входът е свободен; консумацията се заплаща на място. Програма: 2 октомври, 14:00–22:00 ч.; 3 октомври, 12:00–22:00 ч. Източник: Туристически информационен център – Русе (visitruse.bg/location/1305).') item.bodyBg = 'На 2 и 3 октомври ще ни откриете на Urban Wine Fest на площад „Свобода“ в Русе. Фестивалът събира български вина, музика и кулинарни щандове. Входът е свободен, а консумацията се заплаща на място. Заповядайте на 2 октомври от 14:00 до 22:00 ч. и на 3 октомври от 12:00 до 22:00 ч.';
          if (item.bodyEn === 'Elenski Balkandzhii is among the participants at Urban Wine Fest in Ruse, on Freedom Square, October 2–3. The festival features Bulgarian wine, music and food stands. Entry is free; food and drinks are paid for on site. Hours: October 2, 14:00–22:00; October 3, 12:00–22:00. Source: Ruse Tourist Information Centre (visitruse.bg/location/1305).') item.bodyEn = 'Join Elenski Balkandzhii at Urban Wine Fest on Freedom Square in Ruse on October 2 and 3. Explore Bulgarian wines, music and food stands. Admission is free; food and drinks are paid for on site. Visit on October 2 from 14:00 to 22:00 or on October 3 from 12:00 to 22:00.';
        }
        if (item.id === 'third-store-veliko-tarnovo-2025') {
          if (item.bodyBg === 'В публично съобщение от 10 март 2025 г. „Еленски Балканджии“ обявяват откриването на третия си магазин във Велико Търново — на Централния кооперативен пазар. Това е новина от архива на марката, не ново откриване в Русе. Източник: публичната публикация на „Еленски Балканджии“ (findglocal.com/BG/Elena/100648771375825/).') item.bodyBg = 'През март 2025 г. „Еленски Балканджии“ обявиха откриването на третия си магазин във Велико Търново. Новата локация е на Централния кооперативен пазар и събира вкусовете на Еленския Балкан на още едно място.';
          if (item.bodyEn === 'In a public announcement dated March 10, 2025, Elenski Balkandzhii reported the opening of its third store in Veliko Tarnovo at the Central Cooperative Market. This is an archived brand update, not a new opening in Ruse. Source: the public Elenski Balkandzhii post (findglocal.com/BG/Elena/100648771375825/).') item.bodyEn = 'In March 2025, Elenski Balkandzhii announced the opening of its third store in Veliko Tarnovo. Located at the Central Cooperative Market, the new shop brings the flavours of the Elena Balkan to another part of the city.';
        }
      }
      return normalizeContent(updated);
    }
    if (site.catalogVersion !== 1) {
      const updated = structuredClone(site);
      const bgItems = updated.bg.products.categories.find(category => category.id === 'meso')?.items;
      const enItems = updated.en.products.categories.find(category => category.id === 'meso')?.items;
      const bgIndex = bgItems?.findIndex(product => product.id === 'meatballs') ?? -1;
      const enIndex = enItems?.findIndex(product => product.id === 'meatballs') ?? -1;
      if (bgItems && enItems && bgIndex >= 0 && enIndex >= 0 &&
          bgItems[bgIndex].title === 'Кюфтета и кебапчета' &&
          enItems[enIndex].title === 'Meatballs and kebapche' &&
          !bgItems.some(product => product.id === 'kebapche') && !enItems.some(product => product.id === 'kebapche')) {
        bgItems[bgIndex].title = 'Кюфтета';
        enItems[enIndex].title = 'Meatballs';
        bgItems.splice(bgIndex + 1, 0, { id: 'kebapche', title: 'Кебапчета', description: '', image: '', visible: true });
        enItems.splice(enIndex + 1, 0, { id: 'kebapche', title: 'Kebapcheta', description: '', image: '', visible: true });
      }
      updated.catalogVersion = 1;
      return seedPublishedContent(updated);
    }
    return seedPublishedContent(site);
  } catch { return null; }
}

export function validContent(value: unknown): value is SiteContent {
  return normalizeContent(value) === value;
}
