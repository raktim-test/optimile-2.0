import { useAuthStore } from '@/store/auth';
import { Button } from './Button';
export function Topbar() { const logout = useAuthStore((s) => s.logout); return <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3"><p className="font-semibold">Optimile Admin</p><Button onClick={logout}>Logout</Button></header>; }
