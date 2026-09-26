export type LocaleContent = {
  home: { eyebrow: string; title: string; view: string };
  about: { eyebrow: string; title: string; copy: string; rows: { label: string; copy: string }[] };
  contact: { heading: string; address: string; phone: string; note: string; hours: { day: string; hours: string }[] };
  products: { categories: { title: string; items: string[] }[] };
};
export type SiteContent = { bg: LocaleContent; en: LocaleContent; media: { logo: string; store: string; products: string } };
export const defaults: SiteContent = {
  media: { logo: '/elenski-balkandzhii-logo.jpg', store: '/elenski-balkandzhii-store-ruse.jpg', products: '/elenski-balkandzhii-traditional-products.jpg' },
  bg: {
    home: { eyebrow: 'Еленски Балканджии', title: 'Вкусът на Балкана', view: 'Виж продуктите →' },
    about: { eyebrow: 'За нас', title: 'Вкус с корен.', copy: 'Магазини "Еленски Балканджии" предлагат на своите клиенти продукти от Еленския Балкан, съдържащи само натурални подправки. За направата им се използва единствено българско месо.', rows: [{ label: 'Произход', copy: 'Продукти от Еленския Балкан.' }, { label: 'Подправки', copy: 'За направата им се използват само натурални подправки.' }, { label: 'Месо', copy: 'Използва се единствено българско месо.' }] },
    contact: { heading: 'Еленски Балканджии — Контакти', address: 'ж.к. Родина 3, ул. „Шипка“ 12, 7012 Русе', phone: '087 878 8897', note: 'По празници работното време може да бъде различно.', hours: [{day:'Понеделник',hours:'09:00–20:00'},{day:'Вторник',hours:'09:00–20:00'},{day:'Сряда',hours:'09:00–20:00'},{day:'Четвъртък',hours:'09:00–20:00'},{day:'Петък',hours:'09:00–20:00'},{day:'Събота',hours:'09:00–18:00'},{day:'Неделя',hours:'09:00–14:00'}] },
    products: { categories: [{title:'Месо',items:['Свинско месо','Кюфтета и кебапчета','Наденички']},{title:'Мезета',items:['Суджуци и луканки','Сушени меса','Мезе плата']},{title:'Сирена',items:['Бяло сирене','Кашкавал','Сирена за плато']}] }
  },
  en: {
    home: { eyebrow: 'Elenski Balkandzhii', title: 'The taste of the Balkan', view: 'View products →' },
    about: { eyebrow: 'About us', title: 'Taste with roots.', copy: 'Elenski Balkandzhii stores offer products from the Elena Balkan region, made only with natural spices. Only Bulgarian meat is used in their preparation.', rows: [{label:'Origin',copy:'Products from the Elena Balkan region.'},{label:'Spices',copy:'Only natural spices are used in their preparation.'},{label:'Meat',copy:'Only Bulgarian meat is used.'}] },
    contact: { heading: 'Elenski Balkandzhii — Contacts', address: 'Rodina 3, 12 Shipka St., 7012 Ruse, Bulgaria', phone: '087 878 8897', note: 'Opening hours may vary on public holidays.', hours: [{day:'Monday',hours:'09:00–20:00'},{day:'Tuesday',hours:'09:00–20:00'},{day:'Wednesday',hours:'09:00–20:00'},{day:'Thursday',hours:'09:00–20:00'},{day:'Friday',hours:'09:00–20:00'},{day:'Saturday',hours:'09:00–18:00'},{day:'Sunday',hours:'09:00–14:00'}] },
    products: { categories: [{title:'Meat',items:['Pork','Meatballs and kebapche','Sausages']},{title:'Delicacies',items:['Sudzhuk and lukanka','Dried meats','Delicacy platters']},{title:'Cheese',items:['White brined cheese','Kashkaval','Cheese for platters']}] }
  }
};

export function validContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false;
  try {
    const site = value as SiteContent;
    return (['logo','store','products'] as const).every(key => typeof site.media[key] === 'string' && (site.media[key].startsWith('/') || site.media[key].startsWith('https://'))) && (['bg','en'] as const).every(lang => {
      const c = site[lang];
      return typeof c.home.title === 'string' && typeof c.home.eyebrow === 'string' && typeof c.home.view === 'string' &&
        typeof c.about.title === 'string' && typeof c.about.copy === 'string' && Array.isArray(c.about.rows) &&
        c.about.rows.every(r => typeof r.label === 'string' && typeof r.copy === 'string') &&
        typeof c.contact.heading === 'string' && typeof c.contact.address === 'string' && typeof c.contact.phone === 'string' && typeof c.contact.note === 'string' &&
        Array.isArray(c.contact.hours) && c.contact.hours.every(h => typeof h.day === 'string' && typeof h.hours === 'string') &&
        c.products.categories.length === 3 && c.products.categories.every(p => typeof p.title === 'string' && Array.isArray(p.items) && p.items.every(i => typeof i === 'string'));
    });
  } catch { return false; }
}
