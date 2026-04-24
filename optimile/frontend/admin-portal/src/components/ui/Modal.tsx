import { ReactNode } from 'react';
export function Modal({ open, children }: { open: boolean; children: ReactNode }) { return open ? <div className="fixed inset-0 grid place-items-center bg-slate-900/40"><div className="w-[520px] rounded-xl bg-white p-5">{children}</div></div> : null; }
