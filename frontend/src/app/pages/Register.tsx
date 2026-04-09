import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles } from "lucide-react";
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
    const fn = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  const calcPupil = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const rect = eyeRef.current.getBoundingClientRect();
    const dx = mouseX - (rect.left + rect.width / 2);
    const dy = mouseY - (rect.top + rect.height / 2);
    const dist = Math.min(Math.sqrt(dx*dx + dy*dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist };
  };
  const pos = calcPupil();
  return (
    <div ref={eyeRef} className="rounded-full flex items-center justify-center"
      style={{ width: size, height: isBlinking ? 2 : size, backgroundColor: eyeColor, overflow: "hidden", transition: "height 0.1s ease-out" }}>
      {!isBlinking && (
        <div className="rounded-full" style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor, transform: `translate(${pos.x}px,${pos.y}px)`, transition: "transform 0.1s ease-out" }} />
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
    const dx = mouseX - (rect.left + rect.width/2);
    const dy = mouseY - (rect.top + rect.height/2);
    const dist = Math.min(Math.sqrt(dx*dx+dy*dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist };
  };
  const pos = calcPos();
  return (
    <div ref={ref} className="rounded-full"
      style={{ width: size, height: size, backgroundColor: pupilColor, transform: `translate(${pos.x}px,${pos.y}px)`, transition: "transform 0.1s ease-out" }} />
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
    window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn);
  }, []);
  useEffect(() => {
    const s = () => { const t = setTimeout(() => { setIsPurpleBlinking(true); setTimeout(() => { setIsPurpleBlinking(false); s(); }, 150); }, Math.random()*4000+3000); return t; };
    const t = s(); return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const s = () => { const t = setTimeout(() => { setIsBlackBlinking(true); setTimeout(() => { setIsBlackBlinking(false); s(); }, 150); }, Math.random()*4000+3000); return t; };
    const t = s(); return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (isTyping) { setIsLookingAtEachOther(true); const t = setTimeout(() => setIsLookingAtEachOther(false), 800); return () => clearTimeout(t); }
    else setIsLookingAtEachOther(false);
  }, [isTyping]);
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const t = setTimeout(() => { setIsPurplePeeking(true); setTimeout(() => setIsPurplePeeking(false), 800); }, Math.random()*3000+2000);
      return () => clearTimeout(t);
    } else setIsPurplePeeking(false);
  }, [password, showPassword, isPurplePeeking]);

  const calcPos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dx = mouseX - (rect.left + rect.width/2);
    const dy = mouseY - (rect.top + rect.height/3);
    return { faceX: Math.max(-15,Math.min(15,dx/20)), faceY: Math.max(-10,Math.min(10,dy/30)), bodySkew: Math.max(-6,Math.min(6,-dx/120)) };
  };
  const pp = calcPos(purpleRef); const bp = calcPos(blackRef);
  const yp = calcPos(yellowRef); const op = calcPos(orangeRef);
  const hiding = password.length > 0 && !showPassword;
  const showing = password.length > 0 && showPassword;

  return (
    <div className="relative" style={{ width: 550, height: 400 }}>
      <div ref={purpleRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left:70, width:180, height: isTyping||hiding ? 440:400, backgroundColor:"#6C3FF5", borderRadius:"10px 10px 0 0", zIndex:1,
          transform: showing ? "skewX(0deg)" : isTyping||hiding ? `skewX(${(pp.bodySkew||0)-12}deg) translateX(40px)` : `skewX(${pp.bodySkew||0}deg)`,
          transformOrigin:"bottom center" }}>
        <div className="absolute flex gap-8 transition-all duration-700 ease-in-out"
          style={{ left: showing?20:isLookingAtEachOther?55:45+pp.faceX, top: showing?35:isLookingAtEachOther?65:40+pp.faceY }}>
          <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
            forceLookX={showing?(isPurplePeeking?4:-4):isLookingAtEachOther?3:undefined} forceLookY={showing?(isPurplePeeking?5:-4):isLookingAtEachOther?4:undefined} />
          <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
            forceLookX={showing?(isPurplePeeking?4:-4):isLookingAtEachOther?3:undefined} forceLookY={showing?(isPurplePeeking?5:-4):isLookingAtEachOther?4:undefined} />
        </div>
      </div>
      <div ref={blackRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left:240, width:120, height:310, backgroundColor:"#2D2D2D", borderRadius:"8px 8px 0 0", zIndex:2,
          transform: showing?"skewX(0deg)":isLookingAtEachOther?`skewX(${(bp.bodySkew||0)*1.5+10}deg) translateX(20px)`:isTyping||hiding?`skewX(${(bp.bodySkew||0)*1.5}deg)`:`skewX(${bp.bodySkew||0}deg)`,
          transformOrigin:"bottom center" }}>
        <div className="absolute flex gap-6 transition-all duration-700 ease-in-out"
          style={{ left: showing?10:isLookingAtEachOther?32:26+bp.faceX, top: showing?28:isLookingAtEachOther?12:32+bp.faceY }}>
          <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
            forceLookX={showing?-4:isLookingAtEachOther?0:undefined} forceLookY={showing?-4:isLookingAtEachOther?-4:undefined} />
          <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
            forceLookX={showing?-4:isLookingAtEachOther?0:undefined} forceLookY={showing?-4:isLookingAtEachOther?-4:undefined} />
        </div>
      </div>
      <div ref={orangeRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left:0, width:240, height:200, backgroundColor:"#FF9B6B", borderRadius:"120px 120px 0 0", zIndex:3,
          transform: showing?"skewX(0deg)":`skewX(${op.bodySkew||0}deg)`, transformOrigin:"bottom center" }}>
        <div className="absolute flex gap-8 transition-all duration-200 ease-out"
          style={{ left: showing?50:82+(op.faceX||0), top: showing?85:90+(op.faceY||0) }}>
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showing?-5:undefined} forceLookY={showing?-4:undefined} />
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showing?-5:undefined} forceLookY={showing?-4:undefined} />
        </div>
      </div>
      <div ref={yellowRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{ left:310, width:140, height:230, backgroundColor:"#E8D754", borderRadius:"70px 70px 0 0", zIndex:4,
          transform: showing?"skewX(0deg)":`skewX(${yp.bodySkew||0}deg)`, transformOrigin:"bottom center" }}>
        <div className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{ left: showing?20:52+(yp.faceX||0), top: showing?35:40+(yp.faceY||0) }}>
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showing?-5:undefined} forceLookY={showing?-4:undefined} />
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={showing?-5:undefined} forceLookY={showing?-4:undefined} />
        </div>
        <div className="absolute w-20 h-1 bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
          style={{ left: showing?10:40+(yp.faceX||0), top: showing?88:88+(yp.faceY||0) }} />
      </div>
    </div>
  );
}

export function Register() {
  const [formData, setFormData] = useState({ firstName:"", lastName:"", email:"", phone:"", password:"", confirmPassword:"", agreeToTerms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register/",
      {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
      }
    );

    console.log("Registration successful:", response.data);

    alert("Registration successful!");

    // redirect to login page
    window.location.href = "/login";

  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Try again.");
  }
};

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log("Google signup clicked");
    // API endpoint: GET /api/auth/google/
    window.location.href = "http://localhost:8000/api/auth/google/";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  /* ── shared input style ── */
  const inputBase = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white", caretColor: "white" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#3b82f6"; e.target.style.outline = "none"; };
  const onBlur  = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; };
  const inputCls = "w-full h-11 px-4 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200";

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>

      {/* ════ LEFT — character panel ════ */}
      <div
        className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden"
        style={{
  background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)"
}}
      >
        {/* Radial glow behind characters */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(108,63,245,0.18) 0%, transparent 70%)" }} />
        {/* Soft vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-2 text-lg font-bold">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span>TechElite</span>
        </div>

        {/* Characters — centred */}
        <div className="relative z-10 flex items-end justify-center" style={{ height: 500 }}>
          <CharacterPanel isTyping={isTyping} password={formData.password} showPassword={showPassword} />
        </div>

        {/* Footer links */}
        <div className="relative z-10 flex items-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      {/* ════ RIGHT — register form ════ */}
      <div
        className="flex items-center justify-center px-8 pt-32 pb-12 overflow-y-auto"
        style={{ background: "#121212" }}
      >
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
          className="w-full max-w-[480px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-bold text-white mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(255,255,255,0.08)" }}>
              <Sparkles className="w-4 h-4" />
            </div>
            <span>TechElite</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h1>
            <p className="text-sm" style={{ color:"rgba(255,255,255,0.45)" }}>Join TechElite and start your learning journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>
                  <User size={12} style={{ color:"#60a5fa" }} /> First Name
                </label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                  onFocus={(e) => { setIsTyping(true); onFocus(e); }} onBlur={(e) => { setIsTyping(false); onBlur(e); }}
                  placeholder="John" required className={inputCls} style={inputBase} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                  onFocus={onFocus} onBlur={onBlur}
                  placeholder="Doe" required className={inputCls} style={inputBase} />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>
                  <Mail size={12} style={{ color:"#60a5fa" }} /> Email
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  onFocus={(e) => { setIsTyping(true); onFocus(e); }} onBlur={(e) => { setIsTyping(false); onBlur(e); }}
                  placeholder="john@example.com" required className={inputCls} style={inputBase} />
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>
                  <Phone size={12} style={{ color:"#60a5fa" }} /> Phone
                </label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                  onFocus={onFocus} onBlur={onBlur}
                  placeholder="+1 (555) 123-4567" required className={inputCls} style={inputBase} />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>
                  <Lock size={12} style={{ color:"#60a5fa" }} /> Password
                </label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword?"text":"password"} value={formData.password} onChange={handleChange}
                    onFocus={onFocus} onBlur={onBlur}
                    placeholder="Min. 8 characters" required minLength={8} className={`${inputCls} pr-10`} style={inputBase} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color:"rgba(255,255,255,0.35)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>Confirm Password</label>
                <div className="relative">
                  <input id="confirmPassword" name="confirmPassword" type={showConfirm?"text":"password"} value={formData.confirmPassword} onChange={handleChange}
                    onFocus={onFocus} onBlur={onBlur}
                    placeholder="Re-enter password" required minLength={8} className={`${inputCls} pr-10`} style={inputBase} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color:"rgba(255,255,255,0.35)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}>
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}
                required className="w-4 h-4 mt-0.5 rounded accent-blue-500 flex-shrink-0" />
              <label htmlFor="agreeToTerms" className="text-xs leading-relaxed cursor-pointer select-none" style={{ color:"rgba(255,255,255,0.5)" }}>
                I agree to the{" "}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Terms and Conditions</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit — dark solid matching reference */}
            <motion.button type="submit" whileHover={{ scale:1.015, y:-1 }} whileTap={{ scale:0.985 }}
              className="w-full h-12 rounded-xl font-semibold text-white text-sm transition-all duration-200"
style={{
  background: "#ffffff",
  color: "#000",
  border: "1px solid rgba(0,0,0,0.1)"
}}              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1c1c1c"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#111111"; }}>
              Create Account
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop:"1px solid rgba(255,255,255,0.08)" }} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 text-xs font-semibold" style={{ background:"#121212", color:"rgba(255,255,255,0.35)" }}>Or sign up with</span>
            </div>
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogleSignup}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.7)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.12)"; }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign in link */}
          <div className="mt-6 text-center text-sm" style={{ color:"rgba(255,255,255,0.4)" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold hover:text-blue-300 transition-colors">Sign in</Link>
          </div>

          {/* API note */}
          <div className="mt-4 text-center text-[11px] space-y-0.5" style={{ color:"rgba(255,255,255,0.2)" }}>
            <p>Backend API: POST /api/auth/register/</p>
            <p>Expected response: {"{ \"token\": \"...\", \"user\": {...} }"}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}