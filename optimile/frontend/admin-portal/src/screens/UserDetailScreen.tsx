import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function UserDetailScreen() {
  return <div className="space-y-4"><PageHeader title="User Detail" subtitle="Profile, role assignments, module matrix and login history." />
    <Card><h3 className="font-semibold">Module Access Matrix</h3><p className="text-sm text-slate-600">Booking: Read/Write • Finance: Read • Admin: None</p></Card>
    <Card><h3 className="font-semibold">Login History</h3><ul className="list-disc pl-5 text-sm text-slate-600"><li>2026-04-23 12:33 UTC</li><li>2026-04-20 09:20 UTC</li></ul></Card>
  </div>;
}
