'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiUrl } from '@/lib/api';
import { defaults, feedMediaType, normalizeContent, type FeedMediaType, type SiteContent } from '@/lib/content';

type Lang = 'bg' | 'en';
const tokenKey = 'elenski-admin-session';

export default function SiteControl() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const [draft, setDraft] = useState<SiteContent>(defaults);
  const [language, setLanguage] = useState<Lang>('bg');
  const [section, setSection] = useState<'home' | 'products' | 'feed' | 'about' | 'contact' | 'images' | 'stats'>('home');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(tokenKey);
    if (!saved) { router.replace('/adminlogin'); queueMicrotask(() => setReady(true)); return; }
    fetch(apiUrl('/api/admin/session'), { headers: { Authorization: `Bearer ${saved}` }, cache: 'no-store' })
      .then(r => { if (r.ok) setToken(saved); else { sessionStorage.removeItem(tokenKey); router.replace('/adminlogin'); } })
      .catch(() => setMessage('API не е достъпен.'))
      .finally(() => setReady(true));
  }, [router]);

  useEffect(() => {
    if (!token) return;
    fetch(apiUrl('/api/content'), { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { const parsed = normalizeContent(data); if (parsed) setDraft(parsed); })
      .catch(() => setMessage('Съдържанието не се зареди. Проверете връзката с API.'));
  }, [token]);

  function change(update: (copy: SiteContent) => void) {
    setDraft(current => { const copy = structuredClone(current); update(copy); return copy; });
    setMessage('Има незаписани промени.');
  }

  async function save() {
    if (draft.feed.some(item => item.visible && (!item.titleBg.trim() || !item.titleEn.trim() || !item.bodyBg.trim() || !item.bodyEn.trim() || !item.date))) {
      setMessage('За публикуваните записи попълнете дата, заглавие и текст на двата езика.');
      return;
    }
    if (draft.feed.some(item => item.images && item.images.length > 12)) { setMessage('Максимум 12 снимки за публикация.'); return; }
    setBusy(true); setMessage('');
    try {
      const response = await fetch(apiUrl('/api/admin/content'), { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(draft) });
      if (response.status === 401) { sessionStorage.removeItem(tokenKey); setToken(''); router.replace('/adminlogin'); setMessage('Сесията изтече. Влезте отново.'); }
      else setMessage(response.ok ? 'Промените са записани. Опреснете сайта, за да ги видите.' : 'Записът не успя. Проверете полетата и API.');
    } catch { setMessage('API не е достъпен.'); }
    finally { setBusy(false); }
  }

  async function upload(file: File, apply: (draft: SiteContent, url: string) => void) {
    setBusy(true); setMessage('');
    try {
      const data = new FormData(); data.append('file', file);
      const response = await fetch(apiUrl('/api/images'), { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: data });
      if (!response.ok) { setMessage(response.status === 401 ? 'Сесията изтече. Влезте отново.' : 'Качването не успя. Изберете JPEG, PNG или WebP до 5 MB.'); return; }
      const result = await response.json();
      change(d => apply(d, result.url));
      setMessage('Снимката е качена. Натиснете „Запази промените“, за да я покажете на сайта.');
    } catch { setMessage('API не е достъпен.'); }
    finally { setBusy(false); }
  }

  function moveCategory(index: number, delta: number) {
    change(d => { for (const lang of ['bg', 'en'] as const) {
      const categories = d[lang].products.categories;
      const [category] = categories.splice(index, 1);
      categories.splice(index + delta, 0, category);
    }});
  }

  function moveProduct(categoryId: string, index: number, delta: number) {
    change(d => { for (const lang of ['bg', 'en'] as const) {
      const items = d[lang].products.categories.find(c => c.id === categoryId)!.items;
      const [product] = items.splice(index, 1);
      items.splice(index + delta, 0, product);
    }});
  }

  const imagePicker = (label: string, path: string, apply: (draft: SiteContent, url: string) => void, removable = false) => <div>
    <label className="mb-2 block text-sm font-bold">{label}</label>
    {path && <Image src={path.startsWith('/api/') ? apiUrl(path) : path} alt="Преглед" width={160} height={112} unoptimized className="mb-3 h-28 max-w-full rounded-lg object-contain" />}
    <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} aria-label={label} onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file, apply); event.target.value = ''; }} className="block w-full text-sm" />
    {path && removable && <button type="button" onClick={() => change(d => apply(d, ''))} className="mt-2 text-sm font-bold text-[#8d2e2b]">Премахни снимката</button>}
  </div>;

  const field = (label: string, value: string, onChange: (value: string) => void, multiline = false) => (
    <label className="block text-sm font-bold text-[#332923]" key={label}>
      <span className="mb-2 block">{label}</span>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-[#d8d0c8] bg-white p-3 font-normal outline-none focus:border-[#08733a]" /> :
        <input value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-[#d8d0c8] bg-white p-3 font-normal outline-none focus:border-[#08733a]" />}
    </label>
  );
  const c = draft[language];
  const name = language === 'bg' ? 'Български' : 'English';
  const sections = { home: 'Начало', products: 'Асортимент', feed: 'Новини, събития и томболи', about: 'За нас', contact: 'Контакти', images: 'Изображения', stats: 'Статистика' };

  return <section className="min-h-[70vh] bg-[#f6f3ef] px-4 py-12">
    <div className="mx-auto max-w-5xl rounded-2xl border border-[#e4ddd7] bg-white p-6 shadow-sm md:p-10">
      <h1 className="text-3xl font-black uppercase">Управление на сайта</h1>
      {!ready || !token ? <p className="mt-6">Проверка на достъпа…</p> : <>
          <div className="mt-7 flex flex-wrap gap-3 border-b border-[#e4ddd7] pb-6">
            {(['home','products','feed','about','contact','images','stats'] as const).map(key => <button type="button" key={key} onClick={() => setSection(key)} aria-pressed={section === key} className={`rounded-xl px-4 py-2 font-bold ${section === key ? 'bg-[#08733a] text-white' : 'bg-[#f1ede9]'}`}>{sections[key]}</button>)}
            <button type="button" onClick={() => { sessionStorage.removeItem(tokenKey); setToken(''); router.replace('/adminlogin'); }} className="ml-auto rounded-xl border px-4 py-2 font-bold">Изход</button>
          </div>
          <div className="mt-6 flex gap-3">{(['bg','en'] as const).map(lang => <button type="button" key={lang} onClick={() => setLanguage(lang)} aria-pressed={language === lang} className={`rounded-xl px-4 py-2 font-bold ${language === lang ? 'bg-[#211914] text-white' : 'bg-[#f1ede9]'}`}>{lang === 'bg' ? 'BG' : 'EN'}</button>)}</div>
          <h2 className="my-6 text-xl font-black">{sections[section]} · {name}</h2>
          <div className="grid gap-5">
            {section === 'stats' && <div className="space-y-4 rounded-xl border border-[#e4ddd7] bg-[#f6f3ef] p-6 leading-7">
              <p>Посещенията и разглежданията на продуктите се отчитат в Google Analytics 4 само след съгласие за статистика и настроен NEXT_PUBLIC_GOOGLE_ANALYTICS_ID в Render.</p>
              <p>За посещенията отворете „Отчети → Ангажираност → Страници и екрани“. За най-разглежданите продукти направете изследване по „Item name“ / „Items viewed in list“ за събитието view_item_list. Категориите се отчитат като view_product_category. Продуктова карта се брои, когато поне половината от нея стане видима, най-много веднъж на отваряне на страницата.</p>
              <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">Отвори Google Analytics ↗</a>
            </div>}
            {section === 'home' && <>
              {field('Надпис', c.home.eyebrow, v => change(d => d[language].home.eyebrow = v))}
              {field('Заглавие', c.home.title, v => change(d => d[language].home.title = v))}
              <p className="text-sm text-[#625851]">Слайдшоуто използва избраните публикации със снимка; когато няма такива, показва снимките на магазина и продуктите от „Изображения“.</p>
            </>}
            {section === 'products' && <>
              {field('Текст на бутона към категориите', c.home.view, v => change(d => d[language].home.view = v))}
              <p className="text-sm leading-relaxed text-[#625851]">Категориите и продуктите се подреждат еднакво за BG и EN. Редактирайте имената и описанията на двата езика. Няма количка, плащания или онлайн поръчки.</p>
              {c.products.categories.map((category, index) => <div key={category.id} className="space-y-5 rounded-2xl border border-[#e4ddd7] bg-[#fffdfb] p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="mr-auto text-lg font-black uppercase">{category.title || `Категория ${index + 1}`}</h3>
                  <button type="button" disabled={index === 0} onClick={() => moveCategory(index, -1)} className="rounded-lg border px-3 py-2 disabled:opacity-30" aria-label="Премести категория нагоре">↑</button>
                  <button type="button" disabled={index === c.products.categories.length - 1} onClick={() => moveCategory(index, 1)} className="rounded-lg border px-3 py-2 disabled:opacity-30" aria-label="Премести категория надолу">↓</button>
                  <button type="button" onClick={() => change(d => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.visible = !category.visible; })} className="rounded-lg border px-3 py-2">{category.visible ? 'Скрий' : 'Покажи'}</button>
                  <button type="button" onClick={() => { if (window.confirm('Да изтрия ли категорията и продуктите ѝ?')) change(d => { for (const lang of ['bg','en'] as const) d[lang].products.categories = d[lang].products.categories.filter(item => item.id !== category.id); }); }} className="rounded-lg border border-[#c88982] px-3 py-2 text-[#8d2e2b]">Изтрий</button>
                </div>
                {field('Име на категорията', category.title, v => change(d => d[language].products.categories[index].title = v))}
                {field('Описание на категорията', category.description, v => change(d => d[language].products.categories[index].description = v), true)}
                {imagePicker('Снимка на категорията', category.image, (d, url) => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.image = url; }, true)}
                <h4 className="border-t pt-5 font-black uppercase">Продукти ({category.items.length})</h4>
                {category.items.map((product, itemIndex) => <div key={product.id} className="space-y-3 rounded-xl border border-[#e4ddd7] bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2"><strong className="mr-auto">{product.title || `Продукт ${itemIndex + 1}`}</strong>
                    <button type="button" disabled={itemIndex === 0} onClick={() => moveProduct(category.id, itemIndex, -1)} className="rounded-lg border px-3 py-1 disabled:opacity-30" aria-label="Премести продукт нагоре">↑</button>
                    <button type="button" disabled={itemIndex === category.items.length - 1} onClick={() => moveProduct(category.id, itemIndex, 1)} className="rounded-lg border px-3 py-1 disabled:opacity-30" aria-label="Премести продукт надолу">↓</button>
                    <button type="button" onClick={() => change(d => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.items.find(item => item.id === product.id)!.visible = !product.visible; })} className="rounded-lg border px-3 py-1">{product.visible ? 'Скрий' : 'Покажи'}</button>
                    <button type="button" onClick={() => change(d => { for (const lang of ['bg','en'] as const) { const items = d[lang].products.categories.find(item => item.id === category.id)!.items; items.splice(items.findIndex(item => item.id === product.id), 1); } })} className="rounded-lg border border-[#c88982] px-3 py-1 text-[#8d2e2b]" aria-label={`Изтрий ${product.title}`}>Изтрий</button>
                  </div>
                  {field('Име на продукта', product.title, v => change(d => d[language].products.categories[index].items[itemIndex].title = v))}
                  {field('Описание (по избор)', product.description, v => change(d => d[language].products.categories[index].items[itemIndex].description = v), true)}
                  {imagePicker(`Снимка на ${product.title}`, product.image, (d, url) => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.items.find(item => item.id === product.id)!.image = url; }, true)}
                </div>)}
                <button type="button" onClick={() => change(d => { const id = crypto.randomUUID(); for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.items.push({ id, title: lang === 'bg' ? 'Нов продукт' : 'New product', description: '', image: '', visible: true }); })} className="rounded-xl border border-[#08733a] px-4 py-2 font-bold text-[#08733a]">+ Добави продукт</button>
              </div>)}
              <button type="button" onClick={() => change(d => { const id = `category-${crypto.randomUUID()}`; for (const lang of ['bg','en'] as const) d[lang].products.categories.push({ id, title: lang === 'bg' ? 'Нова категория' : 'New category', description: '', image: '', visible: true, items: [] }); })} className="rounded-xl bg-[#211914] px-5 py-3 font-bold text-white">+ Добави категория</button>
            </>}
            {section === 'feed' && <>
              <label className="mb-6 flex items-start gap-3 rounded-xl border border-[#e4ddd7] bg-[#f6f3ef] p-4 text-sm font-bold text-[#211915]">
                <input type="checkbox" checked={draft.rafflesEnabled === true} onChange={event => change(d => { d.rafflesEnabled = event.target.checked; })} className="mt-1 h-4 w-4 accent-[#08733a]" />
                <span>Показвай томболите на сайта<span className="mt-1 block font-normal text-[#625851]">Секцията се появява над новините и събитията, ако има поне една публикувана активна томбола.</span></span>
              </label>
              <p className="text-sm leading-relaxed text-[#625851]">Всяка публикация е отделна секция със заглавие, текст и избор на медия. При избрана снимка, видео или слайдшоу без добавен файл се показва плейсхолдър. Подредбата е по дата. За началното слайдшоу е нужна реална снимка. Попълнете заглавие и текст на BG и EN преди публикуване.</p>
              {[...draft.feed].sort((a, b) => b.date.localeCompare(a.date)).map(item => <div key={item.id} className="space-y-5 rounded-2xl border border-[#e4ddd7] bg-[#fffdfb] p-5">
                <div className="flex flex-wrap items-center gap-2"><h3 className="mr-auto text-lg font-black">{(language === 'bg' ? item.titleBg : item.titleEn) || 'Нова публикация'}</h3>
                  <button type="button" onClick={() => change(d => { d.feed.find(post => post.id === item.id)!.visible = !item.visible; })} className="rounded-lg border px-3 py-2">{item.visible ? 'Публикувана · скрий' : 'Чернова · публикувай'}</button>
                  <button type="button" onClick={() => change(d => { d.feed.find(post => post.id === item.id)!.featured = !item.featured; })} className="rounded-lg border px-3 py-2">{item.featured ? 'В слайдшоу ✓' : 'Добави в слайдшоу'}</button>
                  <button type="button" onClick={() => { if (window.confirm('Да изтрия ли публикацията?')) change(d => { d.feed = d.feed.filter(post => post.id !== item.id); }); }} className="rounded-lg border border-[#c88982] px-3 py-2 text-[#8d2e2b]">Изтрий</button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="text-sm font-bold">Вид<select value={item.type} onChange={event => change(d => { d.feed.find(post => post.id === item.id)!.type = event.target.value as typeof item.type; })} className="mt-2 block w-full rounded-xl border border-[#d8d0c8] bg-white p-3"><option value="news">Новина</option><option value="event">Събитие</option><option value="raffle">Томбола</option></select></label>
                  <label className="text-sm font-bold">Дата<input type="date" value={item.date} onChange={event => change(d => { d.feed.find(post => post.id === item.id)!.date = event.target.value; })} className="mt-2 block w-full rounded-xl border border-[#d8d0c8] p-3" /></label>
                  {item.type === 'raffle' && <label className="text-sm font-bold">Край на томболата<input type="date" value={item.endDate} min={item.date} onChange={event => change(d => { d.feed.find(post => post.id === item.id)!.endDate = event.target.value; })} className="mt-2 block w-full rounded-xl border border-[#d8d0c8] p-3" /></label>}
                </div>
                {field(`Заглавие · ${name}`, language === 'bg' ? item.titleBg : item.titleEn, value => change(d => { d.feed.find(post => post.id === item.id)![language === 'bg' ? 'titleBg' : 'titleEn'] = value; }))}
                {field(`Текст · ${name}`, language === 'bg' ? item.bodyBg : item.bodyEn, value => change(d => { d.feed.find(post => post.id === item.id)![language === 'bg' ? 'bodyBg' : 'bodyEn'] = value; }), true)}
                <fieldset className="space-y-3 rounded-xl border border-[#e4ddd7] p-4">
                  <legend className="px-1 text-sm font-black">Медия в публикацията</legend>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {([['none', 'Без медия'], ['image', 'Снимка'], ['video', 'Видео'], ['slideshow', 'Слайдшоу']] as const).map(([value, label]) => <label key={value} className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold">
                      <input type="radio" name={`feed-media-${item.id}`} value={value} checked={feedMediaType(item) === value} onChange={() => change(d => { d.feed.find(post => post.id === item.id)!.mediaType = value as FeedMediaType; })} className="accent-[#08733a]" />{label}
                    </label>)}
                  </div>
                </fieldset>
                {feedMediaType(item) === 'image' && imagePicker('Снимка на публикацията', item.image, (d, url) => { d.feed.find(post => post.id === item.id)!.image = url; }, true)}
                {feedMediaType(item) === 'slideshow' && <div className="space-y-3 rounded-xl border border-[#e4ddd7] p-4">
                  <h4 className="font-black">Слайдшоу в секцията · до 12 снимки</h4>
                  {(item.images || []).map((url, index) => <div key={`${url}-${index}`} className="flex flex-wrap items-center gap-3 border-b pb-3 last:border-0">
                    <Image src={url.startsWith('/api/') ? apiUrl(url) : url} alt={`Слайд ${index + 1}`} width={96} height={64} unoptimized className="h-16 w-24 rounded object-cover" />
                    <span className="mr-auto text-sm">Снимка {index + 1}</span>
                    <button type="button" disabled={index === 0} onClick={() => change(d => { const photos = d.feed.find(post => post.id === item.id)!.images!; [photos[index - 1], photos[index]] = [photos[index], photos[index - 1]]; })} className="rounded border px-2 py-1 disabled:opacity-30" aria-label="Премести снимката наляво">←</button>
                    <button type="button" disabled={index === (item.images?.length || 0) - 1} onClick={() => change(d => { const photos = d.feed.find(post => post.id === item.id)!.images!; [photos[index], photos[index + 1]] = [photos[index + 1], photos[index]]; })} className="rounded border px-2 py-1 disabled:opacity-30" aria-label="Премести снимката надясно">→</button>
                    <button type="button" onClick={() => change(d => { d.feed.find(post => post.id === item.id)!.images!.splice(index, 1); })} className="rounded border border-[#c88982] px-2 py-1 text-[#8d2e2b]">Изтрий</button>
                  </div>)}
                  <label className="block text-sm font-bold">Добави снимки от устройство
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={busy || (item.images?.length || 0) >= 12} className="mt-2 block w-full font-normal" onChange={async event => { const files = Array.from(event.target.files || []).slice(0, 12 - (item.images?.length || 0)); event.target.value = ''; for (const file of files) await upload(file, (d, url) => { const photos = d.feed.find(post => post.id === item.id)!; photos.images = [...(photos.images || []), url]; }); }} />
                  </label>
                </div>}
                {feedMediaType(item) === 'video' && field('Видео URL (YouTube, Vimeo или HTTPS .mp4)', item.videoUrl || '', value => change(d => { d.feed.find(post => post.id === item.id)!.videoUrl = value.trim(); }))}
              </div>)}
              <button type="button" disabled={draft.feed.length >= 30} onClick={() => change(d => { d.feed.unshift({ id: `post-${crypto.randomUUID()}`, type: 'news', date: new Date().toISOString().slice(0, 10), endDate: '', image: '', mediaType: 'image', visible: false, featured: false, titleBg: '', titleEn: '', bodyBg: '', bodyEn: '' }); })} className="rounded-xl bg-[#211914] px-5 py-3 font-bold text-white disabled:opacity-50">+ Добави публикация</button>
            </>}
            {section === 'about' && <>
              {field('Надпис', c.about.eyebrow, v => change(d => d[language].about.eyebrow = v))}
              {field('Заглавие', c.about.title, v => change(d => d[language].about.title = v))}
              {field('Описание', c.about.copy, v => change(d => d[language].about.copy = v), true)}
              {c.about.rows.map((row, index) => <div key={index} className="grid gap-3 rounded-xl border p-4 md:grid-cols-2">
                {field(`Ред ${index + 1} · етикет`, row.label, v => change(d => d[language].about.rows[index].label = v))}
                {field('Текст', row.copy, v => change(d => d[language].about.rows[index].copy = v), true)}
              </div>)}
            </>}
            {section === 'contact' && <>
              {field('Заглавие', c.contact.heading, v => change(d => d[language].contact.heading = v))}
              {field('Адрес', c.contact.address, v => change(d => d[language].contact.address = v))}
              {field('Телефон', c.contact.phone, v => change(d => d[language].contact.phone = v))}
              {c.contact.hours.map((row, index) => <div key={index} className="grid gap-3 md:grid-cols-2">{field(`Ден ${index + 1}`, row.day, v => change(d => d[language].contact.hours[index].day = v))}{field('Часове', row.hours, v => change(d => d[language].contact.hours[index].hours = v))}</div>)}
              {field('Бележка', c.contact.note, v => change(d => d[language].contact.note = v))}
            </>}
            {section === 'images' && (['logo', 'store', 'products', 'about'] as const).map(key => <div key={key} className="rounded-xl border p-5">
              <h3 className="mb-3 font-black">{{logo:'Лого',store:'Снимка на магазина',products:'Снимка на продуктите',about:'Снимка за „За нас“'}[key]}</h3>
              {imagePicker(`Качи ${key}`, draft.media[key] || '', (d, url) => { d.media[key] = url; })}
            </div>)}
          </div>
          <button type="button" disabled={busy} onClick={save} className="mt-8 rounded-xl bg-[#08733a] px-7 py-3 font-black text-white disabled:opacity-50">Запази промените</button>
        </>}
      {message && <p role="status" className="mt-5 rounded-xl border border-[#dfd4c5] bg-[#fffdf7] p-4">{message}</p>}
    </div>
  </section>;
}
