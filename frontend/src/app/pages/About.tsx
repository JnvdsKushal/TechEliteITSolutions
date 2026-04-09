import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, Eye, Rocket, Briefcase, Award, Users, TrendingUp, CheckCircle, BookOpen, Headphones, Infinity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function SkillBar({ label, percent }: { label: string; percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="mb-7">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-800 dark:text-slate-200 font-semibold text-sm tracking-wide" style={{ fontFamily: "'Exo 2', sans-serif" }}>{label}</span>
        <motion.span className="text-blue-600 dark:text-blue-400 font-bold text-sm tabular-nums"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
          {percent}%
        </motion.span>
      </div>
      <div className="relative h-3 bg-gray-200 dark:bg-[#2d3748] rounded-full overflow-hidden">
        <motion.div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ width: 0 }} animate={inView ? { width: `${percent}%` } : { width: 0 }} transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }} />
        <motion.div className="absolute top-0 h-full w-24 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)' }}
          initial={{ left: '-10%' }} animate={inView ? { left: '110%' } : { left: '-10%' }} transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }} />
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">

      {/* ── Hero ── */}
      <div className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> About TechElite
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Empowering Careers with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Expert IT Skills</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-slate-400 max-w-3xl mx-auto">Empowering individuals with cutting-edge IT skills for successful careers</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-xl mb-12 sm:mb-20" style={{ height: 'clamp(200px, 45vw, 480px)' }}>
            <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80&fit=crop" alt="Training" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
                className="text-white/90 text-base sm:text-lg md:text-2xl font-semibold max-w-2xl leading-snug" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Building the next generation of IT professionals — one expert at a time.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Our Story ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12 sm:mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1c2230] dark:to-[#1a2040] rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-100 dark:border-[#2d3748]">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>Founded with a vision to bridge the gap between academic learning and industry requirements, TechElite IT Solutions has been at the forefront of technical education since its inception.</p>
              <p>We understand the challenges faced by aspiring IT professionals in today's competitive market. Our comprehensive training programs are designed by industry experts who bring years of real-world experience to the classroom.</p>
              <p>With a focus on practical, hands-on learning and placement support, we've helped thousands of students launch successful careers in the IT industry.</p>
            </div>
          </div>
        </motion.div>

        {/* ── Mission & Vision ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {[
            { icon: Target, title: 'Our Mission', text: 'To provide world-class IT training that equips individuals with practical skills, industry knowledge, and the confidence to excel in their chosen tech careers. We aim to create job-ready professionals who can contribute meaningfully to the digital economy.' },
            { icon: Eye,    title: 'Our Vision',  text: 'To become the most trusted name in IT education and training, recognized globally for producing skilled professionals who drive innovation and technological advancement across industries.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-[#1c2230] border-2 border-gray-100 dark:border-[#2d3748] rounded-2xl p-6 sm:p-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                <item.icon className="text-blue-600 dark:text-blue-400" size={28} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{item.title}</h2>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Why Choose ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center">Why Choose TechElite?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              { icon: Award,       title: 'Industry-Recognized Certifications', description: 'Earn certificates that are valued by top companies worldwide.' },
              { icon: Users,       title: 'Expert Trainers',                    description: 'Learn from professionals with 10+ years of industry experience.' },
              { icon: TrendingUp,  title: '95% Placement Rate',                 description: 'Our dedicated placement team helps you land your dream job.' },
              { icon: CheckCircle, title: 'Hands-on Projects',                  description: 'Work on real-world projects to build a strong portfolio.' },
              { icon: Users,       title: 'Small Batch Size',                   description: 'Personalized attention with batches of 15-20 students.' },
              { icon: Briefcase,   title: 'Career Guidance & Mentorship',       description: 'Get 1-on-1 career guidance, resume reviews, and interview preparation support.' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1c2230] dark:to-[#1a2040] border border-blue-100 dark:border-[#2d3748] rounded-xl p-5 sm:p-6 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-shadow">
                <item.icon className="text-blue-600 dark:text-blue-400 mb-3 sm:mb-4" size={28} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Stats Banner ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-7 sm:p-12 text-white mb-12 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '5000+', label: 'Students Trained' },
              { number: '50+',   label: 'Expert Trainers'  },
              { number: '100+',  label: 'Hiring Partners'  },
              { number: '95%',   label: 'Placement Rate'   },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Who We Are ── */}
      <section className="py-14 sm:py-24 bg-gray-50 dark:bg-[#161b22] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#1c2230] text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 sm:mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> About Us
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-5 leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Who <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">We Are</span>
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-5">We are providing the best quality online courses. Our all instructors are highly expert.</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">We are a leading provider of comprehensive IT solutions, dedicated to empowering businesses with cutting-edge technology and exceptional service.</p>
              <div className="space-y-3">
                {['Expert-led live & recorded sessions', 'Real-world project-based curriculum', 'Dedicated placement support team', '24/7 mentor access & doubt resolution'].map((point, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-slate-300 text-sm font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-100 dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&fit=crop" alt="Team"
                  className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/95 dark:bg-[#1c2230]/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>5000+</div>
                      <div className="text-xs text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wide">Students Trained</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Best ── */}
      <section className="py-14 sm:py-24 bg-white dark:bg-[#0d1117] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Best Learning Platform
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Why We Are <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">The Best</span>
            </h2>
            <p className="text-gray-400 dark:text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Everything you need to accelerate your IT career — all in one place.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              { icon: BookOpen,   iconBg: 'bg-blue-100 dark:bg-blue-900/40',     iconColor: 'text-blue-600 dark:text-blue-400',   bar: 'from-blue-500 to-blue-600',     border: 'border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700',   title: 'High Quality Courses',   description: 'We offer a wide range of IT services designed to meet the diverse needs of modern businesses. Whether cybersecurity, DevOps, data engineering, or full stack development.' },
              { icon: Headphones, iconBg: 'bg-indigo-100 dark:bg-indigo-900/40', iconColor: 'text-indigo-600 dark:text-indigo-400', bar: 'from-indigo-500 to-indigo-600', border: 'border-indigo-100 dark:border-indigo-900 hover:border-indigo-300 dark:hover:border-indigo-700', title: 'Support & Maintenance', description: 'Our team consists of highly skilled professionals with extensive knowledge and experience in their respective fields, equipped to handle the most complex IT challenges.' },
              { icon: Rocket,     iconBg: 'bg-sky-100 dark:bg-sky-900/40',       iconColor: 'text-sky-600 dark:text-sky-400',     bar: 'from-sky-500 to-blue-500',     border: 'border-sky-100 dark:border-sky-900 hover:border-sky-300 dark:hover:border-sky-700',       title: 'Career Acceleration',   description: 'Boost your career with industry-ready skills, real-world experience, and guided learning paths designed for rapid growth.' },
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} whileHover={{ y: -6 }}
                  className={`group relative bg-white dark:bg-[#1c2230] border ${card.border} rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${card.iconBg} rounded-2xl mb-5 sm:mb-6`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>{card.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm sm:text-[0.92rem]">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-14 sm:py-24 bg-gray-50 dark:bg-[#161b22] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg, #1d4ed8, #1d4ed8 1px, transparent 1px, transparent 14px)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-100 dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&fit=crop" alt="Dashboard"
                  className="w-full h-[220px] sm:h-[320px] lg:h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-700/20" />
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 dark:bg-[#1c2230]/95 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-700 dark:text-slate-200 uppercase tracking-wider">100% Job Ready</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#1c2230] text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 sm:mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Our Expertise
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Skills</span>
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base mb-8 sm:mb-10">Industry-validated expertise across every modern IT domain.</p>
              <SkillBar label="Cyber Security" percent={100} />
              <SkillBar label="AWS DevOps"     percent={100} />
              <SkillBar label="Azure DevOps"   percent={100} />
              <SkillBar label="GCP DevOps"     percent={93}  />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Achievement Stats ── */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0d1117] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Our Achievements
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Numbers That <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Speak</span>
            </h2>
            <p className="text-gray-400 dark:text-slate-500 text-base sm:text-lg">Proven results that define our commitment to excellence</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Users,       number: '5000+', label: 'Students Trained', gradient: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-100 dark:shadow-blue-900/30'       },
              { icon: Award,       number: '50+',   label: 'Expert Trainers',  gradient: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-100 dark:shadow-indigo-900/30'   },
              { icon: TrendingUp,  number: '100+',  label: 'Hiring Partners',  gradient: 'from-sky-500 to-blue-500',      shadow: 'shadow-sky-100 dark:shadow-sky-900/30'         },
              { icon: CheckCircle, number: '95%',   label: 'Placement Rate',   gradient: 'from-emerald-500 to-teal-500',  shadow: 'shadow-emerald-100 dark:shadow-emerald-900/30' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.12 }} whileHover={{ y: -4 }}
                  className={`group relative bg-white dark:bg-[#1c2230] border border-gray-100 dark:border-[#2d3748] rounded-2xl p-4 sm:p-6 shadow-md ${stat.shadow} hover:shadow-xl transition-all duration-300 overflow-hidden text-center`}>
                  <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-blue-200 dark:border-blue-800 rounded-tl-2xl" />
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${stat.gradient} mb-3 sm:mb-4 shadow-sm`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{stat.number}</div>
                  <div className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wide">{stat.label}</div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-400 mb-6 sm:mb-8">Join thousands of successful professionals who started their careers with us</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/booking"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all text-center">
              Book Free Demo
            </Link>
            <Link to="/contact"
              className="bg-white dark:bg-[#1c2230] border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-center">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}