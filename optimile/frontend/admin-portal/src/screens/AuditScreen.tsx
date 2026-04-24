import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AuditScreen() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['audit'], queryFn: () => apiClient.getAudit(true) });
  return <div className="space-y-4"><PageHeader title="Audit Log" subtitle="Immutable event stream with export." />
    <Card><div className="flex justify-between"><p>Filters: user/module/action/date</p><Button onClick={() => refetch()}>Retry</Button></div></Card>
    {isLoading ? <Card>Loading audit events...</Card> : !data?.success ? <EmptyState title="Unable to load audit logs" subtitle={data?.error.message ?? 'Unknown error'} action={<Button onClick={() => refetch()}>Retry</Button>} /> :
      <Table headers={['User','Module','Action','Timestamp']}>{data.data.content.map((a, i) => <tr key={a.id} className={i%2?'bg-slate-50':''}><td className="px-3 py-2">{a.user}</td><td className="px-3 py-2">{a.module}</td><td className="px-3 py-2">{a.action}</td><td className="px-3 py-2">{a.timestamp}</td></tr>)}</Table>}
  </div>;
}
