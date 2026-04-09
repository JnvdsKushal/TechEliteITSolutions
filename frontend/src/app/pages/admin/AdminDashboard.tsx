import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, CheckCircle, Clock,
  Globe, MapPin, TrendingUp, XCircle,
} from 'lucide-react';

const API = '';

interface Stats {
  total_courses: number; active_courses: number;
  online_courses: number; offline_courses: number;
  total_bookings: number; pending_bookings: number;
  confirmed_bookings: number; cancelled_bookings: number;
  total_students: number;
  recent_bookings: Booking[];
}
interface Booking {
  id: number; name: string; course_title: string;
  created_at: string; status: string; booking_type: string;
  email: string; phone: string;
}

const STATUS_STYLE: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending:   'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
};
const STATUS_ICON: Record<string, JSX.Element> = {
  confirmed: <CheckCircle size={10} />,
  pending:   <Clock size={10} />,
  cancelled: <XCircle size={10} />,
};

export function AdminDashboard() {
  const [stats, setStats]     = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    fetch(`${API}/api/admin/stats/`)
      .then(r => r.ok ? r.json() : Promise.reject('Failed'))
      .then(setStats)
      .catch(() => setError('Could not load dashboard data. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-slate-500 text-sm">Your platform at a glance.</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : stats && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {[
              { icon: BookOpen,    label: 'Total Courses',    value: stats.total_courses,    sub: `${stats.active_courses} active`,         color: 'blue'   },
              { icon: Globe,       label: 'Online Courses',   value: stats.online_courses,   sub: 'Live & recorded',                         color: 'indigo' },
              { icon: MapPin,      label: 'Offline Courses',  value: stats.offline_courses,  sub: 'In-person classes',                       color: 'violet' },
              { icon: Calendar,    label: 'Total Bookings',   value: stats.total_bookings,   sub: `${stats.pending_bookings} pending`,        color: 'amber'  },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 24 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-${s.color}-100`}>
                  <s.icon size={19} className={`text-${s.color}-600`} />
                </div>
                <div className="text-3xl font-black text-slate-900 leading-none mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-sm font-semibold text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Booking status summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Pending',   value: stats.pending_bookings,   color: 'amber',   icon: Clock       },
              { label: 'Confirmed', value: stats.confirmed_bookings, color: 'emerald', icon: CheckCircle },
              { label: 'Cancelled', value: stats.cancelled_bookings, color: 'red',     icon: XCircle     },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.06 }}
                className={`bg-${s.color}-50 border border-${s.color}-100 rounded-2xl p-4 flex items-center gap-4`}
              >
                <div className={`w-10 h-10 rounded-xl bg-${s.color}-100 flex items-center justify-center shrink-0`}>
                  <s.icon size={19} className={`text-${s.color}-600`} />
                </div>
                <div>
                  <div className={`text-2xl font-black text-${s.color}-700`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    {s.value}
                  </div>
                  <div className={`text-xs font-semibold text-${s.color}-600`}>{s.label} Bookings</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick actions */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
                <h2 className="text-sm font-black text-slate-900 mb-5 uppercase tracking-wide" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  {[
                    { to: '/admin/courses',       icon: BookOpen,   bg: 'blue',    label: 'Manage Courses',   sub: 'Add, edit, delete'                },
                    { to: '/admin/bookings',       icon: Calendar,   bg: 'violet',  label: 'View Bookings',    sub: `${stats.pending_bookings} pending` },
                    { to: '/admin/announcements',  icon: TrendingUp, bg: 'emerald', label: 'Announcements',    sub: 'Update banner bar'                },
                  ].map(({ to, icon: Icon, bg, label, sub }) => (
                    <Link key={to} to={to}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border border-transparent hover:border-${bg}-100 hover:bg-${bg}-50 transition-all group`}
                    >
                      <div className={`w-9 h-9 rounded-lg bg-${bg}-100 flex items-center justify-center shrink-0`}>
                        <Icon size={16} className={`text-${bg}-600`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{label}</div>
                        <div className="text-xs text-slate-400">{sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent bookings */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Recent Bookings
                  </h2>
                  <Link to="/admin/bookings" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    View all →
                  </Link>
                </div>

                {stats.recent_bookings.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <Calendar size={30} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No bookings yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {stats.recent_bookings.map((b, i) => (
                      <motion.div key={b.id}
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + i * 0.05 }}
                        className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-xs shrink-0">
                            {b.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 truncate">{b.name}</div>
                            <div className="text-xs text-slate-400 truncate">
                              {b.course_title || 'General'} · <span className="capitalize">{b.booking_type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 text-right ml-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_STYLE[b.status]}`}>
                            {STATUS_ICON[b.status]} {b.status}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">
                            {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}