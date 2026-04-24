import { mockApi } from './mockApi';

export const apiClient = {
  login: mockApi.login,
  getTenants: mockApi.tenants,
  getUsers: mockApi.users,
  getRoles: mockApi.roles,
  getAudit: mockApi.audit
};
