export type Tenant = { id: string; name: string; status: 'ACTIVE' | 'INACTIVE'; modules: string[]; createdAt: string };
export type User = { id: string; name: string; tenant: string; role: string; status: 'ACTIVE' | 'LOCKED'; lastLogin: string };
export type Role = { id: string; tenant: string; name: string; users: number };
export type AuditEvent = { id: string; user: string; module: string; action: string; timestamp: string };
