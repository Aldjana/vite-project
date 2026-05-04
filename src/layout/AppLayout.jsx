import { createContext, useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getCurrentUser, getStoredToken } from '../services/authApi';

const AppLayoutContext = createContext(null);

export function useAppLayout() {
  const ctx = useContext(AppLayoutContext);
  if (!ctx) {
    throw new Error('useAppLayout doit être utilisé dans AppLayout');
  }
  return ctx;
}

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const token = getStoredToken();
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData.user);
        } catch (error) {
          console.error('Failed to load user:', error);
        }
      }
    };
    loadUser();
  }, []);

  const value = { sidebarOpen, openSidebar, closeSidebar, user, setUser };

  return (
    <AppLayoutContext.Provider value={value}>
      <div className="flex h-[100dvh] min-h-0 bg-gray-50">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Fermer le menu"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] lg:hidden"
            onClick={closeSidebar}
          />
        )}
        <Sidebar user={user} />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </AppLayoutContext.Provider>
  );
}
