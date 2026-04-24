import { ReactNode } from 'react';
export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><table className="w-full text-sm"><thead className="sticky top-0 bg-slate-100"><tr>{headers.map((h)=><th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}
