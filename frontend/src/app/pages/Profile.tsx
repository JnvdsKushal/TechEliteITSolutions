/**
 * SAVE THIS FILE AS: src/pages/Profile.tsx
 * (replace your existing Profile.tsx entirely)
 *
 * What changed from the dummy version:
 *  - Reads token from localStorage (set on login)
 *  - Fetches real user profile from GET /api/auth/profile/
 *  - Fetches real enrollments from GET /api/auth/enrollments/
 *  - Edit Profile PATCHes /api/auth/profile/ and updates localStorage user
 *  - Stats (enrolled / completed / in-progress) derived from real data
 *  - Loading + error states handled gracefully
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Clock,
  Edit3, Camera, ChevronRight, CheckCircle, TrendingUp, Lock,
  Save, X, AlertCircle, Loader2,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_joined: string;
}

interface Enrollment {
  id: number;
  course_title: string;
  course_type: 'online' | 'offline';
  duration: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  enrolled_on: string;
  preferred_date: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem('token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

// Status badge colours
const statusStyle: Record<string, string> = {
  confirmed: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  pending:   'bg-amber-50  dark:bg-amber-900/30  text-amber-600  dark:text-amber-400',
  cancelled: 'bg-rose-50   dark:bg-rose-900/30   text-rose-600   dark:text-rose-400',
};

// Gradient per course index (cycles)
const gradients = [
  'from-blue-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-violet-500 to-purple-500',
  'from-sky-500 to-blue-500',
  'from-orange-500 to-rose-500',
  'from-pink-500 to-fuchsia-500',
];

// ── Component ────────────────────────────────────────────────────────────────

export function Profile() {
  const navigate = useNavigate();

  // ── State ─────────────────────────────────────────────────────────────────
  const [profile,      setProfile]      = useState<UserProfile | null>(null);
  const [enrollments,  setEnrollments]  = useState<Enrollment[]>([]);
  const [loadingProfile,  setLoadingProfile]  = useState(true);
  const [loadingCourses,  setLoadingCourses]  = useState(true);
  const [profileError,    setProfileError]    = useState('');
  const [coursesError,    setCoursesError]    = useState('');

  const [isEditing,  setIsEditing]  = useState(false);
  const [activeTab,  setActiveTab]  = useState<'courses' | 'security'>('courses');
  const [form,       setForm]       = useState({ name: '', phone: '' });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError,   setSaveError]   = useState('');

  const inputCls =
    'w-full pl-10 pr-4 py-3 border-2 border-gray-100 dark:border-[#2d3748] ' +
    'bg-white dark:bg-[#161b22] text-gray-900 dark:text-slate-100 rounded-xl ' +
    'text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors';

  // ── Fetch profile ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }

    fetch('/api/auth/profile/', { headers: authHeaders() })
      .then(res => {
        if (res.status === 401) { navigate('/login'); throw new Error('unauth'); }
        if (!res.ok) throw new Error('Failed to load profile');
        return res.json();
      })
      .then((data: UserProfile) => {
        setProfile(data);
        setForm({ name: data.name, phone: data.phone || '' });
      })
      .catch(err => { if (err.message !== 'unauth') setProfileError('Could not load profile.'); })
      .finally(() => setLoadingProfile(false));
  }, [navigate]);

  // ── Fetch enrollments ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!getToken()) return;

    fetch('/api/auth/enrollments/', { headers: authHeaders() })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load enrollments');
        return res.json();
      })
      .then((data: Enrollment[]) => setEnrollments(data))
      .catch(() => setCoursesError('Could not load your courses.'))
      .finally(() => setLoadingCourses(false));
  }, []);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total      = enrollments.length;
  const confirmed  = enrollments.filter(e => e.status === 'confirmed').length;
  const pending    = enrollments.filter(e => e.status === 'pending').length;

  const achievements = [
    { icon: BookOpen,    label: 'Enrolled',   value: String(total),     gradient: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-100 dark:shadow-blue-900/30'     },
    { icon: CheckCircle, label: 'Confirmed',   value: String(confirmed), gradient: 'from-emerald-500 to-teal-500',  shadow: 'shadow-emerald-100 dark:shadow-emerald-900/30' },
    { icon: Award,       label: 'Pending',     value: String(pending),   gradient: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-100 dark:shadow-indigo-900/30'  },
    { icon: TrendingUp,  label: 'Total',       value: String(total),     gradient: 'from-sky-500 to-blue-500',      shadow: 'shadow-sky-100 dark:shadow-sky-900/30'       },
  ];

  // ── Save profile ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaveLoading(true);
    setSaveError('');
    try {
      const res = await fetch('/api/auth/profile/', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ name: form.name }),
      });
      if (!res.ok) throw new Error('Save failed');
      const updated: UserProfile = await res.json();
      setProfile(updated);

      // Keep localStorage in sync so navbar etc. reflect new name immediately
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem('user', JSON.stringify({ ...parsed, name: updated.name }));
      }
      setIsEditing(false);
    } catch {
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  // ── Loading / error screens ────────────────────────────────────────────────
  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="flex items-center gap-3 text-blue-600 dark:text-blue-400 text-lg font-bold"
          style={{ fontFamily: "'Exo 2', sans-serif" }}>
          <Loader2 className="w-6 h-6 animate-spin" /> Loading your profile…
        </motion.div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-slate-400 text-lg">{profileError}</p>
          <button onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> My Profile
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Learning Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
              Track your enrollments, manage your profile, and stay on top of your IT journey
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* ── Stats row ───────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative bg-white dark:bg-[#1c2230] border border-gray-100 dark:border-[#2d3748] rounded-2xl p-6 shadow-md ${item.shadow} hover:shadow-xl transition-all duration-300 overflow-hidden text-center`}>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-200 dark:border-blue-800 rounded-tl-2xl" />
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} mb-4 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  {loadingCourses ? '—' : item.value}
                </div>
                <div className="text-gray-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wide">
                  {item.label}
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Profile card (left) ─────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1c2230] border-2 border-gray-100 dark:border-[#2d3748] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-shadow duration-300">

              {/* Colour banner */}
              <div className="h-28 bg-gradient-to-br from-blue-600 to-indigo-600 relative">
                <div className="absolute inset-0 opacity-[0.08]"
                  style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
              </div>

              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-12 mb-4 w-fit">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center border-4 border-white dark:border-[#1c2230] shadow-lg">
                    <span className="text-white text-3xl font-black"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      {profile?.name?.charAt(0)?.toUpperCase() ?? '?'}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1c2230] shadow hover:bg-blue-700 transition-colors">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

                {/* Name / role */}
                <div className="mb-4">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    {profile?.name}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">TechElite Student</p>
                </div>

                {/* Info rows */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Mail,     value: profile?.email },
                    { icon: Phone,    value: profile?.phone || 'Not set' },
                    { icon: Calendar, value: `Joined ${profile?.date_joined}` },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="truncate">{item.value}</span>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Right content ───────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-2">

            {/* Tab switcher */}
            <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-[#161b22] p-1 rounded-xl w-fit">
              {(['courses', 'security'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize
                    ${activeTab === tab
                      ? 'bg-white dark:bg-[#1c2230] text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
                    }`}>
                  {tab === 'courses' ? 'My Enrollments' : 'Security'}
                </button>
              ))}
            </div>

            {/* ── Enrollments tab ─────────────────────────────────────── */}
            {activeTab === 'courses' && (
              <div className="space-y-5">
                {/* Loading state */}
                {loadingCourses && (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin mr-3" />
                    <span className="text-gray-500 dark:text-slate-400 text-sm">Loading your enrollments…</span>
                  </div>
                )}

                {/* Error state */}
                {!loadingCourses && coursesError && (
                  <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {coursesError}
                  </div>
                )}

                {/* Empty state */}
                {!loadingCourses && !coursesError && enrollments.length === 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-dashed border-blue-200 dark:border-blue-800/50 rounded-2xl p-10 text-center">
                    <BookOpen className="w-12 h-12 text-blue-400 dark:text-blue-500 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      No Enrollments Yet
                    </h4>
                    <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
                      You haven't enrolled in any courses yet. Start your IT career today!
                    </p>
                    <Link to="/courses/online"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                      Browse Courses <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}

                {/* Enrollment cards */}
                {!loadingCourses && enrollments.map((enrollment, index) => (
                  <motion.div key={enrollment.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group bg-white dark:bg-[#1c2230] border-2 border-gray-100 dark:border-[#2d3748] rounded-2xl p-6 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all duration-300">

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        {/* Colour dot */}
                        <div className={`w-11 h-11 rounded-xl flex-shrink-0 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-sm`}>
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1"
                            style={{ fontFamily: "'Exo 2', sans-serif" }}>
                            {enrollment.course_title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 flex-wrap">
                            {enrollment.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{enrollment.duration}</span>
                              </div>
                            )}
                            <span className="capitalize px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              {enrollment.course_type}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyle[enrollment.status] ?? statusStyle.pending}`}>
                              {enrollment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <div className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">Enrolled on</div>
                        <div className="text-sm font-bold text-gray-700 dark:text-slate-300">{enrollment.enrolled_on}</div>
                      </div>
                    </div>

                    {enrollment.preferred_date && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500 mt-2 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        Preferred start: {enrollment.preferred_date}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-[#2d3748]">
                      <Link to={`/courses/${enrollment.course_type}`}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:gap-2 transition-all">
                        View Course <ChevronRight className="w-4 h-4" />
                      </Link>
                      {enrollment.status === 'confirmed' && (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                          <Award className="w-4 h-4" /> Confirmed
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* "Browse more" card always shown at bottom */}
                {!loadingCourses && enrollments.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: enrollments.length * 0.08 + 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-dashed border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 text-center">
                    <BookOpen className="w-10 h-10 text-blue-400 dark:text-blue-500 mx-auto mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Explore More Courses</h4>
                    <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">Keep growing your skillset</p>
                    <Link to="/courses/online"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                      Browse Courses <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </div>
            )}

            {/* ── Security tab ────────────────────────────────────────── */}
            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#1c2230] border-2 border-gray-100 dark:border-[#2d3748] rounded-2xl p-8">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  Change Password
                </h3>
                <div className="space-y-5">
                  {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                    <div key={i}>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">{label}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                        <input type="password" placeholder="••••••••" className={inputCls} />
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm mt-2">
                    Update Password
                  </button>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2d3748]">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Account Security
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Two-Factor Authentication', status: 'Disabled', color: 'text-orange-500 dark:text-orange-400' },
                      { label: 'Login Notifications',       status: 'Enabled',  color: 'text-emerald-600 dark:text-emerald-400' },
                      { label: 'Active Sessions',           status: '1 Device', color: 'text-blue-600 dark:text-blue-400' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#161b22] rounded-xl">
                        <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{item.label}</span>
                        <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>

      {/* ── Edit Profile Modal ───────────────────────────────────────────── */}
      {isEditing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsEditing(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="bg-white dark:bg-[#1c2230] rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-transparent dark:border-[#2d3748]"
            onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white"
                style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Edit Profile
              </h3>
              <button onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2d3748] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3d4758] transition-colors">
                <X className="w-4 h-4 text-gray-600 dark:text-slate-300" />
              </button>
            </div>

            {saveError && (
              <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {saveError}
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                  <input type="text" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputCls} placeholder="Your full name" />
                </div>
              </div>

              {/* Email — read-only */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Email <span className="text-xs text-gray-400 font-normal ml-1">(cannot be changed)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-slate-600" />
                  <input type="email" value={profile?.email ?? ''} disabled
                    className={inputCls + ' opacity-50 cursor-not-allowed'} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsEditing(false)}
                className="flex-1 py-3 border-2 border-gray-200 dark:border-[#2d3748] text-gray-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saveLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
                {saveLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                  : <><Save className="w-4 h-4" /> Save Changes</>
                }
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}