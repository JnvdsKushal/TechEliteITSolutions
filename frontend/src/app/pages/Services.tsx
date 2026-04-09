import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, ServerCog, Database, Lock, Brain,
  BarChart3, Code2, FlaskConical, Eye, ChevronRight,
  ArrowRight, CheckCircle, Clock, Users, Award,
  Headphones, Globe, TrendingUp, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LottieCarousel } from '../components/ui/LottieCarousel';

/* ─── Course data ─────────────────────────────────────────────────────────── */
const courses = [
  {
    icon: Shield,
    title: 'Cyber Security VAPT',
    badge: 'Zero Coding',
    description: 'Learn vulnerability assessment and penetration testing without any coding prerequisite.',
    features: ['Network scanning & enumeration', 'VAPT tools & frameworks', 'Web app security testing', 'Industry certification prep'],
    gradient: 'from-rose-500 to-orange-400',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    borderHover: 'hover:border-rose-200',
    shadow: 'hover:shadow-rose-100',
  },
  {
    icon: Database,
    title: 'Azure Data Engineering',
    badge: 'Cloud',
    description: 'Design and orchestrate enterprise-grade data pipelines on Microsoft Azure.',
    features: ['Azure Data Factory (ADF)', 'Synapse Analytics', 'Databricks & Spark', 'Data Lake architecture'],
    gradient: 'from-violet-500 to-purple-400',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    borderHover: 'hover:border-violet-200',
    shadow: 'hover:shadow-violet-100',
  },
  {
    icon: Lock,
    title: 'AI Security',
    badge: 'Emerging',
    description: 'Secure AI systems and understand adversarial threats in machine learning pipelines.',
    features: ['Adversarial ML attacks', 'Model security hardening', 'AI governance & compliance', 'Red-teaming AI systems'],
    gradient: 'from-amber-500 to-orange-400',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderHover: 'hover:border-amber-200',
    shadow: 'hover:shadow-amber-100',
  },
  {
    icon: ServerCog,
    title: 'DevOps (Multi Cloud)',
    badge: 'Trending',
    description: 'Master CI/CD pipelines, containers, and IaC across AWS, Azure, and GCP simultaneously.',
    features: ['Docker & Kubernetes', 'Terraform & Ansible', 'Multi-cloud strategy', 'GitHub Actions & Jenkins'],
    gradient: 'from-emerald-500 to-teal-400',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-200',
    shadow: 'hover:shadow-emerald-100',
  },
  {
    icon: Eye,
    title: 'Information Security',
    badge: 'GRC',
    description: 'End-to-end information security management covering risk, governance and compliance.',
    features: ['ISO 27001 & NIST', 'Risk management frameworks', 'Security policy design', 'Audit & compliance'],
    gradient: 'from-sky-500 to-blue-400',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderHover: 'hover:border-sky-200',
    shadow: 'hover:shadow-sky-100',
  },
  {
    icon: Brain,
    title: 'AI / ML with Python',
    badge: 'AI/ML',
    description: 'Build production-ready machine learning models and deep learning systems with Python.',
    features: ['Python for data science', 'Supervised & unsupervised ML', 'Neural networks & CNNs', 'MLOps & deployment'],
    gradient: 'from-cyan-500 to-sky-400',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderHover: 'hover:border-cyan-200',
    shadow: 'hover:shadow-cyan-100',
  },
  {
    icon: Code2,
    title: 'Java / Testing',
    badge: 'Full Stack',
    description: 'Master Java from core concepts to enterprise-level applications and automated testing.',
    features: ['Core Java & OOP', 'Spring Boot REST APIs', 'Selenium & TestNG', 'API & performance testing'],
    gradient: 'from-orange-500 to-amber-400',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    borderHover: 'hover:border-orange-200',
    shadow: 'hover:shadow-orange-100',
  },
  {
    icon: BarChart3,
    title: 'SOC (Security Ops)',
    badge: 'Blue Team',
    description: 'Operate a Security Operations Centre — detect, analyse and respond to cyber incidents.',
    features: ['SIEM tools & log analysis', 'Threat intelligence', 'Incident response playbooks', 'SOC analyst certification'],
    gradient: 'from-blue-600 to-indigo-500',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderHover: 'hover:border-blue-200',
    shadow: 'hover:shadow-blue-100',
  },
  {
    icon: FlaskConical,
    title: 'SAP Security + GRC',
    badge: 'Enterprise',
    description: 'Master SAP access control, authorisation concepts and GRC risk frameworks.',
    features: ['SAP role design', 'GRC Access Control', 'Risk & compliance frameworks', 'Audit & SoD analysis'],
    gradient: 'from-indigo-500 to-violet-500',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-200',
    shadow: 'hover:shadow-indigo-100',
  },
];

/* ─── Services page ───────────────────────────────────────────────────────── */
export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Full-width with carousel centred + supporting copy
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Soft corner blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Two-column: text LEFT · carousel RIGHT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* LEFT — headline + description + bullets + trust stats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white/80 text-blue-600 text-sm font-semibold mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Our Training Programs
              </div>

              <h1
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Transform Your Career with{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                  Expert-Led IT Training
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-7">
                Our industry-aligned training programs are designed to help students gain real-world expertise. From cybersecurity and cloud engineering to AI and DevOps, our programs focus on practical learning, hands-on labs, and career placement support.
              </p>

              {/* Highlight bullets */}
              <div className="space-y-3 mb-10">
                {[
                  { icon: Award,      text: 'Industry Expert Trainers'         },
                  { icon: Zap,        text: 'Hands-on Lab Practice'             },
                  { icon: TrendingUp, text: 'Placement & Interview Support'     },
                ].map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <BIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{b.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Trust stats row */}
              <div className="flex flex-wrap gap-6 md:gap-10">
                {[
                  { icon: Users, value: '5,000+', label: 'Students Trained'  },
                  { icon: Award, value: '95%',    label: 'Placement Rate'    },
                  { icon: Globe, value: '100+',   label: 'Hiring Partners'   },
                  { icon: Clock, value: '6 Yrs',  label: 'Industry Presence' },
                ].map((t, i) => {
                  const TIcon = t.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <TIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-black text-gray-900 leading-none" style={{ fontFamily: "'Exo 2', sans-serif" }}>{t.value}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{t.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT — Lottie carousel in a styled container */}
           {/* RIGHT — Lottie carousel blended with background */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex justify-center items-center scale-110"
              
            >
              <div className="w-full max-w-lg">
                <LottieCarousel />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          WHO WE ARE — IT solutions website copy
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="flex flex-col lg:flex-row gap-14 items-center">

  {/* LEFT IMAGE */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="flex-1 w-full"
  >
    <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-100">
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&fit=crop"
        alt="IT professionals in training"
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />

      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-bold text-gray-800">
            Live batches enrolling now
          </span>
        </div>
      </div>
    </div>
  </motion.div>


  {/* RIGHT TEXT */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.15 }}
    className="flex-1"
  >
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      Who We Are
    </div>

    <h2
      className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight"
      style={{ fontFamily: "'Exo 2', sans-serif" }}
    >
      A Trusted Partner for{' '}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
        IT Excellence
      </span>
    </h2>

    <p className="text-gray-500 text-base leading-relaxed mb-5">
      TechElite is a leading IT training and solutions provider dedicated to equipping individuals and enterprises with the skills that the modern technology industry demands. We bridge the gap between academic knowledge and real-world application.
    </p>

    <p className="text-gray-500 text-base leading-relaxed mb-8">
      Our instructors are active practitioners — not just teachers — bringing live project experience directly into every classroom session. Every curriculum is reviewed quarterly against industry hiring standards to ensure what you learn is always in demand.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        'Industry-verified curriculum',
        'Live project experience',
        'Dedicated placement cell',
        'Post-course lifetime support',
        'Small batch, personal attention',
        'Recognised certifications',
      ].map((pt, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="text-sm text-gray-700 font-medium">{pt}</span>
        </div>
      ))}
    </div>
  </motion.div>

</div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          WHY CHOOSE US — IT solutions boilerplate done well
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, #1d4ed8, #1d4ed8 1px, transparent 1px, transparent 14px)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Why Thousands Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                TechElite
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We don't just teach technology — we prepare you for the industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap,        title: 'Job-Ready in Weeks',        desc: 'Structured fast-track programs that get you interview-ready without wasting months.', color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: Headphones, title: '24/7 Mentor Support',        desc: 'Our mentors are available round the clock — no question goes unanswered.', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: TrendingUp, title: 'Placement Guarantee',        desc: 'Dedicated placement drive with 100+ hiring partners actively recruiting our graduates.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Globe,      title: 'Global Certifications',      desc: 'Earn vendor-recognised certifications from Microsoft, AWS, Google, EC-Council and more.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base" style={{ fontFamily: "'Exo 2', sans-serif" }}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS — standard IT solutions process section
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Your Path to a{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Tech Career
              </span>
            </h2>
            <p className="text-gray-500 text-lg">From enrolment to employment — a clear roadmap.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 z-0" />

            {[
              { step: '01', title: 'Book Free Demo',  desc: 'Attend a no-obligation demo class and meet your trainer before committing.', color: 'bg-blue-600',   ring: 'ring-blue-200'   },
              { step: '02', title: 'Enrol & Start',   desc: 'Join a live batch, get your study materials and begin hands-on training from day one.', color: 'bg-indigo-600', ring: 'ring-indigo-200' },
              { step: '03', title: 'Build & Certify', desc: 'Complete real projects, earn certifications and build a portfolio that speaks for itself.', color: 'bg-violet-600', ring: 'ring-violet-200' },
              { step: '04', title: 'Get Placed',      desc: 'Our placement cell connects you with 100+ hiring partners actively seeking our graduates.', color: 'bg-purple-600', ring: 'ring-purple-200'  },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                className="relative z-10 text-center cursor-default"
              >
                {/* Icon circle with pulse ring on hover */}
                <div className="relative inline-block mb-5">
                  {/* Pulse ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl ${step.color} opacity-20`}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.08, 0.2] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  />
                  <div className={`relative w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center shadow-lg ring-4 ${step.ring} ring-opacity-30`}>
                    <span className="text-white text-xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>{step.step}</span>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white"
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative z-10">
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-4"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-xl mx-auto">
                Join thousands of students who have transformed their careers with our training
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking"        className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm">Book Free Demo</Link>
                <Link to="/courses/online" className="bg-transparent border-2 border-white/70 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">View All Courses</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}