import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Calendar, Megaphone,
  ChevronLeft, ChevronRight, LogOut, Bell,
  Globe, Menu, ExternalLink, GraduationCap,
} from 'lucide-react';

const NAV = [
  { to: '/admin',                icon: LayoutDashboard, label: 'Dashboard',     exact: true  },
  { to: '/admin/courses',        icon: BookOpen,        label: 'Courses',       exact: false },
  { to: '/admin/bookings',       icon: Calendar,        label: 'Bookings',      exact: false },
  { to: '/admin/enrollments',    icon: GraduationCap,   label: 'Enrollments',   exact: false },
  { to: '/admin/announcements',  icon: Megaphone,       label: 'Announcements', exact: false },
];

export function AdminLayout() {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingCount, setPending]  = useState(0);
  const location  = useLocation();
  const navigate  = useNavigate();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();

  useEffect(() => {
    fetch('/api/admin/stats/')
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setPending(d.pending_bookings ?? 0))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const avatar = (user?.name || user?.email || 'A')[0].toUpperCase();
  const displayName = user?.name || user?.email?.split('@')[0] || 'Admin';

  const SidebarInner = ({ mini }: { mini: boolean }) => (
    <div className="flex flex-col h-full">

      {/* Brand */}
      <div className={`px-4 pt-6 pb-5 flex items-center gap-3 ${mini ? 'justify-center px-2' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40">
          <Globe size={17} className="text-white" />
        </div>
        {!mini && (
          <div>
            <p className="text-white font-black text-sm tracking-tight leading-none" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              TechElite
            </p>
            <p className="text-blue-300/60 text-[9px] uppercase tracking-[0.2em] mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      <div className="mx-3 h-px bg-white/[0.07] mb-4" />

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label, exact }) => {
          const active = isActive(to, exact);
          return (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                ${mini ? 'justify-center px-2' : ''}
                ${active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                }`}
            >
              <Icon size={18} className="shrink-0" />
              {!mini && <span className="text-sm font-medium flex-1">{label}</span>}
              {!mini && active && <div className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />}

              {/* Badge for Bookings */}
              {label === 'Bookings' && pendingCount > 0 && (
                <span className={`${mini ? 'absolute top-1 right-1' : ''} min-w-[18px] h-[18px] rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center px-1`}>
                  {pendingCount}
                </span>
              )}

              {/* Tooltip for collapsed */}
              {mini && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                  {label}
                  {label === 'Bookings' && pendingCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-rose-500 rounded-full text-[9px]">{pendingCount}</span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 mt-4 space-y-0.5">
        <div className="mx-1 h-px bg-white/[0.07] mb-3" />

        <Link to="/" onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-white transition-all ${mini ? 'justify-center px-2' : ''}`}
        >
          <ExternalLink size={17} className="shrink-0" />
          {!mini && <span className="text-sm font-medium">View Site</span>}
          {mini && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              View Site
            </div>
          )}
        </Link>

        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-400 transition-all ${mini ? 'justify-center px-2' : ''}`}
        >
          <LogOut size={17} className="shrink-0" />
          {!mini && <span className="text-sm font-medium">Logout</span>}
        </button>

        {!mini && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-black shrink-0">
              {avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate leading-tight">{displayName}</p>
              <p className="text-slate-500 text-[10px] truncate">{user?.is_superuser ? 'Super Admin' : 'Admin'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden" style={{ fontFamily: "'Exo 2', sans-serif" }}>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col relative shrink-0 transition-all duration-300 ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}
        style={{ background: 'linear-gradient(165deg, #0d1526 0%, #111827 50%, #0f1e35 100%)' }}
      >
        <SidebarInner mini={collapsed} />
        <button onClick={() => setCollapsed(v => !v)}
          className="absolute -right-3 top-[88px] w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-10 shadow-lg"
        >
          {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 w-[220px] flex flex-col shadow-2xl"
            style={{ background: 'linear-gradient(165deg, #0d1526 0%, #111827 50%, #0f1e35 100%)' }}
          >
            <SidebarInner mini={false} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-700 p-1">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-slate-400 text-xs">Admin</span>
              <span className="text-slate-300 text-xs">/</span>
              <span className="text-slate-700 font-semibold text-xs capitalize">
                {location.pathname === '/admin'
                  ? 'Dashboard'
                  : location.pathname.replace('/admin/', '').split('/')[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={17} />
              {pendingCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-black">
                {avatar}
              </div>
              <span className="hidden sm:block text-xs font-semibold text-slate-600">{displayName}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}