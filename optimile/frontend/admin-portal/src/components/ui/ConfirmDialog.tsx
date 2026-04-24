import { Button } from './Button';
import { Modal } from './Modal';
export function ConfirmDialog({ open, title, onConfirm, onCancel }: { open: boolean; title: string; onConfirm: () => void; onCancel: () => void }) {
  return <Modal open={open}><h3 className="mb-3 text-lg font-semibold">{title}</h3><div className="flex justify-end gap-2"><Button className="bg-slate-400" onClick={onCancel}>Cancel</Button><Button onClick={onConfirm}>Confirm</Button></div></Modal>;
}
