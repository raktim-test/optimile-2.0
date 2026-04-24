
import { NavLink, Outlet } from 'react-router-dom';

type NavGroup = {
  label: string;
  links: Array<{ to: string; label: string }>;
};

const navGroups: NavGroup[] = [
  {
    label: 'Fleet Operations',
    links: [
      { to: '/fleet/vehicles', label: 'Vehicles' },
      { to: '/fleet/drivers', label: 'Drivers' },
      { to: '/fleet/compliance', label: 'Compliance' },
      { to: '/fleet/maintenance', label: 'Maintenance' },
      { to: '/fleet/tyres', label: 'Tyres' },
      { to: '/fleet/health', label: 'Health' },
      { to: '/fleet/fuel', label: 'Fuel' },
    ],
  },
  {
    label: 'FTL Booking',
    links: [
      { to: '/ftl-booking/bookings', label: 'Bookings' },
      { to: '/ftl-booking/create', label: 'Create Booking' },
      { to: '/ftl-booking/rate-deviation', label: 'Rate Deviation' },
      { to: '/ftl-booking/lr', label: 'LR' },
      { to: '/ftl-booking/pod', label: 'POD' },
      { to: '/ftl-booking/negative-actions', label: 'Negative Actions' },
    ],
  },
  {
    label: 'Auction Management',
    links: [
      { to: '/auction/list', label: 'Auction List' },
      { to: '/auction/detail', label: 'Auction Detail' },
      { to: '/auction/create', label: 'Create Auction' },
      { to: '/auction/award', label: 'Awarding' },
      { to: '/auction/replacement', label: 'Replacement' },
      { to: '/auction/contracts', label: 'Contracts' },
    ],
  },
  {
    label: 'Finance',
    links: [
      { to: '/finance/invoice-queue', label: 'Invoice Queue' },
      { to: '/finance/customer-ar', label: 'Customer AR' },
      { to: '/finance/vendor-ap', label: 'Vendor AP' },
      { to: '/finance/driver-advances', label: 'Driver Advances' },
      { to: '/finance/notes', label: 'Notes' },
      { to: '/finance/ledger', label: 'Ledger' },
      { to: '/finance/payment-release', label: 'Payment Release' },
      { to: '/finance/reports', label: 'Reports' },
    ],
  },
];

export const AppShell = () => (
  <div className="flex min-h-screen bg-slate-100">
    <aside className="sticky top-0 h-screen w-80 overflow-auto border-r border-slate-200 bg-white/95 p-5 shadow-sm">
      <div className="mb-6 rounded-2xl bg-indigo-600 p-4 text-white">
        <p className="text-xs uppercase tracking-widest text-indigo-100">Optimile</p>
        <p className="text-xl font-semibold">Admin Portal</p>
        <p className="mt-1 text-sm text-indigo-100">Managed-mode operations cockpit</p>
      </div>
      <nav className="space-y-5">
        {navGroups.map((group) => (
          <section key={group.label}>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{group.label}</p>
            <div className="space-y-1">
              {group.links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition ${
                      isActive ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </aside>
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);
