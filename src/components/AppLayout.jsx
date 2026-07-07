import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import SidebarMonster from './SidebarMonster';
import './AppLayout.css';

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Çıkış yapmak istediğinize emin misiniz?');
    if (confirmed) {
      navigate('/login');
    }
  };

  return (
    <div className="app-shell">
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
              Özet Paneli
            </NavLink>
            <NavLink to="/urunler" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              Ürün Listesi
            </NavLink>
            <NavLink to="/urun-ekle" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              Ürün Ekle
            </NavLink>
            <button type="button" className="sidebar-link sidebar-logout" onClick={handleLogout}>
              Çıkış Yap
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
