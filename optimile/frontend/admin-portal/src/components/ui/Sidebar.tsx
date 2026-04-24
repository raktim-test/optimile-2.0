import { NavLink } from 'react-router-dom';
const links = [
  ['Tenants', '/tenants'],
  ['Users', '/users'],
  ['Roles', '/roles'],
  ['Master Data', '/master-data'],
  ['Audit', '/audit']
];
export function Sidebar() { return <aside className="w-64 border-r border-slate-200 bg-white p-4">{links.map(([l,to])=><NavLink key={to} to={to} className={({isActive})=>`block rounded-lg px-3 py-2 ${isActive?'bg-indigo-50 text-indigo-700':'text-slate-700'}`}>{l}</NavLink>)}</aside>; }
