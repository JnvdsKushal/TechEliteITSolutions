// ── Placements.tsx ─────────────────────────────────────────────────────────
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Briefcase, TrendingUp, Users, Award,
  CheckCircle, Building, ArrowRight, Star, Zap, Target,
} from 'lucide-react';
import { NetworkBackground } from '../components/NetworkBackground';

/* ── Static data (unchanged) ─────────────────────────────────────────────── */
const placementStats = [
  { icon: Users,      number: '1000-1200',  label: 'Students Placed' },
  { icon: Building,   number: '120+',   label: 'Hiring Partners' },
  { icon: TrendingUp, number: '95%',    label: 'Placement Rate'  },
  { icon: Award,      number: '₹8 LPA', label: 'Average Package' },
];

const hiringPartners = [
  // Existing IT giants
  'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Tech Mahindra',
  'HCL', 'IBM', 'Amazon', 'Microsoft', 'Google', 'Oracle',
  'Capgemini', 'LTI', 'Mindtree', 'Mphasis', 'Hexaware', 'Persistent',

  // Cybersecurity companies 🔐
  'Palo Alto Networks',
  'CrowdStrike',
  'Fortinet',
  'Trend Micro',
  'Cisco',
  'Okta',
  'Zscaler',
  'SentinelOne',
  'Check Point Software',
  'FireEye',
  'Sophos',
  'Rapid7'
];

const placementProcess = [
  { step: '1', title: 'Resume Building',      description: 'Professional resume creation highlighting your skills and projects'           },
  { step: '2', title: 'Mock Interviews',       description: 'Practice sessions with industry experts to boost confidence'                  },
  { step: '3', title: 'Interview Preparation', description: 'Technical and HR interview training with common questions'                    },
  { step: '4', title: 'Hiring Partner Connect', description: 'Get connected with 100+ hiring partner companies based on your profile' },
  { step: '5', title: 'Interview Scheduling',  description: 'We schedule interviews with companies matching your profile'                  },
  { step: '6', title: 'Onboarding Assistance', description: 'Get support during your transition into the new role with guidance on expectations and workflow' }                          
];

const successStories = [
  {
    name: 'Rajesh Kumar', course: 'Python Full Stack', company: 'Amazon', package: '₹12 LPA',
    testimonial: 'The placement support was excellent. Got placed in my dream company within 2 months of course completion.',
  },
  {
    name: 'Priya Sharma', course: 'Data Science', company: 'Microsoft', package: '₹15 LPA',
    testimonial: 'TechElite not only taught me technical skills but also prepared me for interviews. Forever grateful!',
  },
  {
    name: 'Amit Patel', course: 'MERN Stack', company: 'Infosys', package: '₹8 LPA',
    testimonial: 'From zero coding knowledge to getting placed in Infosys. The journey was amazing with TechElite.',
  },
];

const whatWeOffer = [
  'Placement assistance',
  '100% job guarantee programs',
  'Interview preparation workshops',
  'Resume and LinkedIn profile building',
  'Soft skills training',
  'Mock interview sessions',
  'Exclusive hiring partner access',
  'Salary negotiation guidance',
];

/* ── Stat Card ───────────────────────────────────────────────────────────── */
function StatCard({ stat, index }: { stat: typeof placementStats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white border border-blue-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
      style={{ boxShadow: '0 2px 16px rgba(37,99,235,0.06)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-200 rounded-tl-2xl" />
      <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
        <stat.icon className="text-blue-600" size={26} />
      </div>
      <div className="text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>{stat.number}</div>
      <div className="text-gray-400 font-semibold text-sm uppercase tracking-wider">{stat.label}</div>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export function Placements() {
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
            95% Placement Rate · 100+ Hiring Partners
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-gray-900 mb-5 leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Placement{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">Assistance</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Your success is our success. Comprehensive placement support to help you land your dream IT job.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-[3]" />
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> By The Numbers
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Our{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Track Record</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {placementStats.map((stat, index) => <StatCard key={index} stat={stat} index={index} />)}
          </div>
        </div>
      </section>

      {/* ── Placement Process ── light NetworkBackground section ─────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-50" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/25 rounded-full blur-3xl"
            animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white/80 text-blue-600 text-sm font-semibold mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Step by Step
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Our Placement{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementProcess.map((item, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -4 }}
                className="group bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                style={{ boxShadow: '0 2px 12px rgba(37,99,235,0.05)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-md shadow-blue-100">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "'Exo 2', sans-serif" }}>{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Success Stories ───────────────────────────────────────────────── */}
      {/* <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Student Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Success{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Stories</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }} whileHover={{ y: -5 }}
                className="group bg-white border border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                style={{ boxShadow: '0 2px 16px rgba(37,99,235,0.05)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-md shadow-blue-100">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>{story.name}</h3>
                    <p className="text-blue-600 text-sm font-semibold">{story.course}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Building className="text-gray-400" size={14} />
                    <span className="font-semibold text-gray-800 text-sm">{story.company}</span>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-sm font-bold">{story.package}</div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed italic">"{story.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Hiring Partners ── light NetworkBackground ────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-50" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white/80 text-blue-600 text-sm font-semibold mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Our Network
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Hiring{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Partners</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hiringPartners.map((company, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }} whileHover={{ y: -4, scale: 1.04 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-5 flex items-center justify-center font-bold text-gray-700 text-sm border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:text-blue-700 transition-all duration-300"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Offer ─────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              What We{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Offer</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatWeOffer.map((offer, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ x: 4 }}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                style={{ boxShadow: '0 1px 8px rgba(37,99,235,0.04)' }}
              >
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                  <CheckCircle className="text-blue-600 group-hover:text-white transition-colors duration-300" size={16} />
                </div>
                <span className="text-gray-700 font-semibold text-sm">{offer}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── solid blue + NetworkBackground ─────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700" />
        <NetworkBackground />
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)' }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative z-[3] max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <Briefcase className="text-white" size={38} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Ready to Launch Your Career?
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our training programs and get guaranteed placement assistance from day one
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Enroll Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white px-10 py-4 rounded-xl text-lg font-bold backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                <Target className="w-5 h-5" /> Talk to Counselor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}