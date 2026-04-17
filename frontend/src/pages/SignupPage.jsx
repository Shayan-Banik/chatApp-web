import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  ArrowRight,
  Check,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = {
    1: "text-red-500",
    2: "text-orange-400",
    3: "text-yellow-400",
    4: "text-emerald-400",
  };
  const strengthBarColor = {
    1: "bg-red-500",
    2: "bg-orange-400",
    3: "bg-yellow-400",
    4: "bg-emerald-400",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    const ok = await signup(form);
    if (ok) navigate("/login");
  };

  const strength = passwordStrength();

  const inputBorderClass = (field) =>
    `flex items-center gap-3 px-4 py-[13px] rounded-[14px] border transition-all duration-300 ${
      focused === field
        ? "border-violet-500/55 bg-violet-600/[0.06] shadow-[0_0_0_3px_rgba(124,58,237,0.08)] animate-[borderGlow_2s_ease-in-out_infinite]"
        : "border-white/[0.08] bg-white/[0.03] hover:border-violet-600/30 hover:bg-violet-600/[0.04]"
    }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;1,300&family=Syne:wght@400;600;700;800&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(14px) rotate(-2deg); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(124,58,237,0.4); box-shadow: 0 0 0 0 rgba(124,58,237,0); }
          50% { border-color: rgba(167,139,250,0.7); box-shadow: 0 0 16px 2px rgba(124,58,237,0.2); }
        }
        @keyframes tickPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0,0); }
          33% { transform: translate(20px,-14px); }
          66% { transform: translate(-14px,10px); }
        }

        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }

        .float-card { animation: floatY 7s ease-in-out infinite; }
        .float-card-2 { animation: floatY2 9s ease-in-out infinite 1s; }

        .shimmer-text {
          background: linear-gradient(90deg, #c4b5fd, #f0abfc, #818cf8, #e879f9, #c4b5fd);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .benefit-row { animation: fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }

        .glow-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(124,58,237,0.18);
          animation: rotateSlow 20s linear infinite;
        }
        .glow-ring-2 { animation: rotateSlow 30s linear infinite reverse; }

        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: drift 14s ease-in-out infinite;
        }

        .form-section { animation: scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

        .logo-pulse { position: relative; }
        .logo-pulse::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          background: linear-gradient(135deg, #7c3aed, #a21caf);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
          filter: blur(8px);
        }
        .logo-pulse:hover::before { opacity: 0.5; }

        .submit-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a21caf 100%);
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(124,58,237,0.45);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .submit-btn:hover:not(:disabled)::after { opacity: 1; }

        .checkbox-custom .tick { animation: tickPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .avatar-stack > div { border: 2px solid #07060f; }

        .strength-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.4s ease, background 0.4s ease;
        }
      `}</style>

      <div className="font-dm min-h-screen flex bg-[#07060f] overflow-hidden">
        {/* ── LEFT: Decorative Panel ── */}
        <div className="panel-left grid-bg hidden lg:flex w-[45%] flex-col justify-center items-center px-12 py-[60px] relative overflow-hidden bg-[#07060f]">
          {/* Ambient orbs */}
          <div
            className="orb w-80 h-80 -top-16 -left-20"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
            }}
          />
          <div
            className="orb w-60 h-60 -bottom-10 -right-10"
            style={{
              background:
                "radial-gradient(circle, rgba(162,28,175,0.12) 0%, transparent 70%)",
              animationDelay: "5s",
              animationDirection: "reverse",
            }}
          />

          {/* Rotating rings */}
          <div className="glow-ring" style={{ width: 420, height: 420 }} />
          <div
            className="glow-ring glow-ring-2"
            style={{ width: 560, height: 560 }}
          />
          <div
            className="glow-ring"
            style={{ width: 280, height: 280, animationDuration: "15s" }}
          />

          {/* Center content */}
          <div className="relative z-10 w-full max-w-[340px]">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div
                className="logo-pulse w-10 h-10 rounded-[13px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a21caf)",
                }}>
                <MessageSquare size={18} color="white" />
              </div>
              <span className="font-syne font-bold text-lg text-white tracking-[-0.3px]">
                Luminary
              </span>
            </div>

            {/* Headline */}
            <div className="mb-10">
              <p className="text-[11px] tracking-[0.22em] uppercase text-white/25 mb-[14px] font-medium">
                Join thousands of teams
              </p>
              <h1 className="font-syne font-extrabold text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.1] text-white">
                Build something
                <br />
                <span className="shimmer-text">extraordinary.</span>
              </h1>
              <p className="mt-4 text-sm text-white/30 font-light leading-[1.7]">
                Everything your team needs to ideate, collaborate, and ship — in
                one place.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-[14px] mb-11">
              {[
                { text: "Free forever on the Starter plan", delay: "0.1s" },
                { text: "No credit card required", delay: "0.2s" },
                { text: "Set up in under 2 minutes", delay: "0.3s" },
                { text: "Cancel or upgrade anytime", delay: "0.4s" },
              ].map(({ text, delay }) => (
                <div
                  key={text}
                  className="benefit-row flex items-center gap-[10px]"
                  style={{ animationDelay: delay }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-violet-600/20 border border-violet-600/35">
                    <Check
                      size={10}
                      color="rgba(167,139,250,0.9)"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-[13px] text-white/45 font-light">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="avatar-stack flex">
                {["#7c3aed", "#a21caf", "#6d28d9", "#9333ea"].map((bg, i) => (
                  <div
                    key={i}
                    style={{ background: bg, marginLeft: i === 0 ? 0 : -8 }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] text-white font-semibold">
                    {["A", "B", "C", "+"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-[2px] mb-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-[10px]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-white/25">
                  Loved by <span className="text-violet-300/80">2.4M+</span>{" "}
                  users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Signup Form ── */}
        <div className="lg:w-[55%] w-full flex flex-col justify-center items-center px-12 py-[60px] relative bg-[#0c0b17]">
          {/* Subtle glow */}
          <div
            className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)",
            }}
          />

          <div className="form-section w-full max-w-[420px]">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-9">
              {["Account", "Profile", "Done"].map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-[6px]">
                    <div
                      className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-semibold ${
                        i === 0
                          ? "text-white"
                          : "text-white/20 bg-white/[0.06] border border-white/[0.08]"
                      }`}
                      style={
                        i === 0
                          ? {
                              background:
                                "linear-gradient(135deg, #7c3aed, #a21caf)",
                            }
                          : {}
                      }>
                      {i + 1}
                    </div>
                    <span
                      className={`text-[11px] ${i === 0 ? "font-medium text-violet-300/90" : "font-normal text-white/20"}`}>
                      {s}
                    </span>
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-white/[0.06]" />}
                </React.Fragment>
              ))}
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="font-syne font-bold text-[26px] text-white tracking-[-0.4px] mb-[6px]">
                Create your account
              </h2>
              <p className="text-[13px] text-white/28 font-light">
                Already have one?{" "}
                <Link
                  to="/login"
                  className="text-violet-300/85 bg-transparent border-none cursor-pointer text-[13px] p-0">
                  Sign in instead
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[14px]">
                {/* Name */}
                <div>
                  <label className="block text-[11px] text-white/35 mb-[7px] tracking-[0.08em] uppercase font-medium">
                    Full name
                  </label>
                  <div className={inputBorderClass("name")}>
                    <User
                      size={15}
                      color={
                        focused === "name"
                          ? "rgba(167,139,250,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }
                      className="flex-shrink-0 transition-colors duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Jane Appleseed"
                      value={form.name}
                      onChange={update("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className="flex-1 bg-transparent border-none outline-none text-white text-sm font-light tracking-[0.01em] font-dm placeholder:text-white/20"
                    />
                    {form.name.length > 1 && (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <Check size={9} color="#10b981" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] text-white/35 mb-[7px] tracking-[0.08em] uppercase font-medium">
                    Email address
                  </label>
                  <div className={inputBorderClass("email")}>
                    <Mail
                      size={15}
                      color={
                        focused === "email"
                          ? "rgba(167,139,250,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }
                      className="flex-shrink-0 transition-colors duration-300"
                    />
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={update("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="flex-1 bg-transparent border-none outline-none text-white text-sm font-light tracking-[0.01em] font-dm placeholder:text-white/20"
                    />
                    {form.email.includes("@") && form.email.includes(".") && (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <Check size={9} color="#10b981" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] text-white/35 mb-[7px] tracking-[0.08em] uppercase font-medium">
                    Password
                  </label>
                  <div className={inputBorderClass("password")}>
                    <Lock
                      size={15}
                      color={
                        focused === "password"
                          ? "rgba(167,139,250,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }
                      className="flex-shrink-0 transition-colors duration-300"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={update("password")}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      className={`flex-1 bg-transparent border-none outline-none text-white text-sm font-light font-dm placeholder:text-white/20 ${showPassword ? "tracking-[0.01em]" : "tracking-[0.15em]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="bg-transparent border-none cursor-pointer text-white/20 p-0 flex hover:text-violet-300/70 transition-colors duration-200">
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Strength bars */}
                  {form.password && (
                    <div className="mt-[10px]">
                      <div className="flex gap-1 mb-[5px]">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden flex-1">
                            <div
                              className={`h-full rounded-full transition-all duration-[400ms] ${strength >= i ? strengthBarColor[strength] : ""}`}
                              style={{ width: strength >= i ? "100%" : "0%" }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-white/20 font-light">
                          Password strength
                        </span>
                        <span
                          className={`text-[11px] font-medium ${strengthColor[strength] || ""}`}>
                          {strengthLabel[strength]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-[10px] mt-1">
                  <div
                    className={`checkbox-custom w-[18px] h-[18px] rounded-[6px] border cursor-pointer flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-[1px] ${
                      agreed
                        ? "border-transparent"
                        : "border-white/15 bg-white/[0.03]"
                    }`}
                    style={
                      agreed
                        ? {
                            background:
                              "linear-gradient(135deg, #7c3aed, #a21caf)",
                          }
                        : {}
                    }
                    onClick={() => setAgreed(!agreed)}>
                    {agreed && (
                      <Check
                        size={10}
                        color="white"
                        strokeWidth={2.5}
                        className="tick"
                      />
                    )}
                  </div>
                  <p className="text-xs text-white/28 leading-[1.6] font-light">
                    I agree to Luminary's{" "}
                    <button
                      type="button"
                      className="text-violet-300/80 bg-transparent border-none cursor-pointer text-xs p-0">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-violet-300/80 bg-transparent border-none cursor-pointer text-xs p-0">
                      Privacy Policy
                    </button>
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSigningUp || !agreed}
                  className={`submit-btn mt-2 w-full py-[15px] px-6 rounded-[14px] text-white text-sm font-medium font-dm flex items-center justify-center gap-2 tracking-[0.02em] border-none ${
                    isSigningUp || !agreed
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}>
                  {isSigningUp ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Create free account
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer note */}
            <p className="text-center text-[11px] text-white/15 mt-6 leading-[1.6] font-light">
              Protected by reCAPTCHA ·{" "}
              <span className="text-violet-300/50">Privacy</span> ·{" "}
              <span className="text-violet-300/50">Terms</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
