import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
