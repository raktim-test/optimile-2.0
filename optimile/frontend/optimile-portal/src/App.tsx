
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
        <Route path="/fleet/vehicles" element={<GenericScreen />} />
        <Route path="/fleet/drivers" element={<GenericScreen />} />
        <Route path="/fleet/compliance" element={<GenericScreen />} />
        <Route path="/fleet/maintenance" element={<GenericScreen />} />
        <Route path="/fleet/tyres" element={<GenericScreen />} />
        <Route path="/fleet/health" element={<GenericScreen />} />
        <Route path="/fleet/fuel" element={<GenericScreen />} />
        <Route path="/ftl-booking/bookings" element={<GenericScreen />} />
        <Route path="/ftl-booking/create" element={<GenericScreen />} />
        <Route path="/ftl-booking/rate-deviation" element={<GenericScreen />} />
        <Route path="/ftl-booking/lr" element={<GenericScreen />} />
        <Route path="/ftl-booking/pod" element={<GenericScreen />} />
        <Route path="/ftl-booking/negative-actions" element={<GenericScreen />} />
        <Route path="/auction/list" element={<GenericScreen />} />
        <Route path="/auction/detail" element={<GenericScreen />} />
        <Route path="/auction/create" element={<GenericScreen />} />
        <Route path="/auction/award" element={<GenericScreen />} />
        <Route path="/auction/replacement" element={<GenericScreen />} />
        <Route path="/auction/contracts" element={<GenericScreen />} />
        <Route path="/finance/invoice-queue" element={<GenericScreen />} />
        <Route path="/finance/customer-ar" element={<GenericScreen />} />
        <Route path="/finance/vendor-ap" element={<GenericScreen />} />
        <Route path="/finance/driver-advances" element={<GenericScreen />} />
        <Route path="/finance/notes" element={<GenericScreen />} />
        <Route path="/finance/ledger" element={<GenericScreen />} />
        <Route path="/finance/payment-release" element={<GenericScreen />} />
        <Route path="/finance/reports" element={<GenericScreen />} />
        <Route path="/" element={<Navigate to="/fleet/vehicles" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/fleet/vehicles" replace />} />
    </Routes>
  );
}
