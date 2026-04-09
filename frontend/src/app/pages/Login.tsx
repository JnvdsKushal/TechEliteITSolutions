import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import axios from "axios";

interface EyeBallProps {
  size?: number; pupilSize?: number; maxDistance?: number;
  eyeColor?: string; pupilColor?: string; isBlinking?: boolean;
  forceLookX?: number; forceLookY?: number;
}
function EyeBall({ size=48, pupilSize=16, maxDistance=10, eyeColor="white", pupilColor="black", isBlinking=false, forceLookX, forceLookY }: EyeBallProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const eyeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const calcPupil = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const rect = eyeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouseX - cx; const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };
  const pos = calcPupil();
  return (
    <div ref={eyeRef} className="rounded-full flex items-center justify-center"
      style={{ width: size, height: isBlinking ? 2 : size, backgroundColor: eyeColor, overflow: "hidden", transition: "height 0.1s ease-out" }}>
      {!isBlinking && (
        <div className="rounded-full" style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor, transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.1s ease-out" }} />
      )}
    </div>
  );
}

interface PupilProps { size?: number; maxDistance?: number; pupilColor?: string; forceLookX?: number; forceLookY?: number; }
function Pupil({ size=12, maxDistance=5, pupilColor="black", forceLookX, forceLookY }: PupilProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  const calcPos = () => {
    if (!ref.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const rect = ref.current.getBoundingClientRect();
    const dx = mouseX - (rect.left + rect.width / 2);
    const dy = mouseY - (rect.top + rect.height / 2);
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };
  const pos = calcPos();
  return (
    <div ref={ref} className="rounded-full"
      style={{ width: size, height: size, backgroundColor: pupilColor, transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.1s ease-out" }} />
  );
}

function CharacterPanel({ isTyping, password, showPassword }: { isTyping: boolean; password: string; showPassword: boolean; }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => { setIsPurpleBlinking(true); setTimeout(() => { setIsPurpleBlinking(false); schedule(); }, 150); }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule(); return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => { setIsBlackBlinking(true); setTimeout(() => { setIsBlackBlinking(false); schedule(); }, 150); }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule(); return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (isTyping) { setIsLookingAtEachOther(true); const t = setTimeout(() => setIsLookingAtEachOther(false), 800); return () => clearTimeout(t); }
    else setIsLookingAtEachOther(false);
  }, [isTyping]);
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const t = setTimeout(() => { setIsPurplePeeking(true); setTimeout(() => setIsPurplePeeking(false), 800); }, Math.random() * 3000 + 2000);
      return () => clearTimeout(t);
    } else setIsPurplePeeking(false);
  }, [password, showPassword, isPurplePeeking]);

  const calcPos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 3;
    const dx = mouseX - cx; const dy = mouseY - cy;
    return { faceX: Math.max(-15, Math.min(15, dx / 20)), faceY: Math.max(-10, Math.min(10, dy / 30)), bodySkew: Math.max(-6, Math.min(6, -dx / 120)) };
  };

  const purplePos = calcPos(purpleRef);
  const blackPos = calcPos(blackRef);
  const yellowPos = calcPos(yellowRef);
  const orangePos = calcPos(orangeRef);
  const hidingPassword = password.length > 0 && !showPassword;
  const showingPassword = password.length > 0 && showPassword;

  return (
    <div className="relative" style={{ width: 550, height: 400 }}>
      <div ref={purpleRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left: 70, width: 180, height: isTyping || hidingPassword ? 440 : 400, backgroundColor: "#6C3FF5", borderRadius: "10px 10px 0 0", zIndex: 1,
          transform: showingPassword ? "skewX(0deg)" : isTyping || hidingPassword ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` : `skewX(${purplePos.bodySkew || 0}deg)`,
          transformOrigin: "bottom center" }}>
        <div className="absolute flex gap-8 transition-all duration-700 ease-in-out"
          style={{ left: showingPassword ? 20 : isLookingAtEachOther ? 55 : 45 + purplePos.faceX, top: showingPassword ? 35 : isLookingAtEachOther ? 65 : 40 + purplePos.faceY }}>
          <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
            forceLookX={showingPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
            forceLookY={showingPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
          <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
            forceLookX={showingPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
            forceLookY={showingPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
        </div>
      </div>
      <div ref={blackRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left: 240, width: 120, height: 310, backgroundColor: "#2D2D2D", borderRadius: "8px 8px 0 0", zIndex: 2,
          transform: showingPassword ? "skewX(0deg)" : isLookingAtEachOther ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)` : isTyping || hidingPassword ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` : `skewX(${blackPos.bodySkew || 0}deg)`,
          transformOrigin: "bottom center" }}>
        <div className="absolute flex gap-6 transition-all duration-700 ease-in-out"
          style={{ left: showingPassword ? 10 : isLookingAtEachOther ? 32 : 26 + blackPos.faceX, top: showingPassword ? 28 : isLookingAtEachOther ? 12 : 32 + blackPos.faceY }}>
          <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
            forceLookX={showingPassword ? -4 : isLookingAtEachOther ? 0 : undefined} forceLookY={showingPassword ? -4 : isLookingAtEachOther ? -4 : undefined} />
          <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
            forceLookX={showingPassword ? -4 : isLookingAtEachOther ? 0 : undefined} forceLookY={showingPassword ? -4 : isLookingAtEachOther ? -4 : undefined} />
        </div>
      </div>
      <div ref={orangeRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left: 0, width: 240, height: 200, backgroundColor: "#FF9B6B", borderRadius: "120px 120px 0 0", zIndex: 3,
          transform: showingPassword ? "skewX(0deg)" : `skewX(${orangePos.bodySkew || 0}deg)`, transformOrigin: "bottom center" }}>
        <div className="absolute flex gap-8 transition-all duration-200 ease-out"
          style={{ left: showingPassword ? 50 : 82 + (orangePos.faceX || 0), top: showingPassword ? 85 : 90 + (orangePos.faceY || 0) }}>
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
        </div>
      </div>
      <div ref={yellowRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left: 310, width: 140, height: 230, backgroundColor: "#E8D754", borderRadius: "70px 70px 0 0", zIndex: 4,
          transform: showingPassword ? "skewX(0deg)" : `skewX(${yellowPos.bodySkew || 0}deg)`, transformOrigin: "bottom center" }}>
        <div className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{ left: showingPassword ? 20 : 52 + (yellowPos.faceX || 0), top: showingPassword ? 35 : 40 + (yellowPos.faceY || 0) }}>
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
        </div>
        <div className="absolute w-20 h-1 bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
          style={{ left: showingPassword ? 10 : 40 + (yellowPos.faceX || 0), top: showingPassword ? 88 : 88 + (yellowPos.faceY || 0) }} />
      </div>
    </div>
  );
}

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // ── FIX 1: Correct endpoint — was /api/login/, now /api/auth/login/ ──
      const response = await axios.post("/api/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Save token and user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ── Admin check ──────────────────────────────────────────────────────
      const isAdmin =
        user?.is_staff === true ||
        user?.is_admin === true ||
        user?.role === "admin" ||
        response.data.is_staff === true ||
        response.data.is_admin === true;

      // ── FIX 2: Redirect to /profile for regular users (was going to /) ──
      if (isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/profile";
      }

    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.non_field_errors?.[0] ||
        "Invalid email or password";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#3b82f6"; e.target.style.outline = "none"; };
  const onBlurInput  = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>

      {/* ════ LEFT — character panel ════ */}
      <div
        className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(108,63,245,0.18) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

        <div className="relative z-10 flex items-center gap-2 text-lg font-bold">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span>TechElite</span>
        </div>

        <div className="relative z-10 flex items-end justify-center" style={{ height: 500 }}>
          <CharacterPanel isTyping={isTyping} password={formData.password} showPassword={showPassword} />
        </div>
      </div>

      {/* ════ RIGHT — login form ════ */}
      <div
        className="flex items-center justify-center px-8 pt-24 pb-12"
        style={{ background: "#121212" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-bold text-white mb-12">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <Sparkles className="w-4 h-4" />
            </div>
            <span>TechElite</span>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-white mt-10 mb-2">Welcome back!</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Please enter your details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                <Mail size={14} style={{ color: "#60a5fa" }} />
                Email Address
              </label>
              <input id="email" type="email" name="email"
                value={formData.email} onChange={handleChange}
                onFocus={(e) => { setIsTyping(true); onFocusInput(e); }}
                onBlur={(e) => { setIsTyping(false); onBlurInput(e); }}
                placeholder="john@example.com" required autoComplete="off"
                className="w-full h-12 px-4 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ ...inputStyle, color: "white", caretColor: "white" }}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                <Lock size={14} style={{ color: "#60a5fa" }} />
                Password
              </label>
              <div className="relative">
                <input id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password} onChange={handleChange}
                  onFocus={onFocusInput} onBlur={onBlurInput}
                  placeholder="••••••••" required
                  className="w-full h-12 pl-4 pr-12 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={{ ...inputStyle, color: "white", caretColor: "white" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange}
                  className="w-4 h-4 rounded accent-blue-500" />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 rounded-xl"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <motion.button type="submit" disabled={isLoading}
              whileHover={{ scale: 1.015, y: -1 }} whileTap={{ scale: 0.985 }}
              className="w-full h-12 rounded-xl font-semibold text-white text-sm transition-all duration-200"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.12)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1c1c1c"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#111111"; }}
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 text-xs font-semibold" style={{ background: "#121212", color: "rgba(255,255,255,0.35)" }}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogleLogin}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign up link */}
          <div className="mt-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Don't have an account?{" "}
            <Link to="/register" className="text-white font-semibold hover:text-blue-300 transition-colors">Sign up</Link>
          </div>

          {/* API note */}
          <div className="mt-5 text-center text-[11px] space-y-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
            <p>Backend API: POST /api/auth/login/</p>
            <p>Admin redirect: /admin &nbsp;|&nbsp; User redirect: /profile</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}