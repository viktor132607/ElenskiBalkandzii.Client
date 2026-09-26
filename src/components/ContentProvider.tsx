'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { apiUrl } from '@/lib/api';
import { defaults, normalizeContent, type SiteContent } from '@/lib/content';

const ContentContext = createContext<SiteContent>(defaults);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaults);
  useEffect(() => {
    const controller = new AbortController();
    fetch(apiUrl('/api/content'), { signal: controller.signal, cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(value => { const parsed = normalizeContent(value); if (parsed) setContent(parsed); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useSiteContent() { return useContext(ContentContext); }
