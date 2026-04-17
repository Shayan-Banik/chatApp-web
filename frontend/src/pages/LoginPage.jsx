import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  rightElement,
}) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-4 gap-3 focus-within:border-violet-400/60 transition-all duration-300">
      {Icon && (
        <Icon
          size={18}
          className="text-white/30 group-focus-within:text-violet-400 transition-colors duration-300 shrink-0"
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent text-white placeholder-white/25 text-sm outline-none font-light tracking-wide"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      {rightElement}
    </div>
  </div>
);

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoggingIn) return;

    const userData = { email, password };

    const ok = await login(userData);

    if (ok) {
      navigate("/");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;300;400;500&family=Syne:wght@400;600;700;800&display=swap');

        html, body {
          overflow: hidden;
          height: 100%;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes gridScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(80px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(1.1); opacity: 0; }
        }

        .orb-1 { animation: drift 12s ease-in-out infinite; }
        .orb-2 { animation: drift 16s ease-in-out infinite reverse; }
        .orb-3 { animation: drift 20s ease-in-out infinite 4s; }

        .grid-scroll { animation: gridScroll 4s linear infinite; }

        .fade-up-1 { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
        .fade-up-5 { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        .fade-up-6 { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }

        .shimmer-text {
          background: linear-gradient(90deg, #c4b5fd, #f0abfc, #818cf8, #c4b5fd);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .submit-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed, #a21caf);
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.4);
        }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s;
        }
        .submit-btn:hover::before { left: 100%; }

        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-ring 2s ease-out infinite;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
        }

        .social-btn {
          transition: all 0.25s ease;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        .right-panel-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .right-panel-item:hover {
          background: rgba(255,255,255,0.08);
          transform: translateX(4px);
        }
      `}</style>

      <div
        className="min-h-screen w-full flex overflow-hidden"
        style={{ background: "#07060f", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Ambient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="orb-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="orb-2 absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(162,28,175,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="orb-3 absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Scrolling grid background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04]">
          <div
            className="grid-scroll"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              width: "100%",
              height: "calc(100% + 80px)",
            }}
          />
        </div>

        {/* ─── Left Panel — Login Form ─── */}
        <div className="relative z-10 w-full lg:w-[48%] flex flex-col justify-center px-8 sm:px-16 xl:px-24 py-10 pb-16">
          {/* Logo */}
          <div className={`fade-up-1 flex items-center gap-3 mb-16`}>
            <div className="relative">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a21caf)",
                }}>
                <MessageSquare size={17} className="text-white" />
              </div>
              <div
                className="pulse-dot absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
                style={{ borderColor: "#07060f" }}
              />
            </div>
            <span
              className="text-white font-semibold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "17px" }}>
              Luminary
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <p
              className={`fade-up-2 text-xs uppercase tracking-[0.25em] text-white/30 mb-4 font-medium`}>
              Welcome back
            </p>
            <h1
              className={`fade-up-3`}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
              }}>
              <span className="text-white">Sign in to your </span>
              <span className="shimmer-text">workspace.</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="fade-up-3">
              <InputField
                icon={Mail}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="fade-up-4">
              <InputField
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/25 hover:text-violet-400 transition-colors duration-200">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </div>

            <div className="fade-up-4 flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  className="relative w-4 h-4 rounded-md border border-white/15 group-hover:border-violet-400/50 transition-colors flex items-center justify-center"
                  style={{ background: "rgba(124, 58, 237, 0)" }}>
                  <input
                    type="checkbox"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-xs text-white/35 group-hover:text-white/50 transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-xs text-violet-400/80 hover:text-violet-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <div className="fade-up-5 pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                style={{
                  opacity: isLoggingIn ? 0.5 : 1,
                  cursor: isLoggingIn ? "not-allowed" : "pointer",
                }}
                className="submit-btn w-full py-4 rounded-2xl text-white text-sm font-medium flex items-center justify-center gap-2.5 tracking-wide">
                {isLoggingIn ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to workspace</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="fade-up-5 flex items-center gap-4 my-8">
            <div className="divider-line" />
            <span className="text-xs text-white/20 shrink-0 tracking-widest uppercase">
              or
            </span>
            <div className="divider-line" />
          </div>

          {/* Social login
          <div className="fade-up-6 grid grid-cols-2 gap-3">
            {[
              { name: "Google", icon: "G", color: "#EA4335" },
              { name: "GitHub", icon: "⌥", color: "#fff" },
            ].map(({ name, icon, color }) => (
              <button
                key={name}
                className="social-btn rounded-2xl py-3.5 flex items-center justify-center gap-2.5">
                <span
                  style={{
                    color,
                    fontWeight: 700,
                    fontSize: "15px",
                    fontFamily: "serif",
                  }}>
                  {icon}
                </span>
                <span className="text-white/50 text-xs font-medium">
                  {name}
                </span>
              </button>
            ))}
          </div> */}

          {/* Footer */}
          <p className="fade-up-6 text-center text-xs text-white/20 mt-10">
            No account yet?{" "}
            <Link
              to="/signup"
              className="text-violet-400/80 hover:text-violet-300 transition-colors font-medium">
              Create one free
            </Link>
          </p>
        </div>

        {/* ─── Right Panel — AuthImage Pattern ─── */}
        <div className="hidden lg:flex relative w-[52%] flex-col justify-center items-center py-10 pb-16">
          {/* Right panel glass card */}
          <div
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}>
            {/* Header strip */}
            <div
              className="px-8 pt-8 pb-6 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-violet-400" />
                <span className="text-xs text-white/30 uppercase tracking-widest font-medium">
                  What's inside
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: "white",
                  lineHeight: 1.2,
                }}>
                Your entire workflow,
                <br />
                <span style={{ color: "rgba(167, 139, 250, 0.9)" }}>
                  unified.
                </span>
              </h2>
            </div>

            {/* Feature list */}
            <div className="p-6 space-y-3">
              {[
                {
                  label: "Real-time collaboration",
                  sub: "Work with your team simultaneously",
                  icon: "◈",
                },
                {
                  label: "AI-powered suggestions",
                  sub: "Smart completions as you type",
                  icon: "◉",
                },
                {
                  label: "End-to-end encryption",
                  sub: "Your data stays private always",
                  icon: "◆",
                },
                {
                  label: "Unlimited integrations",
                  sub: "Connect 200+ tools seamlessly",
                  icon: "◇",
                },
              ].map(({ label, sub, icon }) => (
                <div
                  key={label}
                  className="right-panel-item rounded-2xl px-5 py-4 flex items-center gap-4">
                  <span
                    style={{
                      color: "rgba(167,139,250,0.7)",
                      fontSize: "18px",
                      lineHeight: 1,
                    }}>
                    {icon}
                  </span>
                  <div>
                    <p className="text-white/80 text-sm font-medium leading-tight">
                      {label}
                    </p>
                    <p className="text-white/25 text-xs mt-0.5 font-light">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="px-6 pb-8 grid grid-cols-3 gap-3">
              {[
                { val: "2.4M+", label: "Users" },
                { val: "99.9%", label: "Uptime" },
                { val: "< 50ms", label: "Latency" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="rounded-2xl text-center py-4"
                  style={{
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "1px solid rgba(124, 58, 237, 0.2)",
                  }}>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#c4b5fd",
                    }}>
                    {val}
                  </p>
                  <p className="text-xs text-white/25 mt-0.5 font-light">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
