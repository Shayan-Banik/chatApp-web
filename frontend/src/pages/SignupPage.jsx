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
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#10b981"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSigningUp) return;

    const ok = await signup(form);

    if (ok) {
      navigate("/login");
    }
  };

  const strength = passwordStrength();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;1,300&family=Syne:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          overflow: hidden;
          height: 100%;
        }

        @media (max-width: 1024px) {
        .left-panel-hide { display: none !important; }
        .right-panel-full { width: 100% !important; }
        }

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
        @keyframes revealBar {
          from { width: 0; }
          to { width: 100%; }
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

        .float-card { animation: floatY 7s ease-in-out infinite; }
        .float-card-2 { animation: floatY2 9s ease-in-out infinite 1s; }
        .float-card-3 { animation: floatY2 6s ease-in-out infinite 2s; }

        .shimmer-text {
          background: linear-gradient(90deg, #c4b5fd, #f0abfc, #818cf8, #e879f9, #c4b5fd);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .panel-left {
          background: #07060f;
          position: relative;
          overflow: hidden;
        }

        .step-label {
          animation: fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .input-wrap {
          position: relative;
          transition: all 0.3s ease;
        }
        .input-wrap.is-focused .input-border {
          animation: borderGlow 2s ease-in-out infinite;
        }
        .input-border {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          transition: all 0.3s ease;
        }
        .input-border:hover {
          border-color: rgba(124,58,237,0.3);
          background: rgba(124,58,237,0.04);
        }
        .input-border.focused {
          border-color: rgba(124,58,237,0.55);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
        }

        .submit-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a21caf 100%);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(124,58,237,0.45);
        }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .submit-btn:hover::after { opacity: 1; }

        .strength-bar-track {
          height: 3px;
          border-radius: 99px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
          flex: 1;
        }
        .strength-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .benefit-row {
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .tick-circle {
          width: 20px; height: 20px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: rgba(124,58,237,0.2);
          border: 1px solid rgba(124,58,237,0.35);
        }

        .glow-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(124,58,237,0.18);
          animation: rotateSlow 20s linear infinite;
        }
        .glow-ring-2 {
          animation: rotateSlow 30s linear infinite reverse;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: drift 14s ease-in-out infinite;
        }

        .right-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          backdrop-filter: blur(16px);
        }

        .form-section {
          animation: scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }

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

        .checkbox-custom {
          width: 18px; height: 18px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .checkbox-custom.checked {
          background: linear-gradient(135deg, #7c3aed, #a21caf);
          border-color: transparent;
        }
        .checkbox-custom .tick { animation: tickPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .avatar-stack > div { border: 2px solid #07060f; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          fontFamily: "'DM Sans', sans-serif",
          background: "#07060f",
        }}>
        {/* ── LEFT: Decorative Panel ── */}
        <div
          className="panel-left grid-bg  left-panel-hide"
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 48px",
            position: "relative",
          }}>
          {/* Ambient orbs */}
          <div
            className="orb"
            style={{
              width: 320,
              height: 320,
              top: "-60px",
              left: "-80px",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
            }}
          />
          <div
            className="orb"
            style={{
              width: 240,
              height: 240,
              bottom: "-40px",
              right: "-40px",
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
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: 340,
            }}>
            {/* Logo mark */}
            <div
              style={{
                marginBottom: 48,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
              <div
                className="logo-pulse"
                style={{
                  position: "relative",
                  width: 40,
                  height: 40,
                  borderRadius: 13,
                  background: "linear-gradient(135deg, #7c3aed, #a21caf)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <MessageSquare size={18} color="white" />
              </div>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "white",
                  letterSpacing: "-0.3px",
                }}>
                Luminary
              </span>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 40 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: 14,
                  fontWeight: 500,
                }}>
                Join thousands of teams
              </p>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  lineHeight: 1.1,
                  color: "white",
                }}>
                Build something
                <br />
                <span className="shimmer-text">extraordinary.</span>
              </h1>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.3)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}>
                Everything your team needs to ideate, collaborate, and ship — in
                one place.
              </p>
            </div>

            {/* Benefits */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 44,
              }}>
              {[
                { text: "Free forever on the Starter plan", delay: "0.1s" },
                { text: "No credit card required", delay: "0.2s" },
                { text: "Set up in under 2 minutes", delay: "0.3s" },
                { text: "Cancel or upgrade anytime", delay: "0.4s" },
              ].map(({ text, delay }) => (
                <div
                  key={text}
                  className="benefit-row"
                  style={{ animationDelay: delay }}>
                  <div className="tick-circle">
                    <Check
                      size={10}
                      color="rgba(167,139,250,0.9)"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 300,
                    }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="avatar-stack" style={{ display: "flex" }}>
                {["#7c3aed", "#a21caf", "#6d28d9", "#9333ea"].map((bg, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: bg,
                      marginLeft: i === 0 ? 0 : -8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: "white",
                      fontWeight: 600,
                    }}>
                    {["A", "B", "C", "+"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 1, marginBottom: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: 10 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  Loved by{" "}
                  <span style={{ color: "rgba(167,139,250,0.8)" }}>2.4M+</span>{" "}
                  users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Signup Form ── */}
        <div
          className="right-panel-full"
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 48px",
            position: "relative",
            background: "#0c0b17",
          }}>
          {/* Subtle top-right glow */}
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="form-section"
            style={{ width: "100%", maxWidth: 420 }}>
            {/* Step indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 36,
              }}>
              {["Account", "Profile", "Done"].map((s, i) => (
                <React.Fragment key={s}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background:
                          i === 0
                            ? "linear-gradient(135deg, #7c3aed, #a21caf)"
                            : "rgba(255,255,255,0.06)",
                        border:
                          i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 600,
                        color: i === 0 ? "white" : "rgba(255,255,255,0.2)",
                      }}>
                      {i + 1}
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: i === 0 ? 500 : 400,
                        color:
                          i === 0
                            ? "rgba(167,139,250,0.9)"
                            : "rgba(255,255,255,0.2)",
                      }}>
                      {s}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "rgba(255,255,255,0.06)",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Heading */}
            <div style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  color: "white",
                  letterSpacing: "-0.4px",
                  marginBottom: 6,
                }}>
                Create your account
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.28)",
                  fontWeight: 300,
                }}>
                Already have one?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "rgba(167,139,250,0.85)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    padding: 0,
                  }}>
                  Sign in instead
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: 7,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}>
                    Full name
                  </label>
                  <div
                    className={`input-border ${focused === "name" ? "focused" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 16px",
                    }}>
                    <User
                      size={15}
                      color={
                        focused === "name"
                          ? "rgba(167,139,250,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }
                      style={{ flexShrink: 0, transition: "color 0.3s" }}
                    />
                    <input
                      type="text"
                      placeholder="Jane Appleseed"
                      value={form.name}
                      onChange={update("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        outline: "none",
                        color: "white",
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        letterSpacing: "0.01em",
                      }}
                    />
                    {form.name.length > 1 && (
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "rgba(16,185,129,0.2)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Check size={9} color="#10b981" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: 7,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}>
                    Email address
                  </label>
                  <div
                    className={`input-border ${focused === "email" ? "focused" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 16px",
                    }}>
                    <Mail
                      size={15}
                      color={
                        focused === "email"
                          ? "rgba(167,139,250,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }
                      style={{ flexShrink: 0, transition: "color 0.3s" }}
                    />
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={update("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        outline: "none",
                        color: "white",
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        letterSpacing: "0.01em",
                      }}
                    />
                    {form.email.includes("@") && form.email.includes(".") && (
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "rgba(16,185,129,0.2)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Check size={9} color="#10b981" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: 7,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}>
                    Password
                  </label>
                  <div
                    className={`input-border ${focused === "password" ? "focused" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 16px",
                    }}>
                    <Lock
                      size={15}
                      color={
                        focused === "password"
                          ? "rgba(167,139,250,0.8)"
                          : "rgba(255,255,255,0.2)"
                      }
                      style={{ flexShrink: 0, transition: "color 0.3s" }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={update("password")}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        outline: "none",
                        color: "white",
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        letterSpacing: showPassword ? "0.01em" : "0.15em",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.2)",
                        padding: 0,
                        display: "flex",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(167,139,250,0.7)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
                      }>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Strength bars */}
                  {form.password && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="strength-bar-track">
                            <div
                              className="strength-bar-fill"
                              style={{
                                width: strength >= i ? "100%" : "0%",
                                background: strengthColor[strength],
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                        <span
                          style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.2)",
                            fontWeight: 300,
                          }}>
                          Password strength
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: strengthColor[strength],
                            fontWeight: 500,
                          }}>
                          {strengthLabel[strength]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms checkbox */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    marginTop: 4,
                  }}>
                  <div
                    className={`checkbox-custom ${agreed ? "checked" : ""}`}
                    onClick={() => setAgreed(!agreed)}
                    style={{ marginTop: 1 }}>
                    {agreed && (
                      <Check
                        size={10}
                        color="white"
                        strokeWidth={2.5}
                        className="tick"
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.28)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}>
                    I agree to Luminary's{" "}
                    <button
                      type="button"
                      style={{
                        color: "rgba(167,139,250,0.8)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 12,
                        padding: 0,
                      }}>
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      style={{
                        color: "rgba(167,139,250,0.8)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 12,
                        padding: 0,
                      }}>
                      Privacy Policy
                    </button>
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSigningUp || !agreed}
                  className="submit-btn"
                  style={{
                    marginTop: 8,
                    width: "100%",
                    padding: "15px 24px",
                    borderRadius: 14,
                    color: "white",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: isSigningUp || !agreed ? 0.5 : 1,
                    cursor: isSigningUp || !agreed ? "not-allowed" : "pointer",
                    letterSpacing: "0.02em",
                  }}>
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

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                margin: "24px 0",
              }}>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>
                or continue with
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              />
            </div>

            {/* Social buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
              }}>
              {[
                { name: "Google", letter: "G", color: "#EA4335" },
                { name: "GitHub", letter: "◆", color: "rgba(255,255,255,0.7)" },
                { name: "Slack", letter: "S", color: "#E01E5A" },
              ].map(({ name, letter, color }) => (
                <button
                  key={name}
                  type="button"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "11px 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.08)";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}>
                  <span
                    style={{
                      color,
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "serif",
                      lineHeight: 1,
                    }}>
                    {letter}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.25)",
                      fontWeight: 400,
                    }}>
                    {name}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer note */}
            <p
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "rgba(255,255,255,0.15)",
                marginTop: 24,
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
              Protected by reCAPTCHA ·{" "}
              <span style={{ color: "rgba(167,139,250,0.5)" }}>Privacy</span> ·{" "}
              <span style={{ color: "rgba(167,139,250,0.5)" }}>Terms</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
