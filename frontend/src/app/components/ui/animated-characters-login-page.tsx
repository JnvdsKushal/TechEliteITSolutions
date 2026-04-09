/**
 * AnimatedAuthPanel
 * ─────────────────
 * The left-side animated illustration panel used on Login & Register pages.
 * Shows floating tech icons, orbiting particles, and brand messaging.
 *
 * Usage:
 *   <AnimatedAuthPanel mode="login" />
 *   <AnimatedAuthPanel mode="register" />
 */

import { motion } from "motion/react";
import {
  Code2, Database, Globe, Layers, Cpu, Zap,
  BookOpen, Award, Users, TrendingUp,
} from "lucide-react";

/* ── floating icon card ─────────────────────────────────────────────────── */
function FloatingIcon({
  icon: Icon,
  x, y,
  delay,
  size = "md",
  color,
}: {
  icon: React.ElementType;
  x: string; y: string;
  delay: number;
  size?: "sm" | "md" | "lg";
  color: string;
}) {
  const sz = size === "lg" ? "w-14 h-14" : size === "md" ? "w-11 h-11" : "w-8 h-8";
  const ic = size === "lg" ? 22 : size === "md" ? 18 : 14;

  return (
    <motion.div
      className={`absolute ${sz} rounded-2xl flex items-center justify-center shadow-lg`}
      style={{ left: x, top: y, background: color, backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1, scale: 1, y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y:       { duration: 3 + delay * 0.5, delay: delay + 0.5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Icon size={ic} className="text-white drop-shadow" />
    </motion.div>
  );
}

/* ── orbiting dot ────────────────────────────────────────────────────────── */
function OrbitDot({ radius, duration, delay, color }: {
  radius: number; duration: number; delay: number; color: string;
}) {
  return (
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full"
      style={{
        background: color,
        top: "50%", left: "50%",
        marginTop: -5, marginLeft: -5,
        boxShadow: `0 0 8px ${color}`,
      }}
      animate={{
        x: [
          radius, radius * 0.7, 0, -radius * 0.7, -radius,
          -radius * 0.7, 0, radius * 0.7, radius,
        ],
        y: [
          0, -radius * 0.7, -radius, -radius * 0.7, 0,
          radius * 0.7, radius, radius * 0.7, 0,
        ],
      }}
      transition={{
        duration, delay, repeat: Infinity, ease: "linear",
      }}
    />
  );
}

/* ── stat badge ──────────────────────────────────────────────────────────── */
function StatBadge({ value, label, delay, x, y }: {
  value: string; label: string; delay: number; x: string; y: string;
}) {
  return (
    <motion.div
      className="absolute flex items-center gap-2 px-3 py-2 rounded-xl"
      style={{
        left: x, top: y,
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-white font-black text-base leading-none">{value}</div>
      <div className="text-blue-100 text-[10px] font-semibold leading-tight">{label}</div>
    </motion.div>
  );
}

/* ── main component ──────────────────────────────────────────────────────── */
export function AnimatedAuthPanel({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full overflow-hidden select-none"
      style={{
        background: "linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 35%, #2563eb 60%, #3b82f6 80%, #60a5fa 100%)",
      }}
    >
      {/* Mesh noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 40% 40%, rgba(96,165,250,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating tech icons */}
      <FloatingIcon icon={Code2}    x="8%"  y="12%" delay={0.1} size="lg" color="rgba(255,255,255,0.18)" />
      <FloatingIcon icon={Database} x="75%" y="8%"  delay={0.3} size="md" color="rgba(255,255,255,0.15)" />
      <FloatingIcon icon={Globe}    x="82%" y="68%" delay={0.5} size="md" color="rgba(255,255,255,0.15)" />
      <FloatingIcon icon={Layers}   x="4%"  y="72%" delay={0.4} size="sm" color="rgba(255,255,255,0.12)" />
      <FloatingIcon icon={Cpu}      x="70%" y="82%" delay={0.6} size="sm" color="rgba(255,255,255,0.12)" />
      <FloatingIcon icon={Zap}      x="14%" y="88%" delay={0.7} size="sm" color="rgba(255,255,255,0.12)" />
      <FloatingIcon icon={BookOpen} x="85%" y="30%" delay={0.2} size="sm" color="rgba(255,255,255,0.12)" />
      <FloatingIcon icon={Award}    x="3%"  y="42%" delay={0.8} size="sm" color="rgba(255,255,255,0.12)" />

      {/* Central orbit ring */}
      <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {/* Orbit circle outline */}
        <motion.div
          className="absolute rounded-full border border-white/10"
          style={{ width: 220, height: 220, top: -110, left: -110 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full border border-white/[0.06]"
          style={{ width: 310, height: 310, top: -155, left: -155 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting dots */}
        <OrbitDot radius={110} duration={8}  delay={0}   color="#93c5fd" />
        <OrbitDot radius={110} duration={8}  delay={4}   color="#bfdbfe" />
        <OrbitDot radius={155} duration={14} delay={2}   color="#60a5fa" />
        <OrbitDot radius={155} duration={14} delay={9}   color="#dbeafe" />
      </div>

      {/* Central character / avatar */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Avatar bubble */}
        <motion.div
          className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
            border: "2px solid rgba(255,255,255,0.3)",
            boxShadow: "0 0 60px rgba(96,165,250,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner glow circle */}
          <div
            className="absolute inset-2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
          />
          {/* Icon */}
          <div className="relative z-10">
            {isLogin ? (
              /* Graduation cap style for login */
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26" cy="20" r="10" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="26" cy="38" rx="16" ry="8" fill="rgba(255,255,255,0.7)" />
                <path d="M10 20 L26 12 L42 20 L26 28 Z" fill="white" />
                <rect x="38" y="20" width="2" height="8" rx="1" fill="white" opacity="0.8" />
                <circle cx="39" cy="29" r="2" fill="white" opacity="0.8" />
              </svg>
            ) : (
              /* Person with plus for register */
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="18" r="9" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="22" cy="38" rx="14" ry="8" fill="rgba(255,255,255,0.7)" />
                <circle cx="40" cy="30" r="10" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <path d="M40 25 L40 35 M35 30 L45 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </motion.div>

        {/* Brand + tagline */}
        <motion.div
          className="text-center px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-2">TechElite</div>
          <h2 className="text-white text-2xl font-extrabold leading-tight mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            {isLogin ? "Welcome back,\nlearner!" : "Start your\nlearning journey"}
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed max-w-[220px] mx-auto">
            {isLogin
              ? "Sign in to continue your courses, track progress, and access placement support."
              : "Create your account and join 5,000+ students building real-world tech careers."}
          </p>
        </motion.div>
      </motion.div>

      {/* Stat badges */}
      <StatBadge value="5000+"  label="Students"       delay={0.9}  x="4%"  y="22%" />
      <StatBadge value="95%"    label="Placement Rate" delay={1.0}  x="62%" y="50%" />
      <StatBadge value="Free"   label="Demo Class"     delay={1.1}  x="8%"  y="60%" />

      {/* Bottom dots decoration */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}