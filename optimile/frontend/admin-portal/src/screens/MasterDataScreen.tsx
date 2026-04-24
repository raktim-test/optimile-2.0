import { PageHeader } from '@/components/ui/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

const tabs = ['Customers','Vendors','Vehicle Types','Materials','LR Configuration','Customer Hierarchy'];
export default function MasterDataScreen() {
  const [tab, setTab] = useState(tabs[0]);
  return <div className="space-y-4"><PageHeader title="Master Data" subtitle="All foundational masters and hierarchy." />
    <Tabs items={tabs} value={tab} onChange={setTab} />
    <Card><p className="font-medium">{tab}</p><p className="text-sm text-slate-600">CRUD scaffolding + tree views for hierarchy module.</p></Card>
  </div>;
}
