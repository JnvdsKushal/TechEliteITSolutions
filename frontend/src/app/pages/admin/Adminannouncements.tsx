// src/pages/admin/AdminAnnouncements.tsx
import { useState, useEffect, useCallback } from 'react';
import { Megaphone, Plus, Trash2, ToggleLeft, ToggleRight, GripVertical, Save, X } from 'lucide-react';

interface Announcement {
  id?: number;
  text: string;
  badge: string;
  badge_color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  link: string;
  link_label: string;
  is_active: boolean;
  order: number;
}

const BADGE_COLORS = ['blue', 'green', 'orange', 'red', 'purple'] as const;

const BADGE_STYLES: Record<string, string> = {
  blue:   'bg-blue-100 text-blue-700 border-blue-200',
  green:  'bg-emerald-100 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  red:    'bg-rose-100 text-rose-700 border-rose-200',
  purple: 'bg-violet-100 text-violet-700 border-violet-200',
};

const EMPTY: Announcement = {
  text: '', badge: '', badge_color: 'blue',
  link: '', link_label: 'Learn more', is_active: true, order: 0,
};

export function AdminAnnouncements() {
  const [items, setItems]     = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState<Announcement>(EMPTY);
  const [editId, setEditId]   = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/announcements/admin/', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load');
      setItems(await res.json());
    } catch {
      setError('Could not load announcements.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openCreate = () => { setForm({ ...EMPTY, order: items.length }); setEditId(null); setShowForm(true); };
  const openEdit   = (item: Announcement) => { setForm({ ...item }); setEditId(item.id ?? null); setShowForm(true); };
  const closeForm  = () => { setShowForm(false); setEditId(null); };

  const handleSave = async () => {
    if (!form.text.trim()) return;
    setSaving(true);
    try {
      const url    = editId ? `/api/announcements/admin/${editId}/` : '/api/announcements/admin/';
      const method = editId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method, credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      await fetchAll();
      closeForm();
    } catch { setError('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this announcement?')) return;
    await fetch(`/api/announcements/admin/${id}/`, { method: 'DELETE', credentials: 'include' });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleToggle = async (id: number) => {
    const res = await fetch(`/api/announcements/admin/${id}/toggle/`, { method: 'POST', credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setItems(prev => prev.map(i => i.id === id ? { ...i, is_active: data.is_active } : i));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Megaphone className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Announcement Bar
            </h1>
          </div>
          <p className="text-sm text-gray-500">Manage the scrolling news bar shown at the top of every page.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={16} /> Add Announcement
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>
      )}

      {/* Live preview */}
      {items.filter(i => i.is_active).length > 0 && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-blue-100 shadow-sm">
          <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Live Preview
          </div>
          <div
            className="relative overflow-hidden h-10"
            style={{ background: 'linear-gradient(90deg, #1e40af, #2563eb, #3b82f6, #1d4ed8)' }}
          >
            <div className="absolute inset-0 flex items-center px-4 gap-6 overflow-hidden">
              <Megaphone size={13} className="text-white/80 shrink-0" />
              {items.filter(i => i.is_active).map(item => (
                <span key={item.id} className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${BADGE_STYLES[item.badge_color]}`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="text-white/90 text-xs whitespace-nowrap">{item.text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Megaphone size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No announcements yet. Add one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                item.is_active
                  ? 'bg-white border-blue-100 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <GripVertical size={16} className="text-gray-300 shrink-0 cursor-grab" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {item.badge && (
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${BADGE_STYLES[item.badge_color]}`}>
                      {item.badge}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-gray-300">order: {item.order}</span>
                </div>
                <p className="text-sm text-gray-800 font-medium truncate">{item.text}</p>
                {item.link && (
                  <p className="text-xs text-blue-500 truncate mt-0.5">{item.link}</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggle(item.id!)}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title={item.is_active ? 'Deactivate' : 'Activate'}
                >
                  {item.is_active
                    ? <ToggleRight size={22} className="text-blue-500" />
                    : <ToggleLeft size={22} />
                  }
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="text-xs font-semibold text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id!)}
                  className="text-gray-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" onClick={closeForm} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {editId ? 'Edit Announcement' : 'New Announcement'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 p-1"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {/* Text */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Announcement Text *
                </label>
                <textarea
                  value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  rows={2}
                  placeholder="New batch starting for Cyber Security — limited seats available!"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 resize-none transition-colors"
                />
              </div>

              {/* Badge + color */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Badge Label</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                    placeholder='e.g. "New Batch"'
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Badge Color</label>
                  <div className="flex gap-2 pt-1">
                    {BADGE_COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setForm(f => ({ ...f, badge_color: c }))}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          form.badge_color === c ? 'scale-125 border-gray-600' : 'border-transparent'
                        } ${
                          c === 'blue' ? 'bg-blue-500' :
                          c === 'green' ? 'bg-emerald-500' :
                          c === 'orange' ? 'bg-orange-500' :
                          c === 'red' ? 'bg-rose-500' : 'bg-violet-500'
                        }`}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Link */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Link URL</label>
                  <input
                    type="url"
                    value={form.link}
                    onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Link Label</label>
                  <input
                    type="text"
                    value={form.link_label}
                    onChange={e => setForm(f => ({ ...f, link_label: e.target.value }))}
                    placeholder="Learn more"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              {/* Order + active */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                    min={0}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div className="flex flex-col justify-end pb-1">
                  <label
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                  >
                    {form.is_active
                      ? <ToggleRight size={28} className="text-blue-500" />
                      : <ToggleLeft size={28} className="text-gray-300" />
                    }
                    <span className="text-sm font-medium text-gray-700">
                      {form.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button onClick={closeForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.text.trim()}
                className="flex-2 flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Save size={15} />
                {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}