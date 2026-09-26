'use client';

import { useEffect, useState } from 'react';
import { apiUrl } from '@/lib/api';
import { defaults, validContent, type SiteContent } from '@/lib/content';

type Lang = 'bg' | 'en';
const tokenKey = 'elenski-admin-session';

export default function SiteControl() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [draft, setDraft] = useState<SiteContent>(defaults);
  const [language, setLanguage] = useState<Lang>('bg');
  const [section, setSection] = useState<'home' | 'products' | 'about' | 'contact' | 'images'>('home');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(tokenKey);
    if (!saved) { queueMicrotask(() => setReady(true)); return; }
    fetch(apiUrl('/api/admin/session'), { headers: { Authorization: `Bearer ${saved}` }, cache: 'no-store' })
      .then(r => { if (r.ok) setToken(saved); else sessionStorage.removeItem(tokenKey); })
      .catch(() => setMessage('API не е достъпен.'))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch(apiUrl('/api/content'), { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (validContent(data)) setDraft(data); })
      .catch(() => setMessage('Съдържанието не се зареди. Проверете връзката с API.'));
  }, [token]);

  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch(apiUrl('/api/admin/login'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (!response.ok) { setMessage(response.status === 429 ? 'Твърде много опити. Опитайте след 15 минути.' : response.status === 503 ? 'Админ достъпът не е конфигуриран на сървъра.' : 'Грешна парола.'); return; }
      const data = await response.json();
      sessionStorage.setItem(tokenKey, data.token);
      setToken(data.token); setPassword('');
    } catch { setMessage('API не е достъпен.'); }
    finally { setBusy(false); }
  }

  function change(update: (copy: SiteContent) => void) {
    setDraft(current => { const copy = structuredClone(current); update(copy); return copy; });
    setMessage('Има незаписани промени.');
  }

  async function save() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch(apiUrl('/api/admin/content'), { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(draft) });
      if (response.status === 401) { sessionStorage.removeItem(tokenKey); setToken(''); setMessage('Сесията изтече. Влезте отново.'); }
      else setMessage(response.ok ? 'Промените са записани. Опреснете сайта, за да ги видите.' : 'Записът не успя. Проверете полетата и API.');
    } catch { setMessage('API не е достъпен.'); }
    finally { setBusy(false); }
  }

  async function upload(key: 'logo' | 'store' | 'products', file: File) {
    setBusy(true); setMessage('');
    try {
      const data = new FormData(); data.append('file', file);
      const response = await fetch(apiUrl('/api/images'), { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: data });
      if (!response.ok) { setMessage(response.status === 401 ? 'Сесията изтече. Влезте отново.' : 'Качването не успя. Изберете JPEG, PNG или WebP до 5 MB.'); return; }
      const result = await response.json();
      change(d => d.media[key] = result.url);
      setMessage('Снимката е качена. Натиснете „Запази промените“, за да я покажете на сайта.');
    } catch { setMessage('API не е достъпен.'); }
    finally { setBusy(false); }
  }

  const field = (label: string, value: string, onChange: (value: string) => void, multiline = false) => (
    <label className="block text-sm font-bold text-[#332923]" key={label}>
      <span className="mb-2 block">{label}</span>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-[#d8d0c8] bg-white p-3 font-normal outline-none focus:border-[#08733a]" /> :
        <input value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-[#d8d0c8] bg-white p-3 font-normal outline-none focus:border-[#08733a]" />}
    </label>
  );
  const c = draft[language];
  const name = language === 'bg' ? 'Български' : 'English';
  const sections = { home: 'Начало', products: 'Продукти', about: 'За нас', contact: 'Контакти', images: 'Изображения' };

  return <section className="min-h-[70vh] bg-[#f6f3ef] px-4 py-12">
    <div className="mx-auto max-w-5xl rounded-2xl border border-[#e4ddd7] bg-white p-6 shadow-sm md:p-10">
      <h1 className="text-3xl font-black uppercase">Управление на сайта</h1>
      {!ready ? <p className="mt-6">Проверка на достъпа…</p> : !token ?
        <form onSubmit={login} className="mt-8 max-w-sm space-y-5">
          <label className="block font-bold">Парола<input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d8d0c8] p-3" /></label>
          <button disabled={busy} className="rounded-xl bg-[#08733a] px-6 py-3 font-bold text-white disabled:opacity-50">Вход</button>
        </form> : <>
          <div className="mt-7 flex flex-wrap gap-3 border-b border-[#e4ddd7] pb-6">
            {(['home','products','about','contact','images'] as const).map(key => <button type="button" key={key} onClick={() => setSection(key)} aria-pressed={section === key} className={`rounded-xl px-4 py-2 font-bold ${section === key ? 'bg-[#08733a] text-white' : 'bg-[#f1ede9]'}`}>{sections[key]}</button>)}
            <button type="button" onClick={() => { sessionStorage.removeItem(tokenKey); setToken(''); }} className="ml-auto rounded-xl border px-4 py-2 font-bold">Изход</button>
          </div>
          <div className="mt-6 flex gap-3">{(['bg','en'] as const).map(lang => <button type="button" key={lang} onClick={() => setLanguage(lang)} aria-pressed={language === lang} className={`rounded-xl px-4 py-2 font-bold ${language === lang ? 'bg-[#211914] text-white' : 'bg-[#f1ede9]'}`}>{lang === 'bg' ? 'BG' : 'EN'}</button>)}</div>
          <h2 className="my-6 text-xl font-black">{sections[section]} · {name}</h2>
          <div className="grid gap-5">
            {section === 'home' && <>
              {field('Надпис', c.home.eyebrow, v => change(d => d[language].home.eyebrow = v))}
              {field('Заглавие', c.home.title, v => change(d => d[language].home.title = v))}
              {field('Текст на линка', c.home.view, v => change(d => d[language].home.view = v))}
            </>}
            {section === 'products' && c.products.categories.map((category, index) => <div key={index} className="space-y-4 rounded-xl border p-5">
              <h3 className="font-black">Категория {index + 1}</h3>
              {field('Име', category.title, v => change(d => d[language].products.categories[index].title = v))}
              {category.items.map((item, itemIndex) => <div key={itemIndex} className="flex items-end gap-2"> <div className="flex-1">{field(`Продукт ${itemIndex + 1}`, item, v => change(d => d[language].products.categories[index].items[itemIndex] = v))}</div><button type="button" aria-label={`Премахни продукт ${itemIndex + 1}`} onClick={() => change(d => d[language].products.categories[index].items.splice(itemIndex, 1))} className="rounded-xl border px-4 py-3">✕</button></div>)}
              <button type="button" onClick={() => change(d => d[language].products.categories[index].items.push('Нов продукт'))} className="rounded-xl border border-[#08733a] px-4 py-2 font-bold text-[#08733a]">Добави продукт</button>
            </div>)}
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
            {section === 'images' && (['logo', 'store', 'products'] as const).map(key => <div key={key} className="rounded-xl border p-5">
              <h3 className="mb-3 font-black">{{logo:'Лого',store:'Снимка на магазина',products:'Снимка на продуктите'}[key]}</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={draft.media[key].startsWith('/api/') ? apiUrl(draft.media[key]) : draft.media[key]} alt="Преглед" className="mb-4 h-36 max-w-full rounded-xl object-contain" />
              <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} aria-label={`Качи ${key}`} onChange={event => { const file = event.target.files?.[0]; if (file) void upload(key, file); event.target.value = ''; }} className="block w-full text-sm" />
            </div>)}
          </div>
          <button type="button" disabled={busy} onClick={save} className="mt-8 rounded-xl bg-[#08733a] px-7 py-3 font-black text-white disabled:opacity-50">Запази промените</button>
        </>}
      {message && <p role="status" className="mt-5 rounded-xl border border-[#dfd4c5] bg-[#fffdf7] p-4">{message}</p>}
    </div>
  </section>;
}
