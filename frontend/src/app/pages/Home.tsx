import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Award, Users, TrendingUp,
  Shield, ServerCog, Database, Lock, Brain, BarChart3,
  ArrowRight, Building2, Star,
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { NetworkBackground } from '../components/NetworkBackground';
import { AnnouncementBar } from '../components/AnnouncementBar';

const programs = [
  { title: 'Cyber Security',        description: 'Ethical hacking, network defence & top certifications like CEH and CISSP.', icon: Shield,    gradient: 'from-rose-500 to-orange-400',   shadow: 'shadow-rose-200',   glow: 'group-hover:shadow-rose-300'   },
  { title: 'DevOps',                description: 'CI/CD, Docker, Kubernetes & cloud-native infrastructure at scale.',         icon: ServerCog, gradient: 'from-emerald-500 to-teal-400',  shadow: 'shadow-emerald-200', glow: 'group-hover:shadow-emerald-300' },
  { title: 'Azure Data Engineering', description: 'ADF, Synapse & Databricks pipelines on Microsoft Azure.',                  icon: Database,  gradient: 'from-violet-500 to-purple-400', shadow: 'shadow-violet-200',  glow: 'group-hover:shadow-violet-300'  },
  { title: 'SAP Security & GRC',    description: 'SAP access control, risk frameworks & enterprise compliance.',              icon: Lock,      gradient: 'from-orange-500 to-amber-400',  shadow: 'shadow-orange-200',  glow: 'group-hover:shadow-orange-300'  },
  { title: 'Data Science',          description: 'ML models, neural networks & production AI with Python.',                   icon: Brain,     gradient: 'from-cyan-500 to-sky-400',      shadow: 'shadow-cyan-200',    glow: 'group-hover:shadow-cyan-300'    },
  { title: 'Data Analyst',          description: 'Power BI, SQL & advanced visualisation for business insights.',             icon: BarChart3, gradient: 'from-blue-600 to-indigo-500',   shadow: 'shadow-blue-200',    glow: 'group-hover:shadow-blue-300'    },
];

const successStories = [
  {
    name: 'Rajesh Kumar',
    course: 'Cyber Security VAPT',
    company: 'Palo Alto Networks',
    package: '₹12 LPA',
    testimonial: 'The placement support was excellent. Got placed in my dream company within 2 months of course completion.',
  },
  {
    name: 'Priya Sharma',
    course: 'AI / ML with Python',
    company: 'Microsoft',
    package: '₹15 LPA',
    testimonial: 'TechElite not only taught me technical skills but also prepared me for interviews. Forever grateful!',
  },
  {
    name: 'Arjun',
    course: 'DevOps (Multi Cloud)',
    company: 'Accenture',
    package: '₹11 LPA',
    testimonial: 'The real-time projects and CI/CD practice helped me crack interviews easily. The training was super practical.',
  },
  {
    name: 'Sravya',
    course: 'Azure Data Engineering',
    company: 'Infosys',
    package: '₹8 LPA',
    testimonial: 'From zero coding knowledge to getting placed in Infosys. The journey was amazing with TechElite.',
  },
  {
    name: 'Keerthi',
    course: 'AI Security',
    company: 'CrowdStrike',
    package: '₹18 LPA',
    testimonial: 'The curriculum was perfectly aligned with industry needs. The mock interviews helped a lot.',
  },
  {
    name: 'Harish',
    course: 'SOC Analyst',
    company: 'Fortinet',
    package: '₹10 LPA',
    testimonial: 'The hands-on labs gave me confidence to crack multiple interviews.',
  },
  {
    name: 'Divya',
    course: 'Information Security',
    company: 'Cisco',
    package: '₹11 LPA',
    testimonial: 'The structured approach and mentors made complex concepts easy to understand.',
  },
  {
    name: 'Tejaswini',
    course: 'AI / ML with Python',
    company: 'Cognizant',
    package: '₹13 LPA',
    testimonial: 'Loved the practical approach. It really helped me stand out during interviews.',
  },
  {
    name: 'Navya',
    course: 'Java / Testing',
    company: 'Capgemini',
    package: '₹9 LPA',
    testimonial: 'The placement-focused training helped me land my first job quickly.',
  },
  {
    name: 'Sindhu Reddy',
    course: 'Cyber Security VAPT',
    company: 'Zscaler',
    package: '₹10.5 LPA',
    testimonial: 'The VAPT labs were insane. I got real-world exposure which helped me a lot in interviews.',
  },
  {
    name: 'Likitha',
    course: 'Azure Data Engineering',
    company: 'IBM',
    package: '₹12 LPA',
    testimonial: 'Working on real data pipelines made learning super practical and useful.',
  },
  {
    name: 'Bhavya',
    course: 'DevOps (Multi Cloud)',
    company: 'SentinelOne',
    package: '₹9.5 LPA',
    testimonial: 'The cloud + DevOps combo training gave me a strong edge in placements.',
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ story, index, featured = false }) {
  const initials = story.name.split(' ').map(n => n[0]).join('');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className={`relative flex flex-col bg-white dark:bg-[#1c2230] rounded-2xl p-6 shadow-sm transition-all duration-300
        ${featured
          ? 'border-2 border-blue-500 shadow-blue-100 dark:shadow-blue-900/30 shadow-md scale-[1.02]'
          : 'border border-gray-200 dark:border-[#2d3748] hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-50 dark:hover:shadow-blue-900/20'
        }`}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-base" style={{ fontFamily: "'Exo 2', sans-serif" }}>{story.name}</p>
          <p className="text-blue-500 dark:text-blue-400 text-sm font-medium">{story.course}</p>
        </div>
      </div>

      {/* Company + Package */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-[#2d3748] rounded-xl px-4 py-2.5 mb-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400 text-sm">
          <Building2 className="w-4 h-4 shrink-0" />
          <span className="font-medium">{story.company}</span>
        </div>
        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg">{story.package}</span>
      </div>

      {/* Stars + Quote */}
      <StarRating />
      <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed italic">
        "{story.testimonial}"
      </p>
    </motion.div>
  );
}

export function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-sky-50 to-blue-100 dark:from-[#0d1117] dark:via-[#0f172a] dark:to-[#111827]" />
        <NetworkBackground />

        <div className="absolute inset-0 overflow-hidden z-[2] pointer-events-none">
          <motion.div className="absolute top-10 left-10 w-80 h-80 bg-blue-200/40 dark:bg-blue-500/10 rounded-full blur-3xl"
            animate={{ y: [0,80,0], x: [0,40,0], scale: [1,1.15,1] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute top-32 right-16 w-96 h-96 bg-indigo-100/60 dark:bg-indigo-500/10 rounded-full blur-3xl"
            animate={{ y: [0,-60,0], x: [0,-30,0], scale: [1,1.2,1] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-16 left-1/3 w-72 h-72 bg-sky-200/50 dark:bg-sky-500/10 rounded-full blur-3xl"
            animate={{ y: [0,50,0], x: [0,60,0], scale: [1,1.1,1] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                className="text-5xl md:text-6xl xl:text-[4.25rem] font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Transform Your Career with
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">
                  Expert IT Training
                </span>
              </motion.h1>

              <motion.p className="text-lg md:text-xl text-gray-500 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                Industry-leading courses in software development, cloud computing, and more.
                Learn from experts and get placement assistance.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                <Link to="/booking"
                  className="relative group overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900/30 hover:shadow-blue-300 hover:bg-blue-700 transition-all duration-300">
                  <span className="relative z-10">Book a Free Demo</span>
                </Link>
                <Link to="/courses/online"
                  className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-500 bg-white dark:bg-transparent px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-600 hover:shadow-md transition-all duration-300">
                  View Courses
                </Link>
              </motion.div>

              <motion.div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                {[
                  { icon: Users,      number: '5000+', label: 'Students Trained'  },
                  { icon: BookOpen,   number: '50+',   label: 'Courses Available' },
                  { icon: Award,      number: '95%',   label: 'Placement Rate'    },
                  { icon: TrendingUp, number: '100+',  label: 'Hiring Partners'   },
                ].map((stat, index) => (
                  <motion.div key={index}
                    className="group relative bg-white dark:bg-[#1c2230] border border-blue-100 dark:border-[#2d3748] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-[#1e2a3a] transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }} whileHover={{ y: -3 }}>
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-300 dark:border-blue-700 rounded-tl-2xl" />
                    <stat.icon className="w-6 h-6 text-blue-500 dark:text-blue-400 mb-3" />
                    <div className="text-2xl font-black text-gray-900 dark:text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{stat.number}</div>
                    <div className="text-gray-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div className="flex-1 flex items-center justify-center w-full lg:max-w-[520px]"
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}>
              <div className="relative w-full max-w-[460px] aspect-square">
                <div className="absolute inset-0 rounded-full bg-blue-200/40 dark:bg-blue-500/10 blur-3xl" />
                <div className="absolute inset-6 rounded-full border border-blue-200/70 dark:border-blue-700/40" />
                <DotLottieReact src="https://lottie.host/bf2dd201-294a-4240-b169-71d90d90b050/HKKu2urWZ9.lottie"
                  autoplay loop style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }} />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-[#0d1117] to-transparent z-[4]" />
      </section>

      {/* ─── Why Choose ─── */}
      <section className="py-24 bg-white dark:bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Why TechElite
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Why Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">TechElite?</span>
            </h2>
            <p className="text-lg text-gray-400 dark:text-slate-500 max-w-xl mx-auto">Your success is our priority</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { title: 'Expert Instructors', description: 'Learn from industry professionals with years of real-world experience in cutting-edge technologies.', icon: '⚡', accent: 'border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700', iconBg: 'bg-blue-50 dark:bg-blue-900/30', bar: 'from-blue-500 to-blue-600', shadow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/20' },
              { title: 'Hands-on Projects',  description: 'Build real-world projects to strengthen your portfolio, skills, and confidence for the job market.', icon: '🚀', accent: 'border-indigo-200 dark:border-indigo-900 hover:border-indigo-400 dark:hover:border-indigo-700', iconBg: 'bg-indigo-50 dark:bg-indigo-900/30', bar: 'from-indigo-500 to-indigo-600', shadow: 'hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20' },
              { title: 'Placement Support',  description: 'Get dedicated placement assistance with 100+ hiring partners to kickstart your IT career.',         icon: '🎯', accent: 'border-sky-200 dark:border-sky-900 hover:border-sky-400 dark:hover:border-sky-700',     iconBg: 'bg-sky-50 dark:bg-sky-900/30',     bar: 'from-sky-500 to-blue-500',     shadow: 'hover:shadow-sky-100 dark:hover:shadow-sky-900/20'     },
            ].map((feature, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} whileHover={{ y: -5 }}
                className={`group relative bg-white dark:bg-[#1c2230] border ${feature.accent} rounded-2xl p-8 shadow-sm hover:shadow-lg ${feature.shadow} transition-all duration-300 overflow-hidden`}>
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.iconBg} rounded-2xl text-3xl mb-6`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>{feature.title}</h3>
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-[0.95rem]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Training Programs ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white dark:from-[#0d1117] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gray-100 dark:bg-[#161b22]" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg,#1d4ed8,#1d4ed8 1px,transparent 1px,transparent 12px)` }} />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 xl:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#1c2230] text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Our Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Our Training{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Programs</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-slate-400 max-w-xl mx-auto">Industry-aligned courses built for the modern tech landscape</p>
          </motion.div>

          {/* ── Mobile: 2-column grid (hidden on sm and above) ── */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:hidden">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
                  className="group flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className={`relative flex items-center justify-center w-[100px] h-[100px] rounded-full bg-gradient-to-br ${program.gradient} shadow-lg ${program.shadow} ${program.glow} transition-shadow duration-300 mb-4 cursor-pointer`}
                  >
                    <div className="absolute inset-[3px] rounded-full bg-white/10" />
                    <Icon className="w-10 h-10 text-white drop-shadow-sm relative z-10" strokeWidth={1.75} />
                  </motion.div>
                  <h3 className="text-[0.85rem] font-extrabold text-gray-900 dark:text-white mb-1.5 leading-snug px-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{program.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-[0.75rem] leading-relaxed px-1">{program.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Tablet & Desktop: original horizontal flow (hidden on mobile) ── */}
          <div className="hidden sm:flex flex-col sm:flex-wrap md:flex-row items-start justify-center gap-y-10">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const isLast = index === programs.length - 1;
              return (
                <div key={program.title} className="flex items-start md:items-center">
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.15, ease: 'easeOut' }}
                    className="group flex flex-col items-center text-center w-[148px] xl:w-[160px] shrink-0">
                    <motion.div whileHover={{ scale: 1.1, y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`relative flex items-center justify-center w-[110px] h-[110px] rounded-full bg-gradient-to-br ${program.gradient} shadow-lg ${program.shadow} ${program.glow} transition-shadow duration-300 mb-5 cursor-pointer`}>
                      <div className="absolute inset-[3px] rounded-full bg-white/10" />
                      <Icon className="w-11 h-11 text-white drop-shadow-sm relative z-10" strokeWidth={1.75} />
                    </motion.div>
                    <h3 className="text-[0.9rem] font-extrabold text-gray-900 dark:text-white mb-2 leading-snug px-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{program.title}</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-[0.78rem] leading-relaxed px-1">{program.description}</p>
                  </motion.div>
                  {!isLast && (
                    <motion.div initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.35 }}
                      className="hidden md:flex items-center self-start mt-[38px] mx-1 xl:mx-2 shrink-0">
                      <div className="flex items-center gap-0.5">
                        <div className="w-4 xl:w-6 h-px border-t-2 border-dashed border-gray-300 dark:border-slate-600" />
                        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-slate-500 shrink-0" strokeWidth={2} />
                        <div className="w-4 xl:w-6 h-px border-t-2 border-dashed border-gray-300 dark:border-slate-600" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.9 }} className="text-center mt-14">
            <Link to="/courses/online"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900/30 hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 group">
              Explore All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-gray-100 dark:to-[#161b22] pointer-events-none" />
      </section>

      {/* ─── Success Stories ─── */}
      <section className="py-24 bg-white dark:bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Student Success
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Success{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Stories</span>
            </h2>
            <p className="text-lg text-gray-400 dark:text-slate-500 max-w-xl mx-auto">
              Real students. Real results. See how TechElite transformed their careers.
            </p>
          </motion.div>

          {/* ── Mobile: horizontal scroll carousel (hidden on md and above) ── */}
          <div className="md:hidden -mx-6 px-6">
            <div
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`.testimonial-scroll::-webkit-scrollbar { display: none; }`}</style>
              {successStories.map((story, index) => (
                <div
                  key={story.name}
                  className="snap-start shrink-0 w-[80vw] max-w-[300px]"
                >
                  <TestimonialCard story={story} index={index} featured={false} />
                </div>
              ))}
            </div>
            {/* Scroll hint dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {successStories.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-200 dark:bg-blue-800" />
              ))}
            </div>
          </div>

          {/* ── Desktop: original two-row grid (hidden on mobile) ── */}
          {/* First row — 3 cards */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-6">
            {successStories.slice(0, 3).map((story, index) => (
              <TestimonialCard
                key={story.name}
                story={story}
                index={index}
                featured={false}
              />
            ))}
          </div>

          {/* Second row — remaining cards */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {successStories.slice(3).map((story, index) => (
              <TestimonialCard
                key={story.name}
                story={story}
                index={index + 3}
                featured={false}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900/30 hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 group"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}