import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export default function UsersScreen() {
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: apiClient.getUsers });
  return <div className="space-y-4"><PageHeader title="Users" subtitle="Filter by tenant, role and status." />
    <Card><div className="grid grid-cols-4 gap-3"><Input placeholder="Search user"/><Select><option>All Tenants</option></Select><Select><option>All Roles</option></Select><Select><option>All Statuses</option></Select></div></Card>
    {isLoading ? <Card>Loading users...</Card> : <Table headers={['Name','Tenant','Role','Status','Last Login','Actions']}>
      {data?.success && data.data.content.map((u, i) => <tr key={u.id} className={i%2?'bg-slate-50':''}><td className="px-3 py-2"><Link className="text-indigo-600 hover:underline" to={`/users/${u.id}`}>{u.name}</Link></td><td className="px-3 py-2">{u.tenant}</td><td className="px-3 py-2">{u.role}</td><td className="px-3 py-2"><StatusBadge variant={u.status==='ACTIVE'?'success':'danger'} label={u.status}/></td><td className="px-3 py-2">{u.lastLogin}</td><td className="px-3 py-2 space-x-2"><Button size="sm" variant="secondary">Reset Password</Button><Button size="sm" variant="secondary">Reset OTP</Button></td></tr>)}
    </Table>}
  </div>;
}
