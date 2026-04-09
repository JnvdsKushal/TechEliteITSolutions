import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, CheckCircle, XCircle, Clock, Mail, Phone, Calendar, BookOpen } from 'lucide-react';

const API = '';

interface Booking {
  id: number; name: string; email: string; phone: string;
  course: number | null; course_title: string;
  booking_type: string; preferred_date: string | null;
  message: string; status: string; created_at: string;
}

const BADGE: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending:   'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};
const TYPE_LABEL: Record<string, string> = {
  demo: 'Free Demo', consultation: 'Consultation', enrollment: 'Enrollment',
};

export function AdminBookings() {
  const [bookings, setBookings]     = useState<Booking[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${API}/api/admin/bookings/`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setBookings)
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`${API}/api/admin/bookings/${id}/`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch { setError('Failed to update status.'); }
  };

  const filtered = bookings.filter(b => {
    const mf = filter === 'all' || b.status === filter;
    const ms = [b.name, b.email, b.course_title].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()));
    return mf && ms;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>Bookings</h1>
        <p className="text-slate-500 text-sm">Demo classes, consultations and enrollment requests</p>
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(counts).map(([s, c]) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              filter === s
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200'
            }`}
          >
            <span className="capitalize">{s}</span>
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${filter === s ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{c}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="Search by name, email or course…"
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Calendar size={36} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {b.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-slate-900">{b.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase">
                        {TYPE_LABEL[b.booking_type] || b.booking_type}
                      </span>
                    </div>
                    {b.course_title && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                        <BookOpen size={11} className="text-blue-500" /> {b.course_title}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Mail size={11} />{b.email}</span>
                      <span className="flex items-center gap-1"><Phone size={11} />{b.phone}</span>
                      {b.preferred_date && <span className="flex items-center gap-1"><Calendar size={11} />{b.preferred_date}</span>}
                      <span className="flex items-center gap-1"><Clock size={11} />{new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {b.message && (
                      <p className="mt-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">{b.message}</p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 outline-none cursor-pointer transition-all ${BADGE[b.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {b.status === 'pending' && (
                    <div className="flex gap-1.5">
                      <button onClick={() => updateStatus(b.id, 'confirmed')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        <CheckCircle size={12} /> Confirm
                      </button>
                      <button onClick={() => updateStatus(b.id, 'cancelled')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition-colors"
                      >
                        <XCircle size={12} /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}