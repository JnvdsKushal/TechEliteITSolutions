import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Mail, Phone, Calendar } from 'lucide-react';

const API = '';

interface Enrollment {
  id: number; name: string; email: string; phone: string;
  course: string; date: string; status: string; amount: string;
}

export function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [filter, setFilter]           = useState<'all'|'pending'|'confirmed'|'cancelled'>('all');
  const [searchTerm, setSearchTerm]   = useState('');

  useEffect(() => {
    fetch(`${API}/api/admin/enrollments/`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setEnrollments)
      .catch(() => setError('Failed to load enrollments.'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`${API}/api/admin/enrollments/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch {
      setError('Failed to update status.');
    }
  };

  const filtered = enrollments.filter(e => {
    const matchFilter = filter === 'all' || e.status === filter;
    const matchSearch = [e.name, e.email, e.course].some(f =>
      f.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchFilter && matchSearch;
  });

  const counts = {
    all: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    confirmed: enrollments.filter(e => e.status === 'confirmed').length,
    cancelled: enrollments.filter(e => e.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <Link to="/admin" className="text-blue-600 text-sm font-semibold mb-2 inline-block">← Back to Dashboard</Link>
          <h1 className="text-4xl font-bold text-gray-900">Student Enrollments</h1>
          <p className="text-gray-600 mt-2">Manage and review all student enrollments</p>
        </div>

        {error && <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {(Object.entries(counts) as [string, number][]).map(([s, c]) => (
            <button key={s} onClick={() => setFilter(s as any)}
              className={`p-4 rounded-xl border-2 transition-all ${filter === s ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-200'}`}
            >
              <div className="text-2xl font-bold text-gray-900">{c}</div>
              <div className="text-sm text-gray-600 capitalize">{s}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search by name, email, or course..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Student', 'Course', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12 text-gray-400">No enrollments found.</td></tr>
                  ) : filtered.map((e, i) => (
                    <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{e.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><Mail size={13} />{e.email}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><Phone size={13} />{e.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{e.course}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600"><Calendar size={13} />{e.date}</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{e.amount || '—'}</td>
                      <td className="px-6 py-4">
                        <select value={e.status} onChange={ev => handleStatusChange(e.id, ev.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-2 outline-none cursor-pointer ${
                            e.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                            e.status === 'pending'   ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                                       'bg-red-100 text-red-700 border-red-200'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {e.status === 'pending' && (
                          <div className="flex gap-2">
                            <button onClick={() => handleStatusChange(e.id, 'confirmed')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={18} /></button>
                            <button onClick={() => handleStatusChange(e.id, 'cancelled')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><XCircle size={18} /></button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}