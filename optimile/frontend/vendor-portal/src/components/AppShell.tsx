
import { Link, Outlet } from 'react-router-dom';

const links = ['bookings', 'bookings/booking-1', 'auctions', 'auctions/auction-1', 'trips', 'documents', 'profile', 'quota'];

export const AppShell = () => (
  <div className="min-h-screen bg-slate-50 flex">
    <aside className="w-72 border-r bg-white p-4 overflow-auto">
      <p className="font-semibold mb-3">vendor-portal</p>
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
