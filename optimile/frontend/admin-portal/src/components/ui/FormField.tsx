import { ReactNode } from 'react';
export function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block space-y-1"><span className="text-sm font-medium">{label}</span>{children}{error && <span className="text-xs text-rose-600">{error}</span>}</label>;
}
