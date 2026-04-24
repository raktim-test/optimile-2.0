import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('w-full rounded-lg border border-slate-300 px-3 py-2 text-sm', props.className)} {...props} />;
}
