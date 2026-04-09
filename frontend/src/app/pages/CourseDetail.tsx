// ── CourseDetail.tsx ──────────────────────────────────────────────────────
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Clock, Users, Award, CheckCircle, BookOpen, Code, Star,
  ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Shield,
  Zap, Play, FileText, Briefcase,
} from 'lucide-react';
import { getCourseBySlug } from '../data/courses';
import { NetworkBackground } from '../components/NetworkBackground';

/* ── Accordion item for curriculum ──────────────────────────────────────── */
function ModuleAccordion({
  module, index, isOpen, toggle,
}: {
  module: { module: string; topics: string[] };
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-blue-200 shadow-md shadow-blue-50' : 'border-gray-100 hover:border-blue-100'}`}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-blue-50/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-colors duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
            {index + 1}
          </div>
          <span className="font-bold text-gray-900 text-sm md:text-base" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            {module.module}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          <span className="text-xs text-gray-400 hidden sm:block">{module.topics.length} topics</span>
          {isOpen
            ? <ChevronUp className="w-4 h-4 text-blue-500" />
            : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 space-y-2.5 bg-blue-50/30 border-t border-blue-100">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 pt-2.5">
                  <Play className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0 fill-blue-400" />
                  <span className="text-gray-600 text-sm">{topic}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = slug ? getCourseBySlug(slug) : null;

  const [openModules, setOpenModules] = useState<number[]>([0]);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mode: course?.type || 'online',
    date: '',
    message: '',
  });

  const toggleModule = (i: number) =>
    setOpenModules(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          booking_type: 'enrollment',
          preferred_date: formData.date || null,
          message: `Course: ${course?.title} | Mode: ${formData.mode}${formData.message ? ' | ' + formData.message : ''}`,
          course: null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(JSON.stringify(d));
      }
      // Scroll to top so the success state is visible immediately
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSubmitted(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setError('Enrollment failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Course not found ─────────────────────────────────────────────── */
  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-100" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <motion.div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100/35 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-[3] text-center bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl p-14 shadow-2xl max-w-md mx-6"
        >
          <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Course Not Found
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The course you're looking for doesn't exist or may have moved. Browse all our available programs below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/courses/online"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300">
              Online Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/courses/offline"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-200 text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300">
              Classroom Training
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Success state ────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-sky-50 to-blue-100 relative overflow-hidden">
        <NetworkBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl p-14 shadow-2xl max-w-md mx-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Enrollment Successful!
          </h2>
          <p className="text-gray-500 text-lg mb-2 leading-relaxed">
            Thank you for enrolling in <strong className="text-gray-800">{course.title}</strong>.
          </p>
          <p className="text-gray-400 text-sm mb-6">Our team will contact you shortly to confirm your enrollment.</p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">Redirecting to home…</p>
        </motion.div>
      </div>
    );
  }

  /* ── Main Detail Page ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-100" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-8 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0], x: [0, 20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute top-16 right-16 w-80 h-80 bg-indigo-100/35 rounded-full blur-3xl"
            animate={{ y: [0, -35, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="relative z-[3] max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to={`/courses/${course.type}`} className="hover:text-blue-600 transition-colors">
              {course.type === 'online' ? 'Online Courses' : 'Classroom Training'}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold truncate max-w-[200px]">{course.title}</span>
          </motion.nav>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${course.accent} opacity-85`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-white/20 backdrop-blur-sm border border-white/25 text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  {course.badge}
                </span>
                <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 px-3 py-1.5 rounded-full text-xs font-semibold">
                  {course.level}
                </span>
                <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span className="text-white text-xs font-bold">{course.rating} rating</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {course.title}
              </h1>
              <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                {course.detailedDescription}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                {[
                  { icon: Clock,    val: course.duration              },
                  { icon: Users,    val: `${course.students} enrolled` },
                  { icon: BookOpen, val: course.type === 'online' ? 'Online Live' : 'Classroom' },
                  { icon: Award,    val: 'Certificate included'       },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-[3]" />
      </section>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <section className="relative py-10 bg-white">
        {/* Subtle dot grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── Left: main content ─────────────────────────────── */}
            <div className="lg:col-span-2 space-y-2">

              {/* What You Will Learn */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm"
                style={{ boxShadow: '0 2px 20px rgba(37,99,235,0.06)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Code className="text-blue-600" size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    What You Will Learn
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-xl p-3.5"
                    >
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={17} />
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Curriculum */}
              {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
                style={{ boxShadow: '0 2px 20px rgba(37,99,235,0.04)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      Course Curriculum
                    </h2>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                    {(course.curriculum || []).length} modules
                  </span>
                </div>
                <div className="space-y-3">
                  {(course.curriculum || []).map((mod, i) => (
                    <ModuleAccordion
                      key={i} module={mod} index={i}
                      isOpen={openModules.includes(i)}
                      toggle={() => toggleModule(i)}
                    />
                  ))}
                </div>
              </motion.div> */}

              {/* Course Features */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
                style={{ boxShadow: '0 2px 20px rgba(37,99,235,0.04)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Zap className="text-blue-600" size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Course Features
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(course.features || []).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="text-white" size={15} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Prerequisites */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
                style={{ boxShadow: '0 2px 20px rgba(37,99,235,0.04)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="text-green-600" size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Prerequisites
                  </h2>
                </div>
                <ul className="space-y-3">
                  {(course.prerequisites || []).map((prereq, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm leading-relaxed">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

            {/* ── Right: sticky sidebar ──────────────────────────── */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }} className="sticky top-24">

                <AnimatePresence mode="wait">
                  {!showEnrollForm ? (
                    /* ── Enroll card ── */
                    <motion.div key="pricing"
                      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}
                      className="bg-white border border-blue-100 rounded-3xl p-8 shadow-xl"
                      style={{ boxShadow: '0 8px 40px rgba(37,99,235,0.12)' }}
                    >
                      {/* Enroll CTA */}
                      <motion.button
                        onClick={() => setShowEnrollForm(true)}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${course.accent} text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-3`}
                      >
                        Enroll Now
                      </motion.button>

                      <Link to="/booking"
                        className="w-full flex items-center justify-center gap-2 border-2 border-blue-200 text-blue-600 py-3.5 rounded-2xl font-bold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 text-sm mb-5">
                        <Briefcase className="w-4 h-4" /> Book Free Demo First
                      </Link>

                      {/* Includes */}
                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">This course includes:</h3>
                        <div className="space-y-2.5">
                          {course.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={15} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="border-t border-gray-100 mt-6 pt-5 space-y-2 text-sm text-gray-500">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Instructor</span>
                          <span className="text-gray-700 font-medium text-right max-w-[170px] text-xs leading-snug">{course.instructorInfo.split(' with ')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Enrolled</span>
                          <span className="text-gray-700 font-bold">{course.students} students</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-gray-700 font-bold">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── Enrollment form ── */
                    <motion.div key="form"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}
                      className="bg-white border border-blue-100 rounded-3xl p-8 shadow-xl"
                      style={{ boxShadow: '0 8px 40px rgba(37,99,235,0.12)' }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <button onClick={() => setShowEnrollForm(false)}
                          className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <ArrowLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <h3 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                          Complete Enrollment
                        </h3>
                      </div>

                      {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                          { id: 'name',  type: 'text',  label: 'Full Name *',   placeholder: 'John Doe'            },
                          { id: 'email', type: 'email', label: 'Email *',        placeholder: 'john@example.com'    },
                          { id: 'phone', type: 'tel',   label: 'Phone *',        placeholder: '+91 98765 43210'     },
                        ].map(field => (
                          <div key={field.id}>
                            <label htmlFor={field.id} className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                              {field.label}
                            </label>
                            <input type={field.type} id={field.id} name={field.id}
                              value={(formData as any)[field.id]} onChange={handleChange} required
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-800 placeholder-gray-400" />
                          </div>
                        ))}

                        <div>
                          <label htmlFor="date" className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Preferred Start Date *
                          </label>
                          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-800" />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Message (optional)
                          </label>
                          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3}
                            placeholder="Any questions or special requirements..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm text-gray-800 placeholder-gray-400" />
                        </div>

                        {/* Course summary box (no price) */}
                        <div className={`bg-gradient-to-r ${course.accent} rounded-2xl p-4 text-white`}>
                          <p className="font-bold text-sm opacity-90">Enrolling in:</p>
                          <p className="text-base font-black mt-0.5">{course.title}</p>
                          <p className="text-xs opacity-75 mt-1">{course.duration} · {course.type === 'online' ? 'Online Live' : 'Classroom'}</p>
                        </div>

                        <motion.button type="submit" disabled={loading}
                          whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                          className={`w-full bg-gradient-to-r ${course.accent} text-white py-4 rounded-2xl font-black text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60`}>
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <motion.div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                              Submitting…
                            </span>
                          ) : 'Complete Enrollment'}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA band ─────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <motion.div className="absolute top-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 text-lg mb-8">Join {course.students} students already enrolled in {course.title}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setShowEnrollForm(true); }}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Enroll Now <ArrowRight className="w-5 h-5" />
              </button>
              <Link to={`/courses/${course.type}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300">
                <ArrowLeft className="w-4 h-4" /> Browse All Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}