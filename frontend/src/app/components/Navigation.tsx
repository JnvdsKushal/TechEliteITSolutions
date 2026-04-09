// ── src/components/Navigation.tsx ─────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, User, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import logo from '../../assets/logo.png';

interface UserData {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_staff?: boolean;
  is_admin?: boolean;
  is_superuser?: boolean;
  role?: string;
}

export function Navigation() {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen]       = useState(false);
  const [isProfileOpen, setIsProfileOpen]       = useState(false);
  const [user, setUser]                         = useState<UserData | null>(null);
  const location   = useLocation();
  const navigate   = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const loadUser = () => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) { const parsed = JSON.parse(raw); setUser(parsed); }
      else setUser(null);
    } catch { setUser(null); }
  };

  useEffect(() => { loadUser(); }, []);
  useEffect(() => { loadUser(); }, [location.pathname]);
  useEffect(() => { window.addEventListener('storage', loadUser); return () => window.removeEventListener('storage', loadUser); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCoursesOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const isAdmin = !!(
    user?.is_staff     === true ||
    user?.is_admin     === true ||
    user?.is_superuser === true ||
    user?.role         === 'admin'
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login');
  };

  const getDisplayName = () => {
    if (!user) return '';
    const full = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.name || '';
    return full.trim() || user.email?.split('@')[0] || 'Account';
  };

  const getInitials = () => {
    const name = getDisplayName();
    if (name && name !== 'Account') return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  return (
    <nav className={`w-full fixed top-[40px] left-0 right-0 z-50 transition-all duration-300 h-[85px]
      ${isScrolled
        ? 'bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
        : 'bg-white dark:bg-[#0d1117] shadow-sm dark:shadow-none border-b border-transparent dark:border-[#21293a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">

          {/* ── Logo ── left on mobile, centered on desktop via flex-1 trick */}
          <Link to="/" className="flex items-center h-full pl-3 shrink-0">
            <img
              src={logo}
              alt="TechElite IT Solutions"
              className="h-18 md:h-20 w-auto object-contain object-left"
            />
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {[
                { path: '/',         label: 'Home'     },
                { path: '/services', label: 'Services' },
                { path: '/about',    label: 'About'    },
                { path: '/contact',  label: 'Contact'  },
              ].map(({ path, label }) => (
                <Link key={path} to={path}
                  className={`text-sm font-semibold transition-colors duration-200 relative group
                    ${isActive(path)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-200
                    ${isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}

              {/* Courses dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200
                  ${location.pathname.startsWith('/courses')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  Courses
                  <ChevronDown size={15} className="transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                <div
                  className="absolute left-0 top-full w-52 bg-white dark:bg-[#1c2230] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d3748] py-2 z-50
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200"
                >
                  {[
                    { to: '/courses/online',     label: 'Online Courses'  },
                    { to: '/courses/offline',    label: 'Offline Courses' },
                    { to: '/courses/placements', label: 'Placements'      },
                  ].map(({ to, label }) => (
                    <Link key={to} to={to}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right side ── */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle variant="icon" />

            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link to="/admin"
                    className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm">
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                )}

                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileOpen(v => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-600">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${isAdmin ? 'bg-violet-600' : 'bg-blue-600 dark:bg-blue-500'}`}>
                      {getInitials()}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-200 max-w-[110px] truncate">{getDisplayName()}</span>
                    <ChevronDown size={14} className={`text-gray-400 dark:text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#1c2230] rounded-2xl shadow-2xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-gray-100 dark:border-[#2d3748] py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-[#2d3748]">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${isAdmin ? 'bg-violet-600' : 'bg-blue-600'}`}>
                            {getInitials()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-800 dark:text-slate-100 truncate">{getDisplayName()}</p>
                            <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{user.email}</p>
                          </div>
                        </div>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                            ✦ Admin
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        {isAdmin && (
                          <Link to="/admin"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                            onClick={() => setIsProfileOpen(false)}>
                            <LayoutDashboard size={15} /> Admin Dashboard
                          </Link>
                        )}
                        <Link to="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setIsProfileOpen(false)}>
                          <User size={15} /> My Profile
                        </Link>
                        <Link to="/settings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setIsProfileOpen(false)}>
                          <Settings size={15} /> Settings
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 dark:border-[#2d3748] pt-1">
                        <button onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors font-medium">
                          <LogOut size={15} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login"
                  className="text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-xl transition-colors">
                  Login
                </Link>
                <Link to="/register"
                  className="text-sm font-bold bg-blue-600 dark:bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile: theme toggle + hamburger ── */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle variant="icon" />
            <button onClick={() => setIsMobileMenuOpen(v => !v)}
              className="p-2 rounded-xl text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu — rendered outside the nav's inner div so it can be full-width + fully opaque ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 z-50
          bg-white dark:bg-[#0d1117]
          border-t border-gray-100 dark:border-[#21293a]
          shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]
          px-6 pb-6 pt-4 space-y-1"
        >
          {[
            { to: '/',         label: 'Home'     },
            { to: '/services', label: 'Services' },
            { to: '/about',    label: 'About'    },
            { to: '/contact',  label: 'Contact'  },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {label}
            </Link>
          ))}

          <div>
            <button onClick={() => setIsCoursesOpen(v => !v)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              Courses
              <ChevronDown size={15} className={`transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCoursesOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                {[
                  { to: '/courses/online',     label: 'Online Courses'  },
                  { to: '/courses/offline',    label: 'Offline Courses' },
                  { to: '/courses/placements', label: 'Placements'      },
                ].map(({ to, label }) => (
                  <Link key={to} to={to}
                    className="block px-2 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 dark:border-[#21293a] pt-3 mt-2">
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${isAdmin ? 'bg-violet-600' : 'bg-blue-600'}`}>
                    {getInitials()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-800 dark:text-slate-100 truncate">{getDisplayName()}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
                    <LayoutDashboard size={14} /> Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <User size={14} /> My Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <Settings size={14} /> Settings
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 px-1">
                <Link to="/login"
                  className="flex-1 text-center text-sm font-semibold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Login
                </Link>
                <Link to="/register"
                  className="flex-1 text-center text-sm font-bold bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}