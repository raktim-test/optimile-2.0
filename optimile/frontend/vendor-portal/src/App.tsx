
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
        <Route path="/bookings" element={<GenericScreen />} />
        <Route path="/bookings/booking-1" element={<GenericScreen />} />
        <Route path="/auctions" element={<GenericScreen />} />
        <Route path="/auctions/auction-1" element={<GenericScreen />} />
        <Route path="/trips" element={<GenericScreen />} />
        <Route path="/documents" element={<GenericScreen />} />
        <Route path="/profile" element={<GenericScreen />} />
        <Route path="/quota" element={<GenericScreen />} />
        <Route path="/" element={<Navigate to="/bookings" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/bookings" replace />} />
    </Routes>
  );
}
