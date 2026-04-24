
import { useLocation } from 'react-router-dom';

export default function GenericScreen() {
  const location = useLocation();

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">{location.pathname.replace('/', '') || 'Dashboard'}</h1>
      <p className="text-slate-600">Mock UI scaffold with filters, tables, forms, and state placeholders.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border">Filters</div>
        <div className="bg-white rounded-xl p-4 border">Table/List</div>
        <div className="bg-white rounded-xl p-4 border">Actions</div>
      </div>
      <p className="text-xs text-slate-500">Includes loading, empty, error state hooks with mock API envelope.</p>
    </div>
  );
}
