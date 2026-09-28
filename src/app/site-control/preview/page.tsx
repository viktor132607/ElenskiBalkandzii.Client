'use client';

import { useEffect, useState } from 'react';
import FeedStory from '@/components/FeedStory';
import type { FeedItem } from '@/lib/content';

type PreviewState = { item: FeedItem; language: 'bg' | 'en'; mode: 'list' | 'detail' };

export default function SiteControlPreview() {
  const [preview, setPreview] = useState<PreviewState | null>(null);

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'site-control-preview') return;
      const { item, language, mode } = event.data;
      if (!item || typeof item.id !== 'string' || typeof item.titleBg !== 'string' || typeof item.titleEn !== 'string' ||
          (language !== 'bg' && language !== 'en') || (mode !== 'list' && mode !== 'detail')) return;
      setPreview({ item, language, mode });
    }
    function keepPreview(event: MouseEvent) {
      if ((event.target as Element).closest('a, header button, footer button')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    window.addEventListener('message', receive);
    document.addEventListener('click', keepPreview, true);
    window.parent.postMessage({ type: 'site-control-preview-ready' }, window.location.origin);
    return () => { window.removeEventListener('message', receive); document.removeEventListener('click', keepPreview, true); };
  }, []);

  if (!preview) return <main className="min-h-[65vh] bg-[#faf8f5] p-8">Зареждане на превюто…</main>;

  const { item, language, mode } = preview;
  return <main className="min-h-[65vh] bg-[#faf8f5] py-12 text-[#211915] md:py-20">
    <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
      {mode === 'list' ? <header className="border-b border-[#d9d0c6] pb-8">
        <span className="text-xs font-black uppercase tracking-[.2em] text-[#08733a]">{language === 'bg' ? 'Еленски Балканджии · Русе' : 'Elenski Balkandzhii · Ruse'}</span>
        <h1 className="mt-4 text-4xl font-black uppercase md:text-5xl">{language === 'bg' ? 'Новини и събития' : 'News and events'}</h1>
      </header> : <div className="inline-block border-b-2 border-[#08733a] pb-1 text-sm font-bold text-[#08733a]">← {language === 'bg' ? 'Всички новини и събития' : 'All news and events'}</div>}
      <FeedStory key={`${item.id}-${mode}-${item.image}-${item.images?.join('|') || ''}-${item.videoUrl || ''}`} item={item} language={language} linked={mode === 'list'} detail={mode === 'detail'} preview
        onImagePlacementChange={(url, placement) => window.parent.postMessage({ type: 'site-control-preview-placement', itemId: item.id, url, placement }, window.location.origin)}
        onImageFrameChange={frame => window.parent.postMessage({ type: 'site-control-preview-frame', itemId: item.id, frame }, window.location.origin)} />
    </div>
  </main>;
}
