import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function RolesScreen() {
  const { data } = useQuery({ queryKey: ['roles'], queryFn: apiClient.getRoles });
  return <div className="space-y-4"><PageHeader title="Roles" subtitle="Create tenant roles and edit permissions." />
    <Card><div className="flex items-center justify-between"><p>Permission Matrix Editor (module × action)</p><Button>Create Role</Button></div></Card>
    <Table headers={['Role','Tenant','Users']}>
      {data?.success && data.data.content.map((r, i) => <tr key={r.id} className={i%2?'bg-slate-50':''}><td className="px-3 py-2">{r.name}</td><td className="px-3 py-2">{r.tenant}</td><td className="px-3 py-2">{r.users}</td></tr>)}
    </Table>
  </div>;
}
