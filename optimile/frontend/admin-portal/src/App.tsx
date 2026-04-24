import { Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from '@/screens/LoginScreen';
import TenantsScreen from '@/screens/TenantsScreen';
import UsersScreen from '@/screens/UsersScreen';
import UserDetailScreen from '@/screens/UserDetailScreen';
import RolesScreen from '@/screens/RolesScreen';
import MasterDataScreen from '@/screens/MasterDataScreen';
import AuditScreen from '@/screens/AuditScreen';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppShell } from '@/components/AppShell';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/tenants" element={<TenantsScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/users/:id" element={<UserDetailScreen />} />
        <Route path="/roles" element={<RolesScreen />} />
        <Route path="/master-data" element={<MasterDataScreen />} />
        <Route path="/audit" element={<AuditScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/tenants" replace />} />
    </Routes>
  );
}
