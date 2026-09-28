"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { imageUrl } from "@/lib/api";
import { defaultImagePlacement, imagePlacementStyle, type ImagePlacement } from "@/lib/content";

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value * 100) / 100));

export default function EditableImage({ url, alt, placement, onChange, onLoad }: {
  url: string; alt: string; placement: ImagePlacement;
  onChange: (value: ImagePlacement) => void;
  onLoad?: (width: number, height: number) => void;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ pointerId: number; kind: 'move' | 'crop'; startX: number; startY: number; placement: ImagePlacement; gapX: number; gapY: number; signX: number; signY: number } | null>(null);

  function start(event: React.PointerEvent<HTMLDivElement>) {
    if (!size.width || !size.height) return;
    const handle = (event.target as HTMLElement).closest<HTMLElement>('[data-crop-handle]')?.dataset.cropHandle;
    const { width, height } = event.currentTarget.getBoundingClientRect();
    const scale = (placement.fit === 'cover' ? Math.max(width / size.width, height / size.height) : Math.min(width / size.width, height / size.height)) * (placement.zoom ?? 1);
    drag.current = { pointerId: event.pointerId, kind: handle ? 'crop' : 'move', startX: event.clientX, startY: event.clientY, placement,
      gapX: width - size.width * scale, gapY: height - size.height * scale,
      signX: handle?.includes('left') ? 1 : handle?.includes('right') ? -1 : 0,
      signY: handle?.includes('top') ? 1 : handle?.includes('bottom') ? -1 : 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    event.preventDefault();
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

  return <div role="group" tabIndex={0} aria-label="Плъзнете снимката за позиция или дръжките за изрязване" className={`absolute inset-0 select-none overflow-hidden ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={{ touchAction: 'none' }} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop}
    onWheel={event => { if (event.ctrlKey || event.metaKey) return; onChange({ ...placement, zoom: Math.max(1, Math.min(3, Math.round(((placement.zoom ?? 1) - Math.sign(event.deltaY) * 0.05) * 100) / 100)) }); }}
    onKeyDown={event => { if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return; event.preventDefault(); const step = event.shiftKey ? 10 : 2; onChange({ ...placement, x: clamp(placement.x + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0)), y: clamp(placement.y + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0)) }); }}>
    <Image src={imageUrl(url)} alt={alt} fill draggable={false} sizes="(max-width: 1023px) 100vw, 50vw" onLoad={event => { const image = event.currentTarget; if (!image.naturalWidth || !image.naturalHeight) return; setSize({ width: image.naturalWidth, height: image.naturalHeight }); onLoad?.(image.naturalWidth, image.naturalHeight); }} style={{ ...imagePlacementStyle(placement), pointerEvents: 'none', userSelect: 'none' }} />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-2 border-white/90 shadow-[inset_0_0_0_1px_rgba(0,0,0,.55)]">
      <span className="absolute left-1/3 top-0 h-full border-l border-white/75 shadow-[1px_0_1px_rgba(0,0,0,.5)]" /><span className="absolute left-2/3 top-0 h-full border-l border-white/75 shadow-[1px_0_1px_rgba(0,0,0,.5)]" />
      <span className="absolute left-0 top-1/3 w-full border-t border-white/75 shadow-[0_1px_1px_rgba(0,0,0,.5)]" /><span className="absolute left-0 top-2/3 w-full border-t border-white/75 shadow-[0_1px_1px_rgba(0,0,0,.5)]" />
    </div>
    {(['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right'] as const).map(handle => <span key={handle} data-crop-handle={handle} role="presentation" className={`absolute z-10 h-4 w-4 border-2 border-white bg-[#211914] shadow-[0_1px_3px_rgba(0,0,0,.7)] ${handle.includes('top') ? 'top-0' : handle.includes('bottom') ? 'bottom-0' : 'top-1/2 -translate-y-1/2'} ${handle.includes('left') ? 'left-0' : handle.includes('right') ? 'right-0' : 'left-1/2 -translate-x-1/2'} ${handle === 'top' || handle === 'bottom' ? 'cursor-ns-resize' : handle === 'left' || handle === 'right' ? 'cursor-ew-resize' : handle === 'top-left' || handle === 'bottom-right' ? 'cursor-nwse-resize' : 'cursor-nesw-resize'}`} />)}
    <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-[#211914]/80 px-2 py-1 text-xs font-bold text-white">Плъзни снимката или дръжките</span>
  </div>;
}

export function ImageEditActions({ placement, onChange }: { placement: ImagePlacement; onChange: (value: ImagePlacement) => void }) {
  return <div className="flex flex-wrap items-center gap-3 text-sm">
    <label className="font-bold">Показване<select value={placement.fit} onChange={event => onChange({ ...placement, fit: event.target.value as ImagePlacement['fit'] })} className="ml-2 rounded-lg border border-[#d8d0c8] bg-white p-2 font-normal"><option value="cover">Запълни</option><option value="contain">Цяла снимка</option></select></label>
    <label className="min-w-[120px] flex-1 font-bold">Мащаб {Math.round((placement.zoom ?? 1) * 100)}%<input type="range" min="1" max="3" step="0.05" value={placement.zoom ?? 1} onChange={event => onChange({ ...placement, zoom: Number(event.target.value) })} className="block w-full accent-[#08733a]" /></label>
    <button type="button" onClick={() => onChange({ ...defaultImagePlacement })} className="rounded-lg border border-[#08733a] px-3 py-2 font-bold text-[#08733a]">Нулирай</button>
  </div>;
}
