// ── OnlineCourses.tsx ─────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, Video, BookOpen, ArrowRight, Star, Zap } from 'lucide-react';
import { NetworkBackground } from '../components/NetworkBackground';

/* ── Courses ─────────────────────────────────────────────────────────────── */
const staticCourses = [
  {
    id: 1, slug: 'cyber-security-vapt', level: 'Beginner Friendly', rating: '4.9',
    title: 'Cyber Security VAPT', badge: 'ZERO CODING', duration: '2 Months',
    students: '1800+ students',
    description: 'Master Vulnerability Assessment & Penetration Testing with hands-on labs. No coding background required.',
    topics: ['Network Security', 'VAPT Tools', 'Ethical Hacking', 'Zero Coding'],
    accent: 'from-blue-700 via-blue-600 to-cyan-500',
    // Ethical hacking / penetration testing visual
    img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80',
  },
  {
    id: 2, slug: 'azure-data-engineering', level: 'Intermediate', rating: '4.8',
    title: 'Azure Data Engineering', badge: 'MICROSOFT', duration: '2 Months',
    students: '980+ students',
    description: 'Build enterprise-grade data pipelines using ADF, Synapse Analytics, and Databricks on Azure.',
    topics: ['Azure ADF', 'Synapse', 'Databricks', 'Data Lakes'],
    accent: 'from-red-600 via-red-500 to-orange-400',
    // Cloud / data pipeline infrastructure
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
  },
  {
    id: 3, slug: 'ai-security', level: 'Advanced', rating: '4.9',
    title: 'AI Security', badge: 'HOT 🔥', duration: '2 Months',
    students: '650+ students',
    description: 'Secure AI systems and ML pipelines. Learn adversarial attacks, model hardening, and AI governance.',
    topics: ['AI Threat Modeling', 'Adversarial ML', 'LLM Security', 'Red Teaming', 'AI Governance'],
    accent: 'from-amber-500 via-yellow-400 to-orange-400',
    // AI / neural network visualization
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  },
  {
    id: 4, slug: 'devops-multi-cloud', level: 'Intermediate', rating: '4.8',
    title: 'DevOps (Multi Cloud)', badge: 'AWS · AZURE · GCP', duration: '2 Months',
    students: '1200+ students',
    description: 'Master CI/CD pipelines, Kubernetes, and multi-cloud infrastructure across AWS, Azure, and GCP.',
    topics: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Multi-Cloud'],
    accent: 'from-indigo-600 via-blue-600 to-violet-500',
    // Server racks / infrastructure
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  },
  {
    id: 5, slug: 'information-security', level: 'Intermediate', rating: '4.7',
    title: 'Information Security', badge: 'CISSP PREP', duration: '2 Months',
    students: '900+ students',
    description: 'Comprehensive InfoSec training covering risk management, compliance, and enterprise security frameworks.',
    topics: ['ISO 27001', 'Risk Management', 'CISSP Prep', 'GRC', 'Compliance'],
    accent: 'from-rose-600 via-red-500 to-red-600',
    // Lock / security shield concept
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
  },
  {
    id: 6, slug: 'ai-ml-python', level: 'Beginner to Advanced', rating: '4.9',
    title: 'AI / ML with Python', badge: 'MOST POPULAR', duration: '2 Months',
    students: '2100+ students',
    description: 'End-to-end AI and Machine Learning with Python. From fundamentals to deploying production models.',
    topics: ['Python', 'ML Algorithms', 'Deep Learning', 'NLP', 'Model Deployment'],
    accent: 'from-yellow-500 via-amber-400 to-yellow-500',
    // Python / machine learning code on screen
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  },
  {
    id: 7, slug: 'java-testing', level: 'Beginner', rating: '4.7',
    title: 'Java / Testing', badge: 'PLACEMENT FOCUSED', duration: '2 Months',
    students: '1400+ students',
    description: 'Full Java development with manual and automation testing. Industry-ready with Selenium and JUnit.',
    topics: ['Core Java', 'Spring Boot', 'Selenium', 'JUnit', 'API Testing'],
    accent: 'from-blue-700 via-blue-600 to-indigo-600',
    // Software development / coding
    img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
  },
  {
    id: 8, slug: 'soc-analyst', level: 'Intermediate', rating: '4.8',
    title: 'SOC Analyst', badge: 'IN DEMAND', duration: '2 Months',
    students: '750+ students',
    description: 'Become a Security Operations Center analyst. Monitor, detect, and respond to cyber threats in real time.',
    topics: ['SIEM Tools', 'Threat Detection', 'Incident Response', 'Log Analysis', 'SOC Workflow'],
    accent: 'from-slate-700 via-slate-600 to-blue-600',
    // Multiple monitors / SOC operations center
    img: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=600&q=80',
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
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-2xl transition-all duration-300"
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
          <p className="text-white/70 text-xs uppercase tracking-widest mb-0.5">{course.level}</p>
          <h3 className="text-white text-lg font-extrabold leading-snug" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            {course.title}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{course.description}</p>
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" />{course.duration}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-400" />{course.students}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.topics.map((t, i) => (
            <span key={i} className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">{t}</span>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/course/${course.slug}`}
            className={`
              flex items-center justify-center gap-1.5
              bg-gradient-to-r ${course.accent}
              text-white
              px-5 py-2.5 rounded-xl text-sm font-bold w-full
              shadow-md dark:shadow-none
              hover:brightness-110 hover:scale-105
              transition-all duration-200
              ring-2 ring-transparent
              hover:ring-white/30 dark:hover:ring-white/20
            `}
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export function OnlineCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses/online/')
      .then(res => res.json())
      .then(data => {
        // Only use API data if it includes images; otherwise fall back to static
        if (data && data.length > 0 && data[0]?.img) {
          setCourses(data);
        } else {
          setCourses(staticCourses);
        }
        setLoading(false);
      })
      .catch(() => {
        // Backend unavailable — use static courses with curated images
        setCourses(staticCourses);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
        className="text-blue-600 dark:text-blue-400 text-xl font-bold" style={{ fontFamily: "'Exo 2', sans-serif" }}>
        Loading Courses…
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── light theme + NetworkBackground ─────────────────────── */}
      <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden pt-16 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
        <NetworkBackground />

        {/* Soft ambient blobs */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-8 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-700/20 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute top-16 right-16 w-80 h-80 bg-indigo-100/40 dark:bg-indigo-700/20 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -25, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-4 left-1/3 w-64 h-64 bg-sky-200/35 dark:bg-sky-700/20 rounded-full blur-3xl"
            animate={{ y: [0, 35, 0] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="relative z-[3] max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            Live · Recorded · Lifetime Access
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white mb-5 leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Online{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">Courses</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Learn from anywhere with interactive online courses. Live classes, recorded sessions, and 100% job assistance.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            {[
              { icon: Video,    text: 'Live Interactive Classes' },
              { icon: BookOpen, text: 'Lifetime Access'          },
              { icon: Users,    text: 'Expert Mentorship'        },
              { icon: Award,    text: 'Certifications'           },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 border border-blue-100 dark:border-gray-700 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                <f.icon className="w-4 h-4 text-blue-500" /> {f.text}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-[3]" />
      </section>

      {/* ── Courses Grid ─────────────────────────────────────────────────── */}
      <section className="relative py-16 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Our Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Choose Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Program</span>
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-lg">Industry-aligned courses built for the modern tech landscape</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course: any, index: number) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200/25 dark:bg-blue-700/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-700/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Not Sure Which{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Course?</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-10">Book a free consultation with our career counselors</p>
            <Link to="/booking"
              className="
                inline-flex items-center gap-2
                bg-blue-600 dark:bg-blue-500
                text-white
                px-10 py-4 rounded-xl text-lg font-bold
                shadow-lg shadow-blue-200 dark:shadow-blue-900
                hover:bg-blue-700 dark:hover:bg-blue-400
                hover:shadow-blue-300 dark:hover:shadow-blue-800
                hover:scale-105
                transition-all duration-300
              ">
              Schedule Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}