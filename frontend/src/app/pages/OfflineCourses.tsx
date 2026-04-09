// ── OfflineCourses.tsx ─────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, MapPin, Calendar, ArrowRight, Star, Zap, Building } from 'lucide-react';
import { NetworkBackground } from '../components/NetworkBackground';

/* ── Courses ─────────────────────────────────────────────────────────────── */
const staticCourses = [
  {
    id: 1, title: 'Cyber Security VAPT', badge: 'ZERO CODING',
    duration: '2 Months', students: '20/batch', rating: '4.9', location: 'Hyderabad',
    schedule: 'Mon-Fri, 10 AM - 1 PM',
    description: 'Master VAPT with hands-on labs in our security range. No prior coding needed.',
    topics: ['Network Security', 'VAPT Tools', 'Ethical Hacking',  'Zero Coding'],
    accent: 'from-blue-700 via-blue-600 to-cyan-500',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  },
  {
    id: 2, title: 'Azure Data Engineering', badge: 'MICROSOFT',
    duration: '2 Months', students: '20/batch', rating: '4.8', location: 'Hyderabad',
    schedule: 'Mon-Fri, 2 PM - 5 PM',
    description: 'Enterprise data pipelines using ADF, Synapse & Databricks in classroom labs.',
    topics: ['Azure ADF', 'Synapse', 'Databricks', 'Data Lakes'],
    accent: 'from-red-600 via-red-500 to-orange-400',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  },
  {
    id: 3, title: 'AI Security', badge: 'HOT 🔥',
    duration: '2 Months', students: '15/batch', rating: '4.9', location: 'Hyderabad',
    schedule: 'Mon-Fri, 10 AM - 1 PM',
    description: 'Secure AI/ML systems, harden LLMs, and master adversarial threat modeling.',
    topics: ['AI Threat Modeling', 'Adversarial ML', 'LLM Security', 'Red Teaming', 'AI Governance'],
    accent: 'from-amber-500 via-yellow-400 to-orange-400',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  },
  {
    id: 4, title: 'DevOps (Multi Cloud)', badge: 'AWS · AZURE · GCP',
    duration: '2 Months', students: '20/batch', rating: '4.8', location: 'Hyderabad',
    schedule: 'Mon-Fri, 2 PM - 5 PM',
    description: 'CI/CD, containerization & multi-cloud infrastructure with real enterprise projects.',
    topics: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Multi-Cloud'],
    accent: 'from-indigo-600 via-blue-600 to-violet-500',
    img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
  },
  {
    id: 5, title: 'Information Security', badge: 'CISSP PREP',
    duration: '2 Months', students: '20/batch', rating: '4.7', location: 'Hyderabad',
    schedule: 'Mon-Fri, 6 PM - 8 PM',
    description: 'Deep-dive into InfoSec risk management, ISO 27001, and enterprise compliance.',
    topics: ['ISO 27001', 'Risk Management', 'CISSP Prep', 'GRC', 'Compliance'],
    accent: 'from-rose-600 via-red-500 to-red-600',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
  },
  {
    id: 6, title: 'AI / ML with Python', badge: 'MOST POPULAR',
    duration: '2 Months', students: '20/batch', rating: '4.9', location: 'Hyderabad',
    schedule: 'Sat-Sun, 10 AM - 4 PM',
    description: 'Full AI & ML pipeline from Python basics to deploying production-ready models.',
    topics: ['Python', 'ML Algorithms', 'Deep Learning', 'NLP', 'Model Deployment'],
    accent: 'from-yellow-500 via-amber-400 to-yellow-500',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
  },
  {
    id: 7, title: 'Java / Testing', badge: 'PLACEMENT FOCUSED',
    duration: '2 Months', students: '25/batch', rating: '4.7', location: 'Hyderabad',
    schedule: 'Mon-Fri, 6 PM - 8 PM',
    description: 'Core Java, Spring Boot, and Selenium automation testing for job-ready graduates.',
    topics: ['Core Java', 'Spring Boot', 'Selenium', 'JUnit', 'API Testing'],
    accent: 'from-blue-700 via-blue-600 to-indigo-600',
    img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
  },
  {
    id: 8, title: 'SOC Analyst', badge: 'IN DEMAND',
    duration: '2 Months', students: '20/batch', rating: '4.8', location: 'Hyderabad',
    schedule: 'Mon-Fri, 10 AM - 1 PM',
    description: 'Operate in a live SOC environment — detect, investigate, and respond to real threats.',
    topics: ['SIEM Tools', 'Threat Detection', 'Incident Response', 'Log Analysis', 'SOC Workflow'],
    accent: 'from-slate-700 via-slate-600 to-blue-600',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
  },
];

/* ── Course Card ─────────────────────────────────────────────────────────── */
function CourseCard({ course, index }: { course: typeof staticCourses[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300"
      style={{ boxShadow: '0 2px 16px rgba(37,99,235,0.06)' }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className={`absolute inset-0 bg-gradient-to-br ${course.accent} opacity-70`} />
        <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
          {course.badge}
        </span>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
          <span className="text-white text-xs font-bold">{course.rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1 text-white/70 text-xs mb-0.5">
            <MapPin className="w-3 h-3" /> {course.location}
          </div>
          <h3 className="text-white text-lg font-extrabold leading-snug" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            {course.title}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-medium">{course.schedule}</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{course.description}</p>
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" />{course.duration}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-400" />{course.students}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.topics.map((t, i) => (
            <span key={i} className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-100">{t}</span>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100">
          <Link to="/booking"
            className={`flex items-center justify-center gap-1.5 bg-gradient-to-r ${course.accent} text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full`}>
            Book Seat <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export function OfflineCourses() {
  const [courses, setCourses] = useState(staticCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses/offline/')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
        className="text-blue-600 text-xl font-bold" style={{ fontFamily: "'Exo 2', sans-serif" }}>
        Loading Courses…
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── light theme + NetworkBackground ─────────────────────── */}
      <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-100" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-8 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute top-16 right-16 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -25, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-4 left-1/3 w-64 h-64 bg-sky-200/35 rounded-full blur-3xl"
            animate={{ y: [0, 35, 0] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="relative z-[3] max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-300 bg-blue-50 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            Small Batches · Personal Attention · Direct Mentorship
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-gray-900 mb-5 leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Classroom{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">Training</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Hands-on learning in our state-of-the-art training center in Hyderabad. 100% job assistance guaranteed.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            {[
              { icon: Users,    text: 'Small Batch (15–25)'    },
              { icon: MapPin,   text: 'Modern Labs, Hyderabad' },
              { icon: Calendar, text: 'Flexible Schedules'     },
              { icon: Award,    text: 'Placement Assured'      },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/80 border border-blue-100 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm">
                <f.icon className="w-4 h-4 text-blue-500" /> {f.text}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-[3]" />
      </section>

      {/* ── Courses Grid ─────────────────────────────────────────────────── */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Classroom Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Classroom{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Programs</span>
            </h2>
            <p className="text-gray-400 text-lg">Industry-aligned, hands-on, job-focused training</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course: any, index: number) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit Center ─────────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-50" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-blue-100 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  Visit Our Training Center
                </h2>
                <p className="text-gray-500 mb-6">Experience world-class infrastructure and meet our expert trainers in person.</p>
                <div className="space-y-4">
                  {[
                    { icon: MapPin,   label: 'Address',  value: 'Plot no.231, 2nd floor, Road no.12, Swamy Ayyappa Society, Madhapur, Hyderabad-500081 \n  Road no.2, Dhanalaxmi Center, ICICI Bank Building, 3rd Floor, KPHB Colony, Hyderabad-500072', sub: 'www.techeliteitsolutions.com' },
                    { icon: Clock,    label: 'Timing',   value: 'Monday – Saturday, 9:00 AM – 7:00 PM' },
                    { icon: Building, label: 'Contact',  value: '9133966888 · 9133454949' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-blue-600" size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">{item.label}</div>
                        <div className="text-gray-500 text-sm whitespace-pre-line">
                                {item.value}
                        </div>
                        {item.sub && <div className="text-xs text-blue-500 font-medium mt-0.5">{item.sub}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl h-64 flex items-center justify-center border border-blue-100">
                <div className="text-center">
                  <MapPin className="text-blue-300 mx-auto mb-3" size={48} />
                  <p className="font-bold text-gray-700 text-lg" style={{ fontFamily: "'Exo 2', sans-serif" }}>TechElite IT Solutions</p>
                  <p className="text-sm text-gray-400">Hyderabad, Telangana</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA — light theme + NetworkBackground ────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <motion.div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Limited Seats Available!
            </h2>
            <p className="text-blue-100 text-xl mb-10">Book your seat today and start your journey to a successful IT career</p>
            <Link to="/booking"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Book Free Demo Class <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}