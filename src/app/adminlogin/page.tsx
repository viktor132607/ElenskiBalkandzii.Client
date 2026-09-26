'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch(apiUrl('/api/admin/login'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (!response.ok) {
        setMessage(response.status === 429 ? 'Твърде много опити. Опитайте след 15 минути.' : response.status === 503 ? 'Админ достъпът не е настроен на сървъра.' : 'Грешна парола.');
        return;
      }
      const data = await response.json();
      sessionStorage.setItem('elenski-admin-session', data.token);
      setPassword('');
      router.replace('/site-control');
    } catch { setMessage('Сървърът за администриране не е достъпен.'); }
    finally { setBusy(false); }
  }

  return <section className="flex min-h-[65vh] items-center justify-center bg-[#f6f3ef] px-4 py-16">
    <form onSubmit={login} className="w-full max-w-[440px] rounded-2xl border border-[#e4ddd7] bg-white p-7 shadow-[0_14px_38px_rgba(33,25,20,.08)] md:p-10">
      <span className="text-xs font-black uppercase tracking-[.16em] text-[#08733a]">Еленски Балканджии</span>
      <h1 className="mt-4 text-3xl font-black uppercase">Админ вход</h1>
      <label className="mt-8 block text-sm font-bold" htmlFor="admin-password">Парола</label>
      <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d8d0c8] p-3 outline-none focus:border-[#08733a]" />
      <button disabled={busy} className="mt-5 w-full rounded-xl bg-[#08733a] px-6 py-3 font-bold text-white disabled:opacity-50">{busy ? 'Проверка…' : 'Вход'}</button>
      {message && <p role="alert" className="mt-5 rounded-xl border border-[#e8ceca] bg-[#fff3f0] p-3 text-sm text-[#7b2d2a]">{message}</p>}
    </form>
  </section>;
}
