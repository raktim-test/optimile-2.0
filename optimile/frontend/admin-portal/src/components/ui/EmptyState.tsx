import { ReactNode } from 'react';
export function EmptyState({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center"><p className="font-semibold">{title}</p><p className="text-sm text-slate-500">{subtitle}</p><div className="mt-3">{action}</div></div>;
}
