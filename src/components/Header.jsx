import { FaBars, FaBell, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppLayout } from '../layout/AppLayout';

const searchInputClass =
  'w-full rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { openSidebar } = useAppLayout();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="z-30 shrink-0 border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-2 sm:h-16 sm:gap-4">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={openSidebar}
            aria-label="Ouvrir le menu"
          >
            <FaBars className="h-5 w-5" />
          </button>

          <h1 className="max-w-[9rem] shrink-0 truncate text-base font-bold text-gray-900 sm:max-w-[11rem] lg:max-w-[14rem] sm:text-xl">
            {title}
          </h1>

          <div className="min-w-0 flex-1 px-2 sm:px-4 lg:px-6">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Recherche"
                className={searchInputClass}
                aria-label="Recherche"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              className="relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <FaBell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-red-600 px-0.5 text-[10px] font-bold leading-none text-white">
                3
              </span>
            </button>

            <div
              className="ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 sm:h-10 sm:w-10"
              aria-hidden
            >
              <span className="text-sm font-semibold text-gray-700">AD</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              aria-label="Déconnexion"
            >
              <FaSignOutAlt className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
