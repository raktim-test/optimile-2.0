
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
};
