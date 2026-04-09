import { motion } from 'motion/react';
import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

export function Booking() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', mode: '', date: '', time: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, course_title: formData.course, booking_type: 'demo', preferred_date: formData.date || null, preferred_time: formData.time || null, message: formData.message, mode: formData.mode }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(JSON.stringify(d)); }

      // ── Scroll to top so the success message is visible immediately ──
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', course: '', mode: '', date: '', time: '', message: '' });
      }, 3000);
    } catch (err: any) { setError('Failed to submit booking. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputCls = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#2d3748] bg-white dark:bg-[#161b22] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/40 outline-none transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0d1117] dark:via-[#0f172a] dark:to-[#0d1117] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Book Your Free Demo</h1>
          <p className="text-xl text-gray-600 dark:text-slate-400">Take the first step towards your IT career. Schedule a free consultation with our experts.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-[#1c2230] rounded-2xl shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-transparent dark:border-[#2d3748] p-8 md:p-12">

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 dark:text-slate-400 text-lg">Thank you for booking with us. Our team will contact you shortly to confirm your demo session.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="px-4 py-3 rounded-lg bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-sm">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    <User size={18} className="text-blue-600 dark:text-blue-400" /> Full Name *
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    <Mail size={18} className="text-blue-600 dark:text-blue-400" /> Email Address *
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  <Phone size={18} className="text-blue-600 dark:text-blue-400" /> Phone Number *
                </label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputCls} placeholder="+91 98765 43210" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Select Course *</label>
                  <select id="course" name="course" value={formData.course} onChange={handleChange} required className={inputCls}>
                    <option value="">Choose a course</option>
                    <option value="Cyber Security VAPT">Cyber Security VAPT</option>
                    <option value="Azure Data Engineering">Azure Data Engineering</option>
                    <option value="AI Security">AI Security</option>
                    <option value="DevOps Multi Cloud">DevOps (Multi Cloud)</option>
                    <option value="Information Security">Information Security</option>
                    <option value="AI / ML with Python">AI / ML with Python</option>
                    <option value="Java / Testing">Java / Testing</option>
                    <option value="SOC Analyst">SOC Analyst</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mode" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Preferred Mode *</label>
                  <select id="mode" name="mode" value={formData.mode} onChange={handleChange} required className={inputCls}>
                    <option value="">Select mode</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    <Calendar size={18} className="text-blue-600 dark:text-blue-400" /> Preferred Date *
                  </label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    <Clock size={18} className="text-blue-600 dark:text-blue-400" /> Preferred Time *
                  </label>
                  <select id="time" name="time" value={formData.time} onChange={handleChange} required className={inputCls}>
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" /> Additional Message
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={inputCls + " resize-none"} placeholder="Tell us about your goals and expectations..." />
              </div>

              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60">
                {loading ? 'Submitting...' : 'Book Free Demo'}
              </motion.button>

              <p className="text-sm text-gray-500 dark:text-slate-500 text-center">By submitting this form, you agree to our Terms & Conditions and Privacy Policy.</p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}