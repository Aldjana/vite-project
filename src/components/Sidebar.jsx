import { NavLink } from 'react-router-dom';
import { FaHome, FaHotel, FaUser } from 'react-icons/fa';
import { useAppLayout } from '../layout/AppLayout';

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useAppLayout();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-gray-400 hover:bg-slate-800 hover:text-white'
    }`;

  const handleNav = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <aside
      className={[
        'flex h-full w-[min(18rem,88vw)] shrink-0 flex-col border-r border-slate-800 bg-slate-900',
        'fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:relative lg:z-auto lg:w-64 lg:translate-x-0',
      ].join(' ')}
      aria-label="Navigation principale"
    >
      <div className="p-5 pb-3 sm:p-6 sm:pb-4">
        <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">RED PRODUCT</h1>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 pt-2 sm:px-4">
        <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500 sm:text-[11px]">
          PRINCIPAL
        </p>
        <ul className="space-y-1">
          <li>
            <NavLink to="/dashboard" end className={linkClass} onClick={handleNav}>
              <FaHome className="text-lg opacity-90" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/hotels" className={linkClass} onClick={handleNav}>
              <FaHotel className="text-lg opacity-90" />
              <span>Liste des hôtels</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto border-t border-slate-800 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 sm:h-10 sm:w-10">
            <FaUser className="text-sm text-slate-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Aldjana seck</p>
            <p className="text-xs text-emerald-400">en ligne</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
