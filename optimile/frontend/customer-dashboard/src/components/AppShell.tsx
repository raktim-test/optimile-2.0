
import { Link, Outlet } from 'react-router-dom';

const links = ['overview', 'bookings', 'bookings/new', 'bookings/booking-1', 'tracking', 'invoices', 'invoices/invoice-1', 'reports', 'settings'];

export const AppShell = () => (
  <div className="min-h-screen bg-slate-50 flex">
    <aside className="w-72 border-r bg-white p-4 overflow-auto">
      <p className="font-semibold mb-3">customer-dashboard</p>
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
