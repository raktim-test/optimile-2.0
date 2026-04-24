import { AuditEvent, Role, Tenant, User } from '@/types/domain';
import { ApiResponse, Paged } from '@/types/api';

const wait = () => new Promise((r) => setTimeout(r, 300 + Math.random() * 300));

const tenants: Tenant[] = [
  { id: 't1', name: 'Acme Logistics', status: 'ACTIVE', modules: ['FTL', 'FINANCE'], createdAt: '2026-01-11' },
  { id: 't2', name: 'Nova Freight', status: 'INACTIVE', modules: ['FLEET'], createdAt: '2026-02-02' }
];
const users: User[] = [
  { id: 'u1', name: 'Asha Menon', tenant: 'Acme Logistics', role: 'Tenant Admin', status: 'ACTIVE', lastLogin: '2026-04-23' },
  { id: 'u2', name: 'Ravi Das', tenant: 'Nova Freight', role: 'Ops', status: 'LOCKED', lastLogin: '2026-04-20' }
];
const roles: Role[] = [{ id: 'r1', tenant: 'Acme Logistics', name: 'Tenant Admin', users: 12 }];
const audits: AuditEvent[] = [{ id: 'a1', user: 'Asha Menon', module: 'Users', action: 'RESET_OTP', timestamp: '2026-04-23T12:33:00Z' }];

const page = <T,>(content: T[]): Paged<T> => ({ content, page: 0, size: 20, totalElements: content.length, totalPages: 1, first: true, last: true });

export const mockApi = {
  async login(username: string, password: string): Promise<ApiResponse<{ token: string; name: string }>> {
    await wait();
    if (username === 'admin' && password === 'admin') return { success: true, data: { token: 'mock-jwt-token', name: 'Super Admin' } };
    return { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Username or password is incorrect' } };
  },
  async tenants() { await wait(); return { success: true, data: page(tenants) } as ApiResponse<Paged<Tenant>>; },
  async users() { await wait(); return { success: true, data: page(users) } as ApiResponse<Paged<User>>; },
  async roles() { await wait(); return { success: true, data: page(roles) } as ApiResponse<Paged<Role>>; },
  async audit(forceError?: boolean) { await wait(); return forceError ? { success: false, error: { code: 'AUDIT_EXPORT_FAILED', message: 'Unable to fetch audit log.' } } : ({ success: true, data: page(audits) } as ApiResponse<Paged<AuditEvent>>); }
};
