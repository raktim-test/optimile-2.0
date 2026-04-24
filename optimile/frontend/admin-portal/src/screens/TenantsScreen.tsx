import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function TenantsScreen() {
  const { data, isLoading } = useQuery({ queryKey: ['tenants'], queryFn: apiClient.getTenants });
  return <div className="space-y-4"><PageHeader title="Tenants" subtitle="Provision tenants, toggle modules and manage configs." />
    <Card><div className="flex items-center justify-between"><p className="font-medium">Tenant list / detail</p><Button>Provision Tenant</Button></div></Card>
    {isLoading ? <Card>Loading tenants...</Card> : !data?.success || data.data.content.length === 0 ? <EmptyState title="No tenants yet" subtitle="Create your first tenant" action={<Button>Provision</Button>} /> :
      <Table headers={['Name','Status','Modules','Created']}>
        {data.data.content.map((t, i) => <tr key={t.id} className={i % 2 ? 'bg-slate-50' : ''}><td className="px-3 py-2">{t.name}</td><td className="px-3 py-2"><StatusBadge variant={t.status === 'ACTIVE' ? 'success' : 'warning'} label={t.status} /></td><td className="px-3 py-2">{t.modules.join(', ')}</td><td className="px-3 py-2">{t.createdAt}</td></tr>)}
      </Table>}
    <p className="text-xs text-slate-500">Page 1 • Size 20 • Total {data?.success ? data.data.totalElements : 0}</p>
  </div>;
}
