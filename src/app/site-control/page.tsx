'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiUrl } from '@/lib/api';
import { defaultImagePlacement, defaults, feedMediaType, normalizeContent, type FeedItem, type FeedMediaType, type ImageFrame, type ImagePlacement, type SiteContent } from '@/lib/content';
import EditableImage, { ImageEditActions } from '@/components/EditableImage';
import './site-control.css';

type Lang = 'bg' | 'en';
const tokenKey = 'elenski-admin-session';

function removeUnusedPlacement(post: FeedItem, url: string) {
  if (url && url !== post.image && !post.images?.includes(url) && post.imagePlacements) delete post.imagePlacements[url];
}

export default function SiteControl() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const [draft, setDraft] = useState<SiteContent>(defaults);
  const [language, setLanguage] = useState<Lang>('bg');
  const [section, setSection] = useState<'home' | 'products' | 'feed' | 'about' | 'contact' | 'images' | 'stats'>('home');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [dragZone, setDragZone] = useState('');
  const [previewMode, setPreviewMode] = useState<'list' | 'detail'>('list');
  const [activeFeedId, setActiveFeedId] = useState('');
  const previewFrame = useRef<HTMLIFrameElement>(null);

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
      .then(r => {
        if (r.status === 204) return null;
        if (!r.ok) throw new Error(`Content API returned ${r.status}`);
        return r.json();
      })
      .then(data => { const parsed = normalizeContent(data); if (parsed) setDraft(parsed); })
      .catch(() => setMessage('Съдържанието не се зареди. Проверете връзката с API.'));
  }, [token]);

  function change(update: (copy: SiteContent) => void) {
    setDraft(current => { const copy = structuredClone(current); update(copy); return copy; });
    setMessage('Има незаписани промени.');
  }

  const sortedFeed = [...draft.feed].sort((a, b) => b.date.localeCompare(a.date));
  const selectedFeedId = sortedFeed.some(item => item.id === activeFeedId) ? activeFeedId : sortedFeed[0]?.id;
  const selectedFeed = sortedFeed.find(item => item.id === selectedFeedId);

  function updatePagePreview() {
    if (!selectedFeed) return;
    previewFrame.current?.contentWindow?.postMessage({ type: 'site-control-preview', language, mode: previewMode, item: {
      ...selectedFeed,
      titleBg: selectedFeed.titleBg || 'Заглавие на публикацията',
      titleEn: selectedFeed.titleEn || 'Post title',
      bodyBg: selectedFeed.bodyBg || 'Текстът на публикацията ще се покаже тук.',
      bodyEn: selectedFeed.bodyEn || 'Post text will appear here.',
    } }, window.location.origin);
  }

  useEffect(() => {
    if (section !== 'feed') return;
    updatePagePreview();
    function handlePreviewMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== previewFrame.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === 'site-control-preview-ready') { updatePagePreview(); return; }
      if (!selectedFeed || data?.itemId !== selectedFeed.id) return;
      if (data?.type === 'site-control-preview-frame') {
        if (!['original', 'wide', 'landscape', 'square', 'portrait'].includes(data.frame)) return;
        change(d => { d.feed.find(item => item.id === data.itemId)!.imageFrame = data.frame as ImageFrame; });
      }
      if (data?.type === 'site-control-preview-placement') {
        const { url, placement } = data as { url: string; placement: ImagePlacement };
        if (![selectedFeed.image, ...(selectedFeed.images || [])].includes(url) || !placement ||
            !['cover', 'contain'].includes(placement.fit) || ![placement.x, placement.y, placement.zoom ?? 1].every(Number.isFinite) ||
            placement.x < 0 || placement.x > 100 || placement.y < 0 || placement.y > 100 || (placement.zoom ?? 1) < 1 || (placement.zoom ?? 1) > 3) return;
        change(d => { const post = d.feed.find(item => item.id === data.itemId)!; post.imagePlacements ||= {}; post.imagePlacements[url] = placement; });
      }
    }
    window.addEventListener('message', handlePreviewMessage);
    return () => window.removeEventListener('message', handlePreviewMessage);
  // The preview must receive the latest draft on every edit, including image dragging.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, section, selectedFeedId, language, previewMode]);

  async function save() {
    for (const lang of ['bg', 'en'] as const) {
      const contact = draft[lang].contact;
      if (contact.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) { setMessage('Въведете валиден имейл адрес.'); return; }
      const special = contact.specialHours || [];
      if (special.length > 30 || new Set(special.map(row => row.date)).size !== special.length ||
          special.some(row => { const day = new Date(`${row.date}T12:00:00Z`); return !/^\d{4}-\d{2}-\d{2}$/.test(row.date) || Number.isNaN(day.getTime()) || day.toISOString().slice(0, 10) !== row.date || !row.label.trim() || !row.hours.trim(); })) {
        setMessage('За всяка специална дата попълнете валидна дата, повод и работно време на BG и EN. Датите не трябва да се повтарят.'); return;
      }
    }
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

  async function uploadFiles(files: File[], apply: (draft: SiteContent, url: string) => void, limit = 1) {
    const selected = files.slice(0, limit);
    if (!selected.length) { setMessage('Поставете или пуснете изображение JPEG, PNG или WebP.'); return; }
    if (selected.some(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setMessage('Изберете JPEG, PNG или WebP до 5 MB.'); return;
    }
    setBusy(true); setMessage('');
    try {
      for (const file of selected) {
        const data = new FormData(); data.append('file', file);
        const response = await fetch(apiUrl('/api/images'), { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: data });
        if (!response.ok) { setMessage(response.status === 401 ? 'Сесията изтече. Влезте отново.' : 'Качването не успя. Изберете JPEG, PNG или WebP до 5 MB.'); return; }
        const result = await response.json();
        change(d => apply(d, result.url));
      }
      setMessage('Снимките са качени. Натиснете „Запази промените“, за да ги покажете на сайта.');
    } catch { setMessage('API не е достъпен.'); }
    finally { setBusy(false); }
  }

  async function pasteFromClipboard(apply: (draft: SiteContent, url: string) => void, limit = 1) {
    try {
      if (!navigator.clipboard?.read) { setMessage('Кликнете в полето за снимка и натиснете Ctrl+V.'); return; }
      const entries = await navigator.clipboard.read();
      const files: File[] = [];
      for (const entry of entries) {
        const type = entry.types.find(value => ['image/png', 'image/jpeg', 'image/webp'].includes(value));
        if (type) files.push(new File([await entry.getType(type)], 'clipboard-image', { type }));
      }
      await uploadFiles(files, apply, limit);
    } catch { setMessage('Разрешете достъп до клипборда или кликнете в полето и натиснете Ctrl+V.'); }
  }

  function uploadSlideFiles(files: File[], itemId: string) {
    const remaining = 12 - (draft.feed.find(item => item.id === itemId)?.images?.length || 0);
    if (remaining <= 0) { setMessage('Максимум 12 снимки за публикация.'); return; }
    void uploadFiles(files, (d, url) => { const post = d.feed.find(item => item.id === itemId)!; post.images = [...(post.images || []), url]; }, remaining);
  }

  function pasteSlides(itemId: string) {
    const remaining = 12 - (draft.feed.find(item => item.id === itemId)?.images?.length || 0);
    if (remaining <= 0) { setMessage('Максимум 12 снимки за публикация.'); return; }
    void pasteFromClipboard((d, url) => { const post = d.feed.find(item => item.id === itemId)!; post.images = [...(post.images || []), url]; }, remaining);
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

  function addCategory() {
    if (draft.bg.products.categories.length >= 24) { setMessage('Максимум 24 категории.'); return; }
    change(d => { const id = `category-${crypto.randomUUID()}`; for (const lang of ['bg','en'] as const) d[lang].products.categories.unshift({ id, title: lang === 'bg' ? 'Нова категория' : 'New category', description: '', image: '', visible: true, items: [] }); });
  }

  function addAboutRow() {
    if (draft.bg.about.rows.length >= 20 || draft.en.about.rows.length >= 20) { setMessage('Максимум 20 етикета.'); return; }
    change(d => {
      d.bg.about.rows.push({ label: 'Нов етикет', copy: '' });
      d.en.about.rows.push({ label: 'New label', copy: '' });
    });
  }

  function moveAboutRow(index: number, delta: number) {
    change(d => { for (const lang of ['bg', 'en'] as const) {
      const rows = d[lang].about.rows;
      if (index + delta < 0 || index + delta >= rows.length) continue;
      [rows[index], rows[index + delta]] = [rows[index + delta], rows[index]];
    }});
  }

  function removeAboutRow(index: number) {
    if (!window.confirm('Да изтрия ли етикета и текста му на двата езика?')) return;
    change(d => { for (const lang of ['bg', 'en'] as const) d[lang].about.rows.splice(index, 1); });
  }

  function addSpecialHours() {
    if ((draft.bg.contact.specialHours?.length || 0) >= 30) { setMessage('Максимум 30 специални дати.'); return; }
    change(d => {
      const id = crypto.randomUUID();
      for (const lang of ['bg', 'en'] as const) {
        d[lang].contact.specialHours ||= [];
        d[lang].contact.specialHours.push({ id, date: '', label: lang === 'bg' ? 'Празник' : 'Holiday', hours: '' });
      }
    });
  }

  function removeSpecialHours(id: string) {
    if (!window.confirm('Да изтрия ли специалното работно време за тази дата?')) return;
    change(d => { for (const lang of ['bg', 'en'] as const) d[lang].contact.specialHours = (d[lang].contact.specialHours || []).filter(row => row.id !== id); });
  }

  const imagePicker = (label: string, path: string, apply: (draft: SiteContent, url: string) => void, removable = false, zoneId = label, placement?: ImagePlacement, onPlacementChange?: (draft: SiteContent, placement: ImagePlacement) => void, ratio = '5 / 4') => <div className="space-y-2">
    <label className="mb-2 block text-sm font-bold">{label}</label>
    {path && (onPlacementChange ? <div className="max-w-xl space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-[#eae4dd]" style={{ aspectRatio: ratio }}>
        <EditableImage key={path} url={path} alt={`Преглед: ${label}`} placement={placement || defaultImagePlacement} onChange={value => change(d => onPlacementChange(d, value))} />
      </div>
      <ImageEditActions placement={placement || defaultImagePlacement} onChange={value => change(d => onPlacementChange(d, value))} />
    </div> : <Image src={path.startsWith('/api/') ? apiUrl(path) : path} alt="Преглед" width={160} height={112} unoptimized className="mb-3 h-28 max-w-full rounded-lg object-contain" />)}
    <div role="group" aria-label={label} tabIndex={0} className={`admin-dropzone ${dragZone === zoneId ? 'admin-dropzone-active' : ''}`}
      onDragOver={event => { event.preventDefault(); if (!busy) setDragZone(zoneId); }}
      onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragZone(''); }}
      onDrop={event => { event.preventDefault(); setDragZone(''); if (!busy) void uploadFiles(Array.from(event.dataTransfer.files), apply); }}
      onPaste={event => { const files = Array.from(event.clipboardData.items).map(item => item.getAsFile()).filter((file): file is File => !!file); if (files.length) { event.preventDefault(); if (!busy) void uploadFiles(files, apply); } }}>
      <p className="text-sm font-medium">Пуснете снимка тук или кликнете в полето и натиснете Ctrl+V</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} aria-label={`Избор от устройство: ${label}`} onChange={event => { const file = event.target.files?.[0]; if (file) void uploadFiles([file], apply); event.target.value = ''; }} className="max-w-full text-sm" />
        <button type="button" disabled={busy} onClick={() => void pasteFromClipboard(apply)} className="rounded-lg border border-[#08733a] px-3 py-2 text-sm font-bold text-[#08733a]">Постави от клипборда</button>
      </div>
    </div>
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
    <div className="admin-panel w-full rounded-2xl border border-[#e4ddd7] bg-white p-6 shadow-sm md:p-10">
      <h1 className="text-3xl font-black uppercase">Управление на сайта</h1>
      {!ready || !token ? <p className="mt-6">Проверка на достъпа…</p> : <>
          <div className="mt-7 flex flex-wrap items-center gap-3 border-b border-[#e4ddd7] pb-6 xl:flex-nowrap">
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
              <p className="text-sm text-[#625851]">Управлявайте началното слайдшоу с бутона „Добави в слайдшоу“ при публикациите. Ако публикацията има няколко снимки, всяка става отделен слайд. Без избрани публикации се показват снимките на магазина и продуктите от „Изображения“.</p>
            </>}
            {section === 'products' && <>
              {field('Текст на бутона към категориите', c.home.view, v => change(d => d[language].home.view = v))}
              <p className="text-sm leading-relaxed text-[#625851]">Категориите и продуктите се подреждат еднакво за BG и EN. Редактирайте имената и описанията на двата езика. Няма количка, плащания или онлайн поръчки.</p>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d5e7db] bg-[#f1f8f3] p-4">
                <strong>Категории ({c.products.categories.length})</strong>
                <button type="button" disabled={c.products.categories.length >= 24} onClick={addCategory} className="rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">+ Добави категория</button>
              </div>
              {c.products.categories.map((category, index) => <div key={category.id} className="space-y-5 rounded-2xl border border-[#e4ddd7] bg-[#fffdfb] p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="mr-auto text-lg font-black uppercase">{category.title || `Категория ${index + 1}`}</h3>
                  <button type="button" disabled={index === 0} onClick={() => moveCategory(index, -1)} className="rounded-lg border px-3 py-2 disabled:opacity-30" aria-label="Премести категория нагоре">↑</button>
                  <button type="button" disabled={index === c.products.categories.length - 1} onClick={() => moveCategory(index, 1)} className="rounded-lg border px-3 py-2 disabled:opacity-30" aria-label="Премести категория надолу">↓</button>
                  <button type="button" onClick={() => change(d => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.visible = !category.visible; })} className="rounded-lg border px-3 py-2">{category.visible ? 'Скрий' : 'Покажи'}</button>
                  <button type="button" onClick={() => { if (window.confirm('Да изтрия ли категорията и продуктите ѝ?')) change(d => { for (const lang of ['bg','en'] as const) d[lang].products.categories = d[lang].products.categories.filter(item => item.id !== category.id); }); }} className="rounded-lg border border-[#c88982] px-3 py-2 text-[#8d2e2b]">Изтрий</button>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {field('Име на категорията', category.title, v => change(d => d[language].products.categories[index].title = v))}
                  {field('Описание на категорията', category.description, v => change(d => d[language].products.categories[index].description = v), true)}
                </div>
                {imagePicker('Снимка на категорията', category.image, (d, url) => { for (const lang of ['bg','en'] as const) { const entry = d[lang].products.categories.find(item => item.id === category.id)!; entry.image = url; entry.imagePlacement = { ...defaultImagePlacement }; } }, true, category.id, category.imagePlacement, (d, value) => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.imagePlacement = value; })}
                <h4 className="border-t pt-5 font-black uppercase">Продукти ({category.items.length})</h4>
                {category.items.map((product, itemIndex) => <div key={product.id} className="space-y-3 rounded-xl border border-[#e4ddd7] bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2"><strong className="mr-auto">{product.title || `Продукт ${itemIndex + 1}`}</strong>
                    <button type="button" disabled={itemIndex === 0} onClick={() => moveProduct(category.id, itemIndex, -1)} className="rounded-lg border px-3 py-1 disabled:opacity-30" aria-label="Премести продукт нагоре">↑</button>
                    <button type="button" disabled={itemIndex === category.items.length - 1} onClick={() => moveProduct(category.id, itemIndex, 1)} className="rounded-lg border px-3 py-1 disabled:opacity-30" aria-label="Премести продукт надолу">↓</button>
                    <button type="button" onClick={() => change(d => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.items.find(item => item.id === product.id)!.visible = !product.visible; })} className="rounded-lg border px-3 py-1">{product.visible ? 'Скрий' : 'Покажи'}</button>
                    <button type="button" onClick={() => change(d => { for (const lang of ['bg','en'] as const) { const items = d[lang].products.categories.find(item => item.id === category.id)!.items; items.splice(items.findIndex(item => item.id === product.id), 1); } })} className="rounded-lg border border-[#c88982] px-3 py-1 text-[#8d2e2b]" aria-label={`Изтрий ${product.title}`}>Изтрий</button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {field('Име на продукта', product.title, v => change(d => d[language].products.categories[index].items[itemIndex].title = v))}
                    {field('Описание (по избор)', product.description, v => change(d => d[language].products.categories[index].items[itemIndex].description = v), true)}
                  </div>
                  {imagePicker(`Снимка на ${product.title}`, product.image, (d, url) => { for (const lang of ['bg','en'] as const) { const entry = d[lang].products.categories.find(item => item.id === category.id)!.items.find(item => item.id === product.id)!; entry.image = url; entry.imagePlacement = { ...defaultImagePlacement }; } }, true, product.id, product.imagePlacement, (d, value) => { for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.items.find(item => item.id === product.id)!.imagePlacement = value; })}
                </div>)}
                <button type="button" onClick={() => change(d => { const id = crypto.randomUUID(); for (const lang of ['bg','en'] as const) d[lang].products.categories.find(item => item.id === category.id)!.items.push({ id, title: lang === 'bg' ? 'Нов продукт' : 'New product', description: '', image: '', visible: true }); })} className="rounded-xl border border-[#08733a] px-4 py-2 font-bold text-[#08733a]">+ Добави продукт</button>
              </div>)}
              <button type="button" disabled={c.products.categories.length >= 24} onClick={addCategory} className="w-fit rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">+ Добави категория</button>
            </>}
            {section === 'feed' && <>
              <label className="mb-6 flex items-start gap-3 rounded-xl border border-[#e4ddd7] bg-[#f6f3ef] p-4 text-sm font-bold text-[#211915]">
                <input type="checkbox" checked={draft.rafflesEnabled === true} onChange={event => change(d => { d.rafflesEnabled = event.target.checked; })} className="mt-1 h-4 w-4 accent-[#08733a]" />
                <span>Показвай томболите на сайта<span className="mt-1 block font-normal text-[#625851]">Секцията се появява над новините и събитията, ако има поне една публикувана активна томбола.</span></span>
              </label>
              <p className="text-sm leading-relaxed text-[#625851]">Всяка публикация е отделна секция със заглавие, текст и избор на медия. При избрана снимка, видео или слайдшоу без добавен файл се показва плейсхолдър. Подредбата е по дата. За началното слайдшоу е нужна реална снимка. Попълнете заглавие и текст на BG и EN преди публикуване.</p>
              <div className="flex flex-wrap gap-2" aria-label="Избери публикация за редактиране">
                {sortedFeed.map(item => <button key={item.id} type="button" onClick={() => setActiveFeedId(item.id)} aria-pressed={item.id === selectedFeedId} className={`rounded-xl border px-4 py-2 text-sm font-bold ${item.id === selectedFeedId ? 'border-[#08733a] bg-[#08733a] text-white' : 'border-[#e4ddd7] bg-white'}`}>{(language === 'bg' ? item.titleBg : item.titleEn) || 'Нова публикация'} · {item.date}</button>)}
              </div>
              {sortedFeed.filter(item => item.id === selectedFeedId).map(item => <div key={item.id} className="space-y-5 rounded-2xl border border-[#e4ddd7] bg-[#fffdfb] p-5">
                <div className="flex flex-wrap items-center gap-2"><h3 className="mr-auto text-lg font-black">{(language === 'bg' ? item.titleBg : item.titleEn) || 'Нова публикация'}</h3>
                  <button type="button" onClick={() => change(d => { d.feed.find(post => post.id === item.id)!.visible = !item.visible; })} className="rounded-lg border px-3 py-2">{item.visible ? 'Публикувана · скрий' : 'Чернова · публикувай'}</button>
                  <button type="button" onClick={() => change(d => { d.feed.find(post => post.id === item.id)!.featured = !item.featured; })} className="rounded-lg border px-3 py-2">{item.featured ? 'В слайдшоу ✓' : 'Добави в слайдшоу'}</button>
                  <button type="button" onClick={() => { if (window.confirm('Да изтрия ли публикацията?')) change(d => { d.feed = d.feed.filter(post => post.id !== item.id); }); }} className="rounded-lg border border-[#c88982] px-3 py-2 text-[#8d2e2b]">Изтрий</button>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                <div className="min-w-0 space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
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
                {feedMediaType(item) === 'image' && <>
                  {imagePicker('Снимка на публикацията', item.image, (d, url) => { const post = d.feed.find(entry => entry.id === item.id)!; const old = post.image; post.image = url; removeUnusedPlacement(post, old); }, true, item.id)}
                </>}
                {feedMediaType(item) === 'slideshow' && <div className="space-y-3 rounded-xl border border-[#e4ddd7] p-4">
                  <h4 className="font-black">Слайдшоу в секцията · до 12 снимки</h4>
                  {(item.images || []).map((url, index) => <div key={`${url}-${index}`} className="space-y-3 border-b pb-4 last:border-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <Image src={url.startsWith('/api/') ? apiUrl(url) : url} alt={`Слайд ${index + 1}`} width={96} height={64} unoptimized className="h-16 w-24 rounded object-cover" />
                      <span className="mr-auto text-sm">Снимка {index + 1}</span>
                      <button type="button" disabled={index === 0} onClick={() => change(d => { const photos = d.feed.find(post => post.id === item.id)!.images!; [photos[index - 1], photos[index]] = [photos[index], photos[index - 1]]; })} className="rounded border px-2 py-1 disabled:opacity-30" aria-label="Премести снимката наляво">←</button>
                      <button type="button" disabled={index === (item.images?.length || 0) - 1} onClick={() => change(d => { const photos = d.feed.find(post => post.id === item.id)!.images!; [photos[index], photos[index + 1]] = [photos[index + 1], photos[index]]; })} className="rounded border px-2 py-1 disabled:opacity-30" aria-label="Премести снимката надясно">→</button>
                      <button type="button" onClick={() => change(d => { const post = d.feed.find(entry => entry.id === item.id)!; post.images!.splice(index, 1); removeUnusedPlacement(post, url); })} className="rounded border border-[#c88982] px-2 py-1 text-[#8d2e2b]">Изтрий</button>
                    </div>
                  </div>)}
                  <div role="group" aria-label="Добави снимки към слайдшоуто" tabIndex={0} className={`admin-dropzone ${dragZone === item.id ? 'admin-dropzone-active' : ''}`}
                    onDragOver={event => { event.preventDefault(); if (!busy) setDragZone(item.id); }}
                    onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragZone(''); }}
                    onDrop={event => { event.preventDefault(); setDragZone(''); if (!busy) uploadSlideFiles(Array.from(event.dataTransfer.files), item.id); }}
                    onPaste={event => { const files = Array.from(event.clipboardData.items).map(entry => entry.getAsFile()).filter((file): file is File => !!file); if (files.length) { event.preventDefault(); if (!busy) uploadSlideFiles(files, item.id); } }}>
                    <p className="text-sm font-medium">Пуснете снимки тук или кликнете в полето и натиснете Ctrl+V</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <input type="file" aria-label="Избери снимки за слайдшоу" accept="image/jpeg,image/png,image/webp" multiple disabled={busy || (item.images?.length || 0) >= 12} className="max-w-full text-sm" onChange={event => { uploadSlideFiles(Array.from(event.target.files || []), item.id); event.target.value = ''; }} />
                      <button type="button" disabled={busy || (item.images?.length || 0) >= 12} onClick={() => pasteSlides(item.id)} className="rounded-lg border border-[#08733a] px-3 py-2 text-sm font-bold text-[#08733a]">Постави от клипборда</button>
                    </div>
                  </div>
                </div>}
                {feedMediaType(item) === 'video' && field('Видео URL (YouTube, Vimeo или HTTPS .mp4)', item.videoUrl || '', value => change(d => { d.feed.find(post => post.id === item.id)!.videoUrl = value.trim(); }))}
                </div>
                <div className="min-w-0 lg:sticky lg:top-24 lg:self-start" aria-label={`Превю на ${(language === 'bg' ? item.titleBg : item.titleEn) || 'нова публикация'}`}>
                  <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-[#c9dfcf] bg-white p-3">
                    <h4 className="mr-auto font-black">Страница · {name}</h4>
                    {!item.visible && <span className="rounded-full bg-[#f1ede9] px-3 py-1 text-xs font-bold">Чернова</span>}
                    <button type="button" onClick={() => setPreviewMode('list')} aria-pressed={previewMode === 'list'} className={`rounded-lg px-3 py-2 text-sm font-bold ${previewMode === 'list' ? 'bg-[#08733a] text-white' : 'bg-[#f1ede9]'}`}>В списъка</button>
                    <button type="button" onClick={() => setPreviewMode('detail')} aria-pressed={previewMode === 'detail'} className={`rounded-lg px-3 py-2 text-sm font-bold ${previewMode === 'detail' ? 'bg-[#08733a] text-white' : 'bg-[#f1ede9]'}`}>Цяла публикация</button>
                  </div>
                  <iframe ref={previewFrame} src={language === 'en' ? '/en/site-control/preview' : '/site-control/preview'} title={`Превю на цялата страница · ${name}`} onLoad={updatePagePreview} className="block h-[min(78vh,950px)] min-h-[500px] w-full rounded-b-xl border border-[#c9dfcf] bg-white" />
                </div>
                </div>
              </div>)}
              <button type="button" disabled={draft.feed.length >= 30} onClick={() => { const id = `post-${crypto.randomUUID()}`; change(d => { d.feed.unshift({ id, type: 'news', date: new Date().toISOString().slice(0, 10), endDate: '', image: '', mediaType: 'image', visible: false, featured: false, titleBg: '', titleEn: '', bodyBg: '', bodyEn: '' }); }); setActiveFeedId(id); }} className="rounded-xl bg-[#211914] px-5 py-3 font-bold text-white disabled:opacity-50">+ Добави публикация</button>
            </>}
            {section === 'about' && <>
              {field('Надпис', c.about.eyebrow, v => change(d => d[language].about.eyebrow = v))}
              {field('Заглавие', c.about.title, v => change(d => d[language].about.title = v))}
              {field('Описание', c.about.copy, v => change(d => d[language].about.copy = v), true)}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d5e7db] bg-[#f1f8f3] p-4">
                <div><strong>Етикети ({c.about.rows.length}/20)</strong><p className="mt-1 text-sm text-[#625851]">Редът и броят са общи за BG и EN. Текстът се редактира отделно.</p></div>
                <button type="button" disabled={draft.bg.about.rows.length >= 20 || draft.en.about.rows.length >= 20} onClick={addAboutRow} className="rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">+ Добави етикет</button>
              </div>
              {c.about.rows.map((row, index) => <div key={index} className="space-y-3 rounded-xl border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <strong className="mr-auto">Етикет {index + 1}</strong>
                  <button type="button" disabled={index === 0} onClick={() => moveAboutRow(index, -1)} aria-label={`Премести етикет ${index + 1} нагоре`} className="rounded-lg border px-3 py-2">↑</button>
                  <button type="button" disabled={index === c.about.rows.length - 1} onClick={() => moveAboutRow(index, 1)} aria-label={`Премести етикет ${index + 1} надолу`} className="rounded-lg border px-3 py-2">↓</button>
                  <button type="button" onClick={() => removeAboutRow(index)} className="rounded-lg border border-[#c88982] px-3 py-2 text-[#8d2e2b]">Изтрий</button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {field('Етикет', row.label, v => change(d => d[language].about.rows[index].label = v))}
                  {field('Текст', row.copy, v => change(d => d[language].about.rows[index].copy = v), true)}
                </div>
              </div>)}
              <button type="button" disabled={draft.bg.about.rows.length >= 20 || draft.en.about.rows.length >= 20} onClick={addAboutRow} className="w-fit rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">+ Добави етикет</button>
            </>}
            {section === 'contact' && <>
              {field('Заглавие', c.contact.heading, v => change(d => d[language].contact.heading = v))}
              {field('Адрес', c.contact.address, v => change(d => d[language].contact.address = v))}
              <div className="grid gap-4 md:grid-cols-2">
                {field('Основен телефон', c.contact.phone, v => change(d => { for (const lang of ['bg', 'en'] as const) d[lang].contact.phone = v; }))}
                {field('Втори телефон (по избор)', c.contact.phone2 || '', v => change(d => { for (const lang of ['bg', 'en'] as const) d[lang].contact.phone2 = v; }))}
              </div>
              <label className="block text-sm font-bold text-[#332923]">Имейл (по избор)
                <input type="email" value={c.contact.email || ''} onChange={event => change(d => { for (const lang of ['bg', 'en'] as const) d[lang].contact.email = event.target.value; })} placeholder="info@example.com" className="mt-2 w-full rounded-xl border border-[#d8d0c8] bg-white p-3 font-normal outline-none focus:border-[#08733a]" />
              </label>
              <h3 className="border-t border-[#e4ddd7] pt-5 text-lg font-black">Стандартно работно време</h3>
              {c.contact.hours.map((row, index) => <div key={index} className="grid gap-3 md:grid-cols-2">{field(`Ден ${index + 1}`, row.day, v => change(d => d[language].contact.hours[index].day = v))}{field('Часове', row.hours, v => change(d => d[language].contact.hours[index].hours = v))}</div>)}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d5e7db] bg-[#f1f8f3] p-4">
                <div><strong>Работно време за конкретни дати ({c.contact.specialHours?.length || 0})</strong><p className="mt-1 text-sm text-[#625851]">Например 25.12 — 10:00–14:00 или „Почивен ден“. Датата се задава веднъж, поводът и часовете се попълват на BG и EN.</p></div>
                <button type="button" disabled={(c.contact.specialHours?.length || 0) >= 30} onClick={addSpecialHours} className="rounded-xl bg-[#08733a] px-5 py-3 font-bold text-white">+ Добави дата</button>
              </div>
              {(c.contact.specialHours || []).map((row, index) => <div key={row.id} className="space-y-4 rounded-xl border border-[#e4ddd7] p-4">
                <div className="flex items-center justify-between gap-3"><strong>Специална дата {index + 1}</strong><button type="button" onClick={() => removeSpecialHours(row.id)} className="rounded-lg border border-[#c88982] px-3 py-2 text-[#8d2e2b]">Изтрий</button></div>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="block text-sm font-bold">Дата<input type="date" value={row.date} onChange={event => change(d => { for (const lang of ['bg', 'en'] as const) d[lang].contact.specialHours!.find(entry => entry.id === row.id)!.date = event.target.value; })} className="mt-2 w-full rounded-xl border border-[#d8d0c8] bg-white p-3 font-normal" /></label>
                  {field('Повод', row.label, v => change(d => d[language].contact.specialHours!.find(entry => entry.id === row.id)!.label = v))}
                  {field('Часове или почивен ден', row.hours, v => change(d => d[language].contact.specialHours!.find(entry => entry.id === row.id)!.hours = v))}
                </div>
              </div>)}
              {field('Бележка', c.contact.note, v => change(d => d[language].contact.note = v))}
            </>}
            {section === 'images' && (['logo', 'store', 'products', 'about'] as const).map(key => <div key={key} className="rounded-xl border p-5">
              <h3 className="mb-3 font-black">{{logo:'Лого',store:'Снимка на магазина',products:'Снимка на продуктите',about:'Снимка за „За нас“'}[key]}</h3>
              {imagePicker(`Качи ${key}`, draft.media[key] || '', (d, url) => { d.media[key] = url; d.mediaPlacements ||= {}; d.mediaPlacements[key] = { ...defaultImagePlacement }; }, false, key, draft.mediaPlacements?.[key], (d, value) => { d.mediaPlacements ||= {}; d.mediaPlacements[key] = value; }, key === 'logo' ? '1 / 1' : key === 'about' ? '903 / 1024' : '1 / 1')}
            </div>)}
          </div>
          <button type="button" disabled={busy} onClick={save} className="mt-8 rounded-xl bg-[#08733a] px-7 py-3 font-black text-white disabled:opacity-50">Запази промените</button>
        </>}
      {message && <p role="status" className="mt-5 rounded-xl border border-[#dfd4c5] bg-[#fffdf7] p-4">{message}</p>}
    </div>
  </section>;
}
