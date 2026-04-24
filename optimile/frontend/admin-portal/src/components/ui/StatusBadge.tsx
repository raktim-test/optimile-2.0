import { cn } from '@/lib/utils';
export function StatusBadge({ variant, label }: { variant: 'success'|'warning'|'danger'|'info'; label: string }) {
  const styles = { success:'bg-emerald-100 text-emerald-700', warning:'bg-amber-100 text-amber-700', danger:'bg-rose-100 text-rose-700', info:'bg-indigo-100 text-indigo-700' };
  return <span className={cn('rounded-full px-3 py-1 text-xs font-medium', styles[variant])}>{label}</span>;
}
