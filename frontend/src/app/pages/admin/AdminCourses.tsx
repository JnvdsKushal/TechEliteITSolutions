import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Edit2, Trash2, Save, X, BookOpen,
  Clock, Users, DollarSign, Globe, MapPin, ToggleLeft, ToggleRight,
} from 'lucide-react';

const API = '';

interface Course {
  id: number; title: string; slug: string; description: string;
  course_type: 'online' | 'offline'; level: string; duration: string;
  price: string; rating: string; students: string;
  topics: string[]; location: string; schedule: string; is_active: boolean;
}

const EMPTY: Omit<Course, 'id'> = {
  title: '', slug: '', description: '', course_type: 'online',
  level: 'Beginner', duration: '', price: '', rating: '4.5',
  students: '0+ students', topics: [], location: '', schedule: '', is_active: true,
};

export function AdminCourses() {
  const [courses, setCourses]   = useState<Course[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [form, setForm]         = useState<Omit<Course, 'id'>>(EMPTY);
  const [topicsInput, setTopicsInput] = useState('');

  const load = () => {
    setLoading(true);
    fetch(`${API}/api/admin/courses/`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setCourses)
      .catch(() => setError('Failed to load courses.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({ ...EMPTY });
    setTopicsInput('');
    setEditSlug(null);
    setShowForm(true);
  };

  const openEdit = (c: Course) => {
    setForm({ title: c.title, slug: c.slug, description: c.description, course_type: c.course_type,
      level: c.level, duration: c.duration, price: c.price, rating: c.rating,
      students: c.students, topics: c.topics, location: c.location, schedule: c.schedule, is_active: c.is_active });
    setTopicsInput(c.topics.join(', '));
    setEditSlug(c.slug);
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditSlug(null); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true); setError('');
    const payload = { ...form, topics: topicsInput.split(',').map(t => t.trim()).filter(Boolean) };
    const url    = editSlug ? `${API}/api/admin/courses/${editSlug}/` : `${API}/api/admin/courses/`;
    const method = editSlug ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(JSON.stringify(d)); }
      await load();
      closeForm();
    } catch (e: any) {
      setError(`Save failed: ${e.message}`);
    } finally { setSaving(false); }
  };

  const handleDelete = async (c: Course) => {
    if (!confirm(`Delete "${c.title}"?`)) return;
    setDeleting(c.id);
    try {
      await fetch(`${API}/api/admin/courses/${c.slug}/`, { method: 'DELETE' });
      setCourses(prev => prev.filter(x => x.id !== c.id));
    } catch { setError('Delete failed.'); }
    finally { setDeleting(null); }
  };

  const handleToggleActive = async (c: Course) => {
    try {
      const res = await fetch(`${API}/api/admin/courses/${c.slug}/`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !c.is_active }),
      });
      if (res.ok) setCourses(prev => prev.map(x => x.id === c.id ? { ...x, is_active: !x.is_active } : x));
    } catch { setError('Update failed.'); }
  };

  const F = (name: keyof typeof form, value: any) => setForm(f => ({ ...f, [name]: value }));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>Courses</h1>
          <p className="text-slate-500 text-sm">{courses.length} courses total</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={16} /> Add Course
        </button>
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p>No courses yet. Add your first course!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {courses.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl border shadow-sm p-5 transition-all hover:shadow-md ${c.is_active ? 'border-slate-100' : 'border-slate-200 opacity-60'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.course_type === 'online' ? 'bg-blue-100' : 'bg-violet-100'}`}>
                  {c.course_type === 'online' ? <Globe size={18} className="text-blue-600" /> : <MapPin size={18} className="text-violet-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${c.course_type === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>
                      {c.course_type}
                    </span>
                    {c.level && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{c.level}</span>}
                  </div>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">{c.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12} className="text-blue-500" />{c.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} className="text-blue-500" />{c.students}</span>
                    <span className="flex items-center gap-1"><DollarSign size={12} className="text-blue-500" />{c.price}</span>
                    {c.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-violet-500" />{c.location}</span>}
                  </div>
                  {c.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {c.topics.slice(0, 6).map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{t}</span>
                      ))}
                      {c.topics.length > 6 && <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full">+{c.topics.length - 6}</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleToggleActive(c)} title={c.is_active ? 'Deactivate' : 'Activate'}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                  >
                    {c.is_active ? <ToggleRight size={20} className="text-blue-500" /> : <ToggleLeft size={20} />}
                  </button>
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-slate-400 hover:text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(c)} disabled={deleting === c.id}
                    className="p-2 rounded-lg hover:bg-rose-50 transition-colors text-slate-400 hover:text-rose-600 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={closeForm}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  {editSlug ? 'Edit Course' : 'New Course'}
                </h2>
                <button onClick={closeForm} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[75vh] px-6 py-5">
                {error && <div className="mb-4 px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">{error}</div>}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Title *</label>
                    <input value={form.title} onChange={e => F('title', e.target.value)}
                      placeholder="Python Full Stack Development"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Type *</label>
                      <select value={form.course_type} onChange={e => F('course_type', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Level</label>
                      <select value={form.level} onChange={e => F('level', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Duration *</label>
                      <input value={form.duration} onChange={e => F('duration', e.target.value)}
                        placeholder="6 Months"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Price *</label>
                      <input value={form.price} onChange={e => F('price', e.target.value)}
                        placeholder="₹45,000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Students</label>
                      <input value={form.students} onChange={e => F('students', e.target.value)}
                        placeholder="1200+ students"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rating</label>
                      <input value={form.rating} onChange={e => F('rating', e.target.value)}
                        placeholder="4.5"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description *</label>
                    <textarea value={form.description} onChange={e => F('description', e.target.value)}
                      rows={3} placeholder="Describe the course..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Topics (comma-separated)</label>
                    <input value={topicsInput} onChange={e => setTopicsInput(e.target.value)}
                      placeholder="Python, Django, React, REST APIs"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                    />
                  </div>

                  {form.course_type === 'offline' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
                        <input value={form.location} onChange={e => F('location', e.target.value)}
                          placeholder="Hyderabad, India"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Schedule</label>
                        <input value={form.schedule} onChange={e => F('schedule', e.target.value)}
                          placeholder="Mon-Fri, 9am-1pm"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <label className="flex items-center gap-3 cursor-pointer" onClick={() => F('is_active', !form.is_active)}>
                    {form.is_active ? <ToggleRight size={26} className="text-blue-500" /> : <ToggleLeft size={26} className="text-slate-300" />}
                    <span className="text-sm font-semibold text-slate-700">{form.is_active ? 'Active' : 'Inactive'}</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button onClick={closeForm}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving || !form.title.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-lg shadow-blue-200"
                >
                  <Save size={15} />
                  {saving ? 'Saving…' : editSlug ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}