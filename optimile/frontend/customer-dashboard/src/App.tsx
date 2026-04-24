
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from '@/screens/LoginScreen';
import GenericScreen from '@/screens/GenericScreen';
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
        <Route path="/overview" element={<GenericScreen />} />
        <Route path="/bookings" element={<GenericScreen />} />
        <Route path="/bookings/new" element={<GenericScreen />} />
        <Route path="/bookings/booking-1" element={<GenericScreen />} />
        <Route path="/tracking" element={<GenericScreen />} />
        <Route path="/invoices" element={<GenericScreen />} />
        <Route path="/invoices/invoice-1" element={<GenericScreen />} />
        <Route path="/reports" element={<GenericScreen />} />
        <Route path="/settings" element={<GenericScreen />} />
        <Route path="/" element={<Navigate to="/overview" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/overview" replace />} />
    </Routes>
  );
}
