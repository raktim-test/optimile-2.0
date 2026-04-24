
import { useLocation } from 'react-router-dom';

type ScreenConfig = {
  title: string;
  subtitle: string;
  kpis: Array<{ label: string; value: string; trend: string }>;
  filters: string[];
  actions: string[];
  columns: string[];
};

const screenConfigs: Record<string, ScreenConfig> = {
  '/fleet/vehicles': {
    title: 'Fleet Vehicles',
    subtitle: 'Track active vehicles, registration, and readiness across clients.',
    kpis: [{ label: 'Active', value: '1,284', trend: '+18 this week' }, { label: 'In Service', value: '94%', trend: '+2.1%' }, { label: 'Expiring Docs', value: '37', trend: 'Needs action' }],
    filters: ['Client', 'Vehicle Type', 'Status', 'Registration Due'],
    actions: ['Add Vehicle', 'Bulk Import', 'Export List'],
    columns: ['Vehicle No', 'Type', 'Client', 'Compliance', 'Status'],
  },
  '/fleet/drivers': {
    title: 'Fleet Drivers',
    subtitle: 'Monitor onboarding, assignment, and trip readiness for drivers.',
    kpis: [{ label: 'Active Drivers', value: '2,047', trend: '+31 this week' }, { label: 'Assigned Today', value: '1,426', trend: '69.7% allocation' }, { label: 'Verification Pending', value: '52', trend: 'Follow-up required' }],
    filters: ['Client', 'Hub', 'License Status', 'Availability'],
    actions: ['Invite Driver', 'Assign Vehicle', 'Send Reminder'],
    columns: ['Driver', 'Mobile', 'Hub', 'Assignment', 'Status'],
  },
  '/fleet/compliance': {
    title: 'Fleet Compliance',
    subtitle: 'Ensure RC, insurance, permits, and fitness are valid before dispatch.',
    kpis: [{ label: 'Compliant', value: '89%', trend: '+1.4%' }, { label: 'Expiring < 30d', value: '146', trend: 'Priority queue' }, { label: 'Overdue', value: '19', trend: 'Escalated' }],
    filters: ['Document Type', 'Client', 'Expiry Window', 'Criticality'],
    actions: ['Upload Document', 'Auto-Notify', 'Download Checklist'],
    columns: ['Vehicle', 'Document', 'Expiry Date', 'Owner', 'Risk'],
  },
  '/fleet/maintenance': {
    title: 'Fleet Maintenance',
    subtitle: 'Schedule preventive checks and track breakdown closure.',
    kpis: [{ label: 'Open Jobs', value: '83', trend: '-6 today' }, { label: 'Preventive Due', value: '127', trend: 'Next 7 days' }, { label: 'Breakdown MTTR', value: '9.8h', trend: '-0.6h' }],
    filters: ['Workshop', 'Client', 'Job Type', 'Priority'],
    actions: ['Create Work Order', 'Assign Vendor', 'Close Job'],
    columns: ['Job ID', 'Vehicle', 'Issue', 'Due Date', 'Status'],
  },
  '/fleet/tyres': {
    title: 'Tyre Management',
    subtitle: 'Track tyre lifecycle, replacements, and cost-per-km trends.',
    kpis: [{ label: 'Tyres in Use', value: '6,412', trend: '+84' }, { label: 'Replacement Due', value: '209', trend: 'This month' }, { label: 'Avg Cost / KM', value: '₹2.71', trend: '-3.2%' }],
    filters: ['Tyre Brand', 'Vehicle Class', 'Wear Band', 'Client'],
    actions: ['Record Fitment', 'Mark Replacement', 'Run Cost Report'],
    columns: ['Vehicle', 'Tyre Position', 'Brand', 'KM Run', 'Condition'],
  },
  '/fleet/health': {
    title: 'Fleet Health',
    subtitle: 'Consolidated health score for availability, compliance, and incidents.',
    kpis: [{ label: 'Health Score', value: '82/100', trend: '+4 pts' }, { label: 'At Risk', value: '64', trend: '-9 units' }, { label: 'Incident Alerts', value: '14', trend: 'Live feed' }],
    filters: ['Client', 'Region', 'Risk Band', 'Date Range'],
    actions: ['Open Heatmap', 'Trigger Audit', 'Export Health Score'],
    columns: ['Asset', 'Utilization', 'Compliance', 'Incidents', 'Score'],
  },
  '/fleet/fuel': {
    title: 'Fuel Control',
    subtitle: 'Monitor fuel disbursals, efficiencies, and anomalies.',
    kpis: [{ label: 'Fuel Spend', value: '₹3.8Cr', trend: 'MTD' }, { label: 'Mileage Avg', value: '4.9 km/l', trend: '+0.2' }, { label: 'Anomalies', value: '23', trend: 'Needs review' }],
    filters: ['Client', 'Fuel Station', 'Vehicle Type', 'Variance'],
    actions: ['Record Issue', 'Approve Refill', 'Variance Report'],
    columns: ['Trip', 'Vehicle', 'Litres', 'Mileage', 'Variance'],
  },
  '/ftl-booking/bookings': {
    title: 'FTL Bookings',
    subtitle: 'Control tower for booking lifecycle, assignment, and dispatch readiness.',
    kpis: [{ label: 'Open Bookings', value: '316', trend: '+28 today' }, { label: 'Assigned', value: '241', trend: '76.2%' }, { label: 'Delayed', value: '17', trend: 'Escalate now' }],
    filters: ['Client', 'Origin-Destination', 'Serviceability', 'SLA'],
    actions: ['Create Booking', 'Bulk Assign', 'Escalation View'],
    columns: ['Booking ID', 'Client', 'Lane', 'Vehicle Type', 'Status'],
  },
  '/ftl-booking/create': {
    title: 'Create FTL Booking',
    subtitle: 'Capture shipment, lane, and capacity details before assignment.',
    kpis: [{ label: 'Drafts', value: '42', trend: 'Today' }, { label: 'Submission SLA', value: '11 min', trend: '-2 min' }, { label: 'Validation Errors', value: '5', trend: 'Low' }],
    filters: ['Client', 'Pickup Date', 'Vehicle Type', 'Priority'],
    actions: ['Save Draft', 'Validate & Submit', 'Copy Existing'],
    columns: ['Field', 'Required', 'Value', 'Validation', 'Last Updated'],
  },
  '/ftl-booking/rate-deviation': {
    title: 'Rate Deviation',
    subtitle: 'Approve exception rates with full reason and audit trail.',
    kpis: [{ label: 'Pending Approvals', value: '39', trend: '-4 today' }, { label: 'Avg Deviation', value: '+6.4%', trend: 'Within threshold' }, { label: 'Escalated', value: '7', trend: 'Needs finance review' }],
    filters: ['Client', 'Deviation Band', 'Approver', 'Aging'],
    actions: ['Review Request', 'Approve with Note', 'Reject'],
    columns: ['Request ID', 'Lane', 'Base Rate', 'Requested', 'Status'],
  },
  '/ftl-booking/lr': {
    title: 'Lorry Receipt (LR)',
    subtitle: 'Create and reconcile LR records against booked movement.',
    kpis: [{ label: 'LR Generated', value: '892', trend: 'MTD' }, { label: 'Pending Upload', value: '47', trend: 'Follow up' }, { label: 'Mismatch', value: '9', trend: 'Investigate' }],
    filters: ['Client', 'Branch', 'LR Status', 'Mismatch Flag'],
    actions: ['Generate LR', 'Upload Proof', 'Resolve Mismatch'],
    columns: ['LR No', 'Booking ID', 'Consignor', 'Consignee', 'Status'],
  },
  '/ftl-booking/pod': {
    title: 'Proof of Delivery (POD)',
    subtitle: 'Track POD collection, verification, and settlement readiness.',
    kpis: [{ label: 'POD Received', value: '1,004', trend: '92% coverage' }, { label: 'Pending Scan', value: '73', trend: '-13 today' }, { label: 'Rejected', value: '12', trend: 'Quality issue' }],
    filters: ['Client', 'POD Status', 'Aging', 'Document Quality'],
    actions: ['Upload POD', 'Verify Document', 'Mark Exception'],
    columns: ['Booking ID', 'Delivered On', 'POD Date', 'Verifier', 'Status'],
  },
  '/ftl-booking/negative-actions': {
    title: 'Negative Actions',
    subtitle: 'Log and resolve disputes, damages, delays, and penalties.',
    kpis: [{ label: 'Open Cases', value: '58', trend: '-7 this week' }, { label: 'Resolved SLA', value: '81%', trend: '+5%' }, { label: 'High Severity', value: '11', trend: 'Needs immediate review' }],
    filters: ['Severity', 'Client', 'Case Type', 'Owner'],
    actions: ['Create Case', 'Assign Owner', 'Close with RCA'],
    columns: ['Case ID', 'Booking', 'Issue', 'Owner', 'Status'],
  },
  '/auction/list': {
    title: 'Auction List',
    subtitle: 'Track Spot, Bulk, and Lot auctions in a single queue.',
    kpis: [{ label: 'Live Auctions', value: '24', trend: '+3 today' }, { label: 'Upcoming', value: '39', trend: 'Next 72h' }, { label: 'Closure SLA', value: '96%', trend: 'Stable' }],
    filters: ['Auction Type', 'Client', 'Stage', 'Creator Type'],
    actions: ['Create Auction', 'Publish Draft', 'View Lane Coverage'],
    columns: ['Auction ID', 'Type', 'Lanes', 'Bid Window', 'Status'],
  },
  '/auction/detail': {
    title: 'Auction Detail',
    subtitle: 'Inspect lane-level bidding, rank outcomes, and audit snapshots.',
    kpis: [{ label: 'Vendors Invited', value: '138', trend: 'Current auction' }, { label: 'L1 Spread', value: '8.7%', trend: '-1.3%' }, { label: 'L1 Overrides', value: '2', trend: 'Reason mandatory' }],
    filters: ['Lane', 'Vehicle Type', 'Vendor', 'Rank'],
    actions: ['Freeze Bid Window', 'Recalculate Ranking', 'Download Audit Log'],
    columns: ['Lane', 'Vendor', 'Bid ₹/Trip', 'Rank', 'Eligibility'],
  },
  '/auction/create': {
    title: 'Create Auction',
    subtitle: 'Configure Spot/Bulk/Lot auction rules, lanes, and bidder pools.',
    kpis: [{ label: 'Draft Auctions', value: '17', trend: 'In progress' }, { label: 'Lane Templates', value: '63', trend: 'Reusable' }, { label: 'Validation Checks', value: '100%', trend: 'Before publish' }],
    filters: ['Auction Type', 'Client', 'Lane Count', 'Ceiling Source'],
    actions: ['Save Draft', 'Run Eligibility Check', 'Publish Auction'],
    columns: ['Step', 'Completion', 'Owner', 'Required', 'Status'],
  },
  '/auction/award': {
    title: 'Awarding Console',
    subtitle: 'Award winners by lane and enforce override rationale where needed.',
    kpis: [{ label: 'Awaiting Award', value: '21', trend: 'Procurement queue' }, { label: 'Awarded Today', value: '12', trend: '+4' }, { label: 'Override Ratio', value: '6%', trend: 'Within policy' }],
    filters: ['Client', 'Auction Type', 'Award Mode', 'Override Flag'],
    actions: ['Award L1', 'Apply Split', 'Capture Override Reason'],
    columns: ['Lane', 'L1 Vendor', 'L2 Vendor', 'Allocation', 'Award Status'],
  },
  '/auction/replacement': {
    title: 'Replacement Workflow',
    subtitle: 'Handle post-award replacement while retaining procurement traceability.',
    kpis: [{ label: 'Replacement Requests', value: '14', trend: 'Open' }, { label: 'Approved', value: '9', trend: 'This week' }, { label: 'Avg Resolution', value: '5.4h', trend: '-1.1h' }],
    filters: ['Reason', 'Client', 'Approver', 'Aging'],
    actions: ['Raise Replacement', 'Approve Request', 'Re-assign Vendor'],
    columns: ['Request ID', 'Auction', 'Original Vendor', 'Replacement', 'Status'],
  },
  '/auction/contracts': {
    title: 'Auction Contracts',
    subtitle: 'Create lane contracts from award outcomes and send for approvals.',
    kpis: [{ label: 'Contracts Created', value: '187', trend: 'QTD' }, { label: 'Pending Sign-off', value: '26', trend: 'Finance queue' }, { label: 'Sync to TMS', value: '98.4%', trend: '+0.8%' }],
    filters: ['Client', 'Contract Type', 'Approval State', 'Sync Status'],
    actions: ['Generate Contract', 'Send for Approval', 'Push to TMS'],
    columns: ['Contract ID', 'Lane', 'Vendor', 'Validity', 'State'],
  },
  '/finance/invoice-queue': {
    title: 'Invoice Queue',
    subtitle: 'Review inbound invoices, mismatch flags, and approval backlog.',
    kpis: [{ label: 'Pending Invoices', value: '512', trend: '-22 today' }, { label: 'Auto-matched', value: '74%', trend: '+4%' }, { label: 'Mismatch', value: '83', trend: 'Requires review' }],
    filters: ['Client', 'Vendor', 'Aging', 'Mismatch Type'],
    actions: ['Review Invoice', 'Approve Batch', 'Export Exceptions'],
    columns: ['Invoice No', 'Vendor', 'Amount', 'Match Status', 'Aging'],
  },
  '/finance/customer-ar': {
    title: 'Customer Accounts Receivable',
    subtitle: 'Track receivables, overdue buckets, and collection progress.',
    kpis: [{ label: 'Outstanding', value: '₹14.2Cr', trend: '-₹0.6Cr' }, { label: 'Over 60 Days', value: '₹2.1Cr', trend: '-11%' }, { label: 'Collection Efficiency', value: '93%', trend: '+2%' }],
    filters: ['Client', 'Bucket', 'Collector', 'Dispute Flag'],
    actions: ['Send Statement', 'Record Collection', 'Raise Dispute'],
    columns: ['Client', 'Invoice Count', 'Outstanding', 'Bucket', 'Collector'],
  },
  '/finance/vendor-ap': {
    title: 'Vendor Accounts Payable',
    subtitle: 'Plan payable release, TDS impact, and settlement cycles.',
    kpis: [{ label: 'Payables Due', value: '₹9.7Cr', trend: 'Next 10 days' }, { label: 'Ready for Release', value: '₹6.4Cr', trend: '+₹0.3Cr' }, { label: 'Blocked', value: '₹0.9Cr', trend: 'Compliance holds' }],
    filters: ['Vendor', 'Due Date', 'Compliance Flag', 'Payment Mode'],
    actions: ['Prepare Run', 'Hold Payment', 'Release Approved'],
    columns: ['Vendor', 'Invoice', 'Net Payable', 'Due Date', 'Status'],
  },
  '/finance/driver-advances': {
    title: 'Driver Advances',
    subtitle: 'Disburse and settle trip-level advances with control checks.',
    kpis: [{ label: 'Outstanding Advances', value: '₹74L', trend: '-₹4L' }, { label: 'Settled Trips', value: '1,136', trend: 'MTD' }, { label: 'Delayed Settlement', value: '33', trend: 'Follow-up' }],
    filters: ['Client', 'Trip Status', 'Driver', 'Settlement Aging'],
    actions: ['Disburse Advance', 'Settle Trip', 'Flag Recovery'],
    columns: ['Trip ID', 'Driver', 'Advance', 'Settled', 'Balance'],
  },
  '/finance/notes': {
    title: 'Finance Notes',
    subtitle: 'Capture approvals, reconciliation notes, and policy exceptions.',
    kpis: [{ label: 'Open Notes', value: '128', trend: '+11' }, { label: 'Resolved', value: '64%', trend: '+6%' }, { label: 'Critical', value: '9', trend: 'Escalated' }],
    filters: ['Category', 'Client', 'Owner', 'Severity'],
    actions: ['Add Note', 'Attach Evidence', 'Mark Resolved'],
    columns: ['Note ID', 'Category', 'Linked Record', 'Owner', 'Status'],
  },
  '/finance/ledger': {
    title: 'General Ledger',
    subtitle: 'Review ledger entries, posting controls, and reconciliation points.',
    kpis: [{ label: 'Entries Posted', value: '12,408', trend: 'MTD' }, { label: 'Unreconciled', value: '214', trend: '-37' }, { label: 'Period Close', value: '82%', trend: 'In progress' }],
    filters: ['Ledger Head', 'Client', 'Posting Date', 'Reconciliation'],
    actions: ['Post Journal', 'Run Reco', 'Download Ledger'],
    columns: ['Txn ID', 'Date', 'Account', 'Debit/Credit', 'Reco Status'],
  },
  '/finance/payment-release': {
    title: 'Payment Release',
    subtitle: 'Control final release approvals with maker-checker safeguards.',
    kpis: [{ label: 'Awaiting Approval', value: '91', trend: 'Queue' }, { label: 'Released Today', value: '47', trend: '+9' }, { label: 'Rejected', value: '6', trend: 'Reason captured' }],
    filters: ['Approver', 'Client', 'Batch Type', 'Risk Flag'],
    actions: ['Approve Batch', 'Reject Batch', 'Schedule Release'],
    columns: ['Batch ID', 'Vendor Count', 'Amount', 'Approver', 'Status'],
  },
  '/finance/reports': {
    title: 'Finance Reports',
    subtitle: 'Cross-client reporting across AR, AP, auction outcomes, and operations.',
    kpis: [{ label: 'Scheduled Reports', value: '26', trend: '+2 this week' }, { label: 'Exports Today', value: '94', trend: 'High usage' }, { label: 'Data Freshness', value: '15 min', trend: 'SLA met' }],
    filters: ['Report Type', 'Client', 'Period', 'Granularity'],
    actions: ['Create Report', 'Schedule Email', 'Download Workbook'],
    columns: ['Report', 'Owner', 'Last Run', 'Format', 'Status'],
  },
};

export default function GenericScreen() {
  const location = useLocation();
  const config = screenConfigs[location.pathname] ?? {
    title: 'Dashboard',
    subtitle: 'Operational overview of managed-mode activities.',
    kpis: [
      { label: 'Open Items', value: '0', trend: 'No data' },
      { label: 'Completion', value: '0%', trend: 'No data' },
      { label: 'Alerts', value: '0', trend: 'No data' },
    ],
    filters: ['Date Range', 'Client', 'Status', 'Owner'],
    actions: ['Refresh', 'Export', 'Open Settings'],
    columns: ['Column A', 'Column B', 'Column C', 'Column D', 'Column E'],
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{config.title}</h1>
        <p className="mt-2 max-w-4xl text-slate-600">{config.subtitle}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {config.kpis.map((kpi) => (
            <article key={kpi.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{kpi.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{kpi.value}</p>
              <p className="mt-1 text-xs font-medium text-emerald-700">{kpi.trend}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_2fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <div className="mt-4 space-y-3">
            {config.filters.map((filter) => (
              <label key={filter} className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">{filter}</span>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder={`Select ${filter.toLowerCase()}`}
                  type="text"
                />
              </label>
            ))}
            <button className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">Apply Filters</button>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Table/List</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Live mock data</span>
          </div>
          <div className="overflow-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {config.columns.map((column) => (
                    <th key={column} className="px-3 py-2 text-left font-semibold text-slate-700">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[1, 2, 3, 4].map((row) => (
                  <tr key={row} className="hover:bg-slate-50">
                    {config.columns.map((column) => (
                      <td key={`${row}-${column}`} className="px-3 py-2 text-slate-600">
                        {column} {row}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Actions</h2>
          <div className="mt-4 space-y-2">
            {config.actions.map((action) => (
              <button
                key={action}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {action}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
            Managed-mode safety checks are enabled. Any publish/award actions require approval workflow.
          </div>
        </article>
      </section>

      <div className="text-xs text-slate-500">
        Screen: <span className="font-medium text-slate-700">{location.pathname}</span> • Includes loading, empty, and error state extension points.
      </div>
    </div>
  );
}
