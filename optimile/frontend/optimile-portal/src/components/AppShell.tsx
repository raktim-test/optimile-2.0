
import { Link, Outlet } from 'react-router-dom';

const links = ['fleet/vehicles', 'fleet/drivers', 'fleet/compliance', 'fleet/maintenance', 'fleet/tyres', 'fleet/health', 'fleet/fuel', 'ftl-booking/bookings', 'ftl-booking/create', 'ftl-booking/rate-deviation', 'ftl-booking/lr', 'ftl-booking/pod', 'ftl-booking/negative-actions', 'auction/list', 'auction/detail', 'auction/create', 'auction/award', 'auction/replacement', 'auction/contracts', 'finance/invoice-queue', 'finance/customer-ar', 'finance/vendor-ap', 'finance/driver-advances', 'finance/notes', 'finance/ledger', 'finance/payment-release', 'finance/reports'];

export const AppShell = () => (
  <div className="min-h-screen bg-slate-50 flex">
    <aside className="w-72 border-r bg-white p-4 overflow-auto">
      <p className="font-semibold mb-3">optimile-portal</p>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link className="block text-sm hover:text-indigo-600" key={link} to={'/' + link}>
            {link}
          </Link>
        ))}
      </nav>
    </aside>
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
);
