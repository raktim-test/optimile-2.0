import { cn } from '@/lib/utils';
export function Tabs({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return <div className="flex gap-2">{items.map((item)=><button key={item} onClick={()=>onChange(item)} className={cn('rounded-full px-3 py-1 text-sm', value===item?'bg-indigo-600 text-white':'bg-slate-200')}>{item}</button>)}</div>;
}
