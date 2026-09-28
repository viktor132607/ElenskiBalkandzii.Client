"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { imageUrl } from "@/lib/api";
import { defaultImagePlacement, feedMediaType, frameRatios, imagePlacementFor, imagePlacementStyle, type FeedItem, type ImageFrame, type ImagePlacement } from "@/lib/content";

export function formatFeedDate(value: string, language: "bg" | "en") {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  return new Intl.DateTimeFormat(language === "bg" ? "bg-BG" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function videoSource(value: string): { src: string; embedded: boolean } | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const youtubeId = host === "youtu.be" ? url.pathname.slice(1) : host === "youtube.com" || host === "www.youtube.com" ? (url.pathname.startsWith("/shorts/") ? url.pathname.split("/")[2] : url.searchParams.get("v")) : null;
    if (youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(youtubeId)) return { src: `https://www.youtube-nocookie.com/embed/${youtubeId}`, embedded: true };
    if (host === "vimeo.com" || host === "www.vimeo.com") {
      const id = url.pathname.split("/")[1];
      if (/^\d+$/.test(id)) return { src: `https://player.vimeo.com/video/${id}`, embedded: true };
    }
    if (/\.mp4$/i.test(url.pathname)) return { src: url.toString(), embedded: false };
  } catch { return null; }
  return null;
}

function EditablePhoto({ url, alt, placement, onChange, onLoad }: { url: string; alt: string; placement: ImagePlacement; onChange: (value: ImagePlacement) => void; onLoad: (width: number, height: number) => void }) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ pointerId: number; kind: 'move' | 'crop'; startX: number; startY: number; placement: ImagePlacement; gapX: number; gapY: number; signX: number; signY: number } | null>(null);
  const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value * 100) / 100));

  function start(event: React.PointerEvent<HTMLDivElement>) {
    if (!size.width || !size.height) return;
    const handle = (event.target as HTMLElement).closest<HTMLElement>('[data-crop-handle]')?.dataset.cropHandle;
    const { width, height } = event.currentTarget.getBoundingClientRect();
    const scale = (placement.fit === 'cover' ? Math.max(width / size.width, height / size.height) : Math.min(width / size.width, height / size.height)) * (placement.zoom ?? 1);
    drag.current = { pointerId: event.pointerId, kind: handle ? 'crop' : 'move', startX: event.clientX, startY: event.clientY, placement,
      gapX: width - size.width * scale, gapY: height - size.height * scale,
      signX: handle?.includes('left') ? 1 : -1, signY: handle?.includes('top') ? 1 : -1 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function move(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (current.kind === 'crop') {
      const zoom = Math.max(1, Math.min(3, Math.round(((current.placement.zoom ?? 1) + (current.signX * dx + current.signY * dy) / 300) * 100) / 100));
      onChange({ ...current.placement, zoom });
    } else {
      onChange({ ...current.placement,
        x: Math.abs(current.gapX) < 0.5 ? current.placement.x : clamp(current.placement.x + dx * 100 / current.gapX),
        y: Math.abs(current.gapY) < 0.5 ? current.placement.y : clamp(current.placement.y + dy * 100 / current.gapY),
      });
    }
  }

  function stop(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return <div role="group" tabIndex={0} aria-label="Плъзнете снимката за наместване или ъглите за изрязване" className={`absolute inset-0 select-none overflow-hidden ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={{ touchAction: 'none' }} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop}
    onKeyDown={event => { if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return; event.preventDefault(); const step = event.shiftKey ? 10 : 2; onChange({ ...placement, x: clamp(placement.x + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0)), y: clamp(placement.y + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0)) }); }}>
    <Image src={imageUrl(url)} alt={alt} fill draggable={false} sizes="(max-width: 1023px) 100vw, 50vw" onLoad={event => { const image = event.currentTarget; if (!image.naturalWidth || !image.naturalHeight) return; setSize({ width: image.naturalWidth, height: image.naturalHeight }); onLoad(image.naturalWidth, image.naturalHeight); }} style={{ ...imagePlacementStyle(placement), pointerEvents: 'none', userSelect: 'none' }} />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-2 border-white/80 shadow-[inset_0_0_0_1px_rgba(0,0,0,.45)]">
      <span className="absolute left-1/3 top-0 h-full border-l border-white/70 shadow-[1px_0_1px_rgba(0,0,0,.5)]" /><span className="absolute left-2/3 top-0 h-full border-l border-white/70 shadow-[1px_0_1px_rgba(0,0,0,.5)]" />
      <span className="absolute left-0 top-1/3 w-full border-t border-white/70 shadow-[0_1px_1px_rgba(0,0,0,.5)]" /><span className="absolute left-0 top-2/3 w-full border-t border-white/70 shadow-[0_1px_1px_rgba(0,0,0,.5)]" />
    </div>
    {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(handle => <span key={handle} data-crop-handle={handle} role="presentation" className={`absolute z-10 h-5 w-5 rounded-sm border-2 border-[#08733a] bg-white shadow-md ${handle.includes('top') ? 'top-1' : 'bottom-1'} ${handle.includes('left') ? 'left-1 cursor-nwse-resize' : 'right-1 cursor-nesw-resize'}`} />)}
    <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-[#211914]/80 px-2 py-1 text-xs font-bold text-white">Плъзни снимката или ъглите</span>
  </div>;
}

export default function FeedStory({ item, language, linked = false, reverse = false, detail = false, preview = false, onImagePlacementChange, onImageFrameChange }: { item: FeedItem; language: "bg" | "en"; linked?: boolean; reverse?: boolean; detail?: boolean; preview?: boolean; onImagePlacementChange?: (url: string, placement: ImagePlacement) => void; onImageFrameChange?: (frame: ImageFrame) => void }) {
  const title = language === "bg" ? item.titleBg : item.titleEn || item.titleBg;
  const body = language === "bg" ? item.bodyBg : item.bodyEn || item.bodyBg;
  const mediaType = feedMediaType(item);
  const photos = mediaType === "slideshow" ? item.images || [] : mediaType === "image" && item.image ? [item.image] : [];
  const video = mediaType === "video" && item.videoUrl ? videoSource(item.videoUrl) : null;
  const count = photos.length + (video ? 1 : 0);
  const hasMedia = mediaType !== "none";
  const [active, setActive] = useState(0);
  const [naturalRatios, setNaturalRatios] = useState<Record<string, string>>({});
  const [playVideo, setPlayVideo] = useState(false);
  const activePhoto = photos[active];
  const frameRatio = item.imageFrame && item.imageFrame !== "original" ? frameRatios[item.imageFrame] : activePhoto ? naturalRatios[activePhoto] || "16 / 9" : "16 / 9";
  const label = language === "bg" ? { news: "Новина", event: "Събитие", raffle: "Томбола" }[item.type] : { news: "News", event: "Event", raffle: "Raffle" }[item.type];
  const articleHref = `${language === "bg" ? "/news/read" : "/en/news/read"}?post=${encodeURIComponent(item.id)}`;
  const excerpt = linked && body.length > 260 ? body.slice(0, 260).trimEnd().replace(/\s+\S*$/, "") + "…" : body;
  const placeholder = language === "bg" ? mediaType === "video" ? "Видео предстои" : mediaType === "slideshow" ? "Снимки предстоят" : "Снимка предстои" : mediaType === "video" ? "Video coming soon" : mediaType === "slideshow" ? "Photos coming soon" : "Photo coming soon";

  useEffect(() => {
    if (onImagePlacementChange || count < 2 || (active === photos.length && video) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % count), 6500);
    return () => window.clearInterval(timer);
  }, [active, count, photos.length, video, onImagePlacementChange]);

  return <article id={item.id} className={`grid scroll-mt-28 items-center gap-8 border-b border-[#e4ddd7] py-12 md:gap-12 md:py-16 ${hasMedia ? "lg:grid-cols-2" : ""}`}>
    <div className={`max-w-2xl ${reverse && hasMedia ? "lg:order-2" : ""}`}>
      <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-[.14em] text-[#08733a]"><span>{label}</span><time dateTime={item.date}>{formatFeedDate(item.date, language)}</time></div>
      {detail ? <h1 className="mt-4 text-[clamp(32px,4vw,52px)] font-black leading-tight">{title}</h1> : <h3 className="mt-4 text-[clamp(28px,3vw,44px)] font-black leading-tight">{linked && !preview ? <Link href={articleHref} className="hover:text-[#08733a]">{title}</Link> : title}</h3>}
      <p className="mt-5 whitespace-pre-line text-lg leading-8 text-[#625851]">{excerpt}</p>
      {item.type === "raffle" && item.endDate && <p className="mt-5 font-bold text-[#08733a]">{language === "bg" ? "Край на томболата: " : "Raffle ends: "}{formatFeedDate(item.endDate, language)}</p>}
      {linked && (preview ? <span className="mt-6 inline-block border-b-2 border-[#08733a] pb-1 font-bold text-[#08733a]">{language === "bg" ? "Продължете да четете" : "Continue reading"} →</span> : <Link href={articleHref} className="mt-6 inline-block border-b-2 border-[#08733a] pb-1 font-bold text-[#08733a]">{language === "bg" ? "Продължете да четете" : "Continue reading"} →</Link>)}
    </div>
    {hasMedia && <div className={`relative overflow-hidden rounded-2xl bg-[#eee9e4] ${reverse ? "lg:order-1" : ""}`}>
      <div className="relative" style={{ aspectRatio: frameRatio }}>
        {activePhoto ? onImagePlacementChange ? <EditablePhoto key={activePhoto} url={activePhoto} alt={`${title} — ${active + 1}`} placement={imagePlacementFor(item, activePhoto)} onChange={value => onImagePlacementChange(activePhoto, value)} onLoad={(width, height) => setNaturalRatios(current => ({ ...current, [activePhoto]: `${width} / ${height}` }))} />
          : <Image src={imageUrl(activePhoto)} alt={`${title} — ${active + 1}`} fill sizes="(max-width: 1023px) 100vw, 50vw" onLoad={event => { const image = event.currentTarget; if (image.naturalWidth && image.naturalHeight) setNaturalRatios(current => ({ ...current, [activePhoto]: `${image.naturalWidth} / ${image.naturalHeight}` })); }} style={imagePlacementStyle(imagePlacementFor(item, activePhoto))} />
          : video ? (playVideo ? video.embedded ? <iframe title={title} src={video.src} className="h-full w-full" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <video controls playsInline src={video.src} className="h-full w-full" />
            : <button type="button" onClick={() => setPlayVideo(true)} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#211914] p-8 text-center font-bold text-white"><span className="text-5xl">▶</span>{language === "bg" ? "Пусни видеото" : "Play video"}</button>)
          : <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_75%_20%,#f9f7f2,transparent_50%),linear-gradient(145deg,#f2eee8,#e1d8cc)] p-8 text-center">
              <Image src="/elenski-balkandzhii-logo.jpg" alt="" width={112} height={112} className="h-24 w-24 rounded-full object-cover opacity-70" />
              <span className="text-sm font-black uppercase tracking-[.16em] text-[#776b61]">{placeholder}</span>
            </div>}
      </div>
      {count > 1 && <div className="flex items-center justify-center gap-2 bg-white p-3">{Array.from({ length: count }, (_, index) => <button key={index} type="button" onClick={() => { setActive(index); setPlayVideo(false); }} aria-label={`${index < photos.length ? language === "bg" ? "Снимка" : "Photo" : language === "bg" ? "Видео" : "Video"} ${index + 1}`} aria-current={active === index ? "true" : undefined} className={`h-3 w-3 rounded-full border border-[#08733a] ${active === index ? "bg-[#08733a]" : "bg-white"}`} />)}</div>}
      {activePhoto && onImagePlacementChange && onImageFrameChange && <div className="space-y-3 border-t border-[#d5e7db] bg-[#f7fbf8] p-4 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="font-bold">Форма на рамката<select value={item.imageFrame || 'original'} onChange={event => onImageFrameChange(event.target.value as ImageFrame)} className="mt-1 block w-full rounded-lg border border-[#d8d0c8] bg-white p-2 font-normal"><option value="original">Оригинална</option><option value="wide">Широка 16:9</option><option value="landscape">Хоризонтална 4:3</option><option value="square">Квадратна 1:1</option><option value="portrait">Вертикална 3:4</option></select></label>
          <label className="font-bold">Показване<select value={imagePlacementFor(item, activePhoto).fit} onChange={event => onImagePlacementChange(activePhoto, { ...imagePlacementFor(item, activePhoto), fit: event.target.value as ImagePlacement['fit'] })} className="mt-1 block w-full rounded-lg border border-[#d8d0c8] bg-white p-2 font-normal"><option value="cover">Запълни и изрежи</option><option value="contain">Цялата снимка</option></select></label>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="min-w-[160px] flex-1 font-bold">Приближаване · {Math.round((imagePlacementFor(item, activePhoto).zoom ?? 1) * 100)}%<input type="range" min="1" max="3" step="0.05" value={imagePlacementFor(item, activePhoto).zoom ?? 1} onChange={event => onImagePlacementChange(activePhoto, { ...imagePlacementFor(item, activePhoto), zoom: Number(event.target.value) })} className="mt-1 block w-full accent-[#08733a]" /></label>
          <div><span className="block font-bold">Позиция</span><div className="mt-1 grid grid-cols-3 gap-1" aria-label="Позиция на снимката">{[0, 50, 100].flatMap(y => [0, 50, 100].map(x => <button key={`${x}-${y}`} type="button" onClick={() => onImagePlacementChange(activePhoto, { ...imagePlacementFor(item, activePhoto), x, y })} aria-label={`${x}% хоризонтално, ${y}% вертикално`} className={`h-6 w-6 rounded border ${Math.abs(imagePlacementFor(item, activePhoto).x - x) < 5 && Math.abs(imagePlacementFor(item, activePhoto).y - y) < 5 ? 'border-[#08733a] bg-[#08733a]' : 'border-[#a4c6ae] bg-white'}`} />))}</div></div>
          <button type="button" onClick={() => onImagePlacementChange(activePhoto, { ...defaultImagePlacement })} className="rounded-lg border border-[#08733a] px-3 py-2 font-bold text-[#08733a]">Нулирай</button>
        </div>
      </div>}
    </div>}
  </article>;
}
