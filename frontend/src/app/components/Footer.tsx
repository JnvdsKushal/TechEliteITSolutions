// ── src/components/Footer.tsx ─────────────────────────────────────────────
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-[#080c12] border-t border-gray-800 dark:border-[#1a2035] text-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">

            {/* Logo */}
            <div className="mb-5">
              <img
                src={logo}
                alt="TechElite IT Solutions"
                className="h-16 w-auto object-contain object-left"
              />
            </div>

            <p className="text-gray-400 dark:text-slate-500 text-sm mb-2 font-medium">www.techeliteitsolutions.com</p>
            <p className="text-gray-400 dark:text-slate-400 mb-5 max-w-sm text-sm leading-relaxed">
              Empowering individuals with cutting-edge IT skills for successful careers. Industry-leading training with guaranteed placement support.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-gray-800 dark:bg-[#1c2230] border border-gray-700 dark:border-[#2d3748] rounded-xl flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-200">
                  <Icon size={16} className="text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white dark:text-slate-100 mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/services',           label: 'Services'        },
                { to: '/courses/online',     label: 'Online Courses'  },
                { to: '/courses/offline',    label: 'Offline Courses' },
                { to: '/courses/placements', label: 'Placements'      },
                { to: '/about',              label: 'About Us'        },
                { to: '/contact',            label: 'Contact'         },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm text-gray-400 dark:text-slate-500 hover:text-blue-400 dark:hover:text-blue-400 transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
  <h4 className="font-bold text-white dark:text-slate-100 mb-5 text-sm uppercase tracking-widest">
    Contact Us
  </h4>

  <div className="space-y-6">

    {/* 🔵 Madhapur Branch */}
    <div>
      <p className="text-blue-400 font-semibold text-sm mb-2">Madhapur Branch</p>
      <ul className="space-y-2 text-sm text-gray-400 dark:text-slate-500">

        <li className="flex items-start gap-2.5">
          <MapPin size={14} className="mt-0.5 text-blue-500" />
          <span>
            Plot no.231, 2nd floor, Road no.12,<br />
            Swamy Ayyappa Society, Madhapur,<br />
            Hyderabad - 500081
          </span>
        </li>

        <li className="flex items-center gap-2.5">
          <Mail size={14} className="text-blue-500" />
          <span>techeliteitsolutions@gmail.com</span>
        </li>

        <li className="flex items-center gap-2.5">
          <Phone size={14} className="text-blue-500" />
          <span>+91 9188494949 / +91 9133919666</span>
        </li>

      </ul>
    </div>

    {/* 🔵 KPHB Branch */}
    <div>
      <p className="text-blue-400 font-semibold text-sm mb-2">KPHB Branch</p>
      <ul className="space-y-2 text-sm text-gray-400 dark:text-slate-500">

        <li className="flex items-start gap-2.5">
          <MapPin size={14} className="mt-0.5 text-blue-500" />
          <span>
            Road No.2, Dhanalaxmi Center,<br />
            ICICI Bank Building, 3rd Floor,<br />
            KPHB Colony, Hyderabad - 500072
          </span>
        </li>

        <li className="flex items-center gap-2.5">
          <Mail size={14} className="text-blue-500" />
          <span>techeliteitsolutions.kphb@gmail.com</span>
        </li>

        <li className="flex items-center gap-2.5">
          <Phone size={14} className="text-blue-500" />
          <span>+91 9133966888 / +91 9133454949</span>
        </li>

      </ul>
    </div>

  </div>
</div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 dark:border-[#1a2035] pt-7">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-slate-600">
              © {currentYear} TechElite IT Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(label => (
                <a key={label} href="#"
                  className="text-gray-500 dark:text-slate-600 hover:text-blue-400 dark:hover:text-blue-400 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}