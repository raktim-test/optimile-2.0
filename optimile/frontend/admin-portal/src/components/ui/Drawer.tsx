import { ReactNode } from 'react';
export function Drawer({ open, children }: { open: boolean; children: ReactNode }) { return open ? <div className="fixed right-0 top-0 h-full w-[420px] bg-white p-4 shadow-2xl">{children}</div> : null; }
