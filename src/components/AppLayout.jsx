import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import SidebarMonster from './SidebarMonster';
import { useTranslation } from '../utils/i18n';
import LanguageSelector from './LanguageSelector';
import { logoutUser } from '../utils/auth';
import './AppLayout.css';

export default function AppLayout() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    const confirmed = window.confirm(t('sidebar.logoutConfirm'));
    if (confirmed) {
      logoutUser();
      navigate('/login');
    }
  };

  return (
    <div className="app-shell">
      <LanguageSelector />
      <aside className="app-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" aria-hidden="true">
              <path d="M2 19h20v2H2v-2zm1.2-5l2-9 4.3 4.3L12 3l2.5 6.3L18.8 5l2 9H3.2z" />
            </svg>
            <span>EnvanterTakip</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              {t('sidebar.dashboard')}
            </NavLink>
            <NavLink to="/urunler" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              {t('sidebar.inventoryList')}
            </NavLink>
            <NavLink to="/urun-ekle" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              {t('sidebar.addProduct')}
            </NavLink>
            <NavLink to="/hakkimizda" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              {t('sidebar.aboutUs')}
            </NavLink>
            <button type="button" className="sidebar-link sidebar-logout" onClick={handleLogout}>
              {t('sidebar.logout')}
            </button>
          </nav>
        </div>

        <div className="sidebar-monster-wrap">
          <SidebarMonster />
        </div>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
