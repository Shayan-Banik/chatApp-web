import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import {
  Camera,
  Mail,
  User,
  Shield,
  Calendar,
  Pencil,
  Check,
  Loader2,
} from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setSelectedImage(base64);
      await updateProfile({ profile: base64 });
    };
  };

  const createdAt = authUser?.createdAt;
  const joinDate = createdAt
    ? new Date(Date.parse(createdAt)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const avatar = selectedImage || authUser?.profile || "/avatar.png";
  const initials =
    authUser?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-dm h-screen bg-[#07060f] overflow-x-hidden">
        {/* Ambient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-20 -left-16 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.13)_0%,transparent_70%)] animate-[drift_14s_ease-in-out_infinite]" />
          <div className="absolute -bottom-16 -right-10 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(162,28,175,0.10)_0%,transparent_70%)] animate-[drift_18s_ease-in-out_infinite_4s_reverse]" />
        </div>

        {/* Grid texture */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.025] -z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 pb-20 overflow-y-auto">
          {/* Page heading */}
          <div className="text-center mb-10 animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/25 mb-3 font-medium">
              Your account
            </p>
            <h1 className="font-syne font-extrabold text-3xl text-white tracking-tight">
              Profile{" "}
              <span className="bg-[linear-gradient(90deg,#c4b5fd,#f0abfc,#818cf8,#e879f9,#c4b5fd)] bg-[length:300%_auto] bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]">
                Update
              </span>
            </h1>
          </div>

          {/* Avatar card */}
          <div className="animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_both] rounded-2xl border border-violet-700/20 bg-[#0c0b17]/80 backdrop-blur-xl p-8 mb-4 text-center relative overflow-hidden">
            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            {/* Avatar with animated ring */}
            <div className="relative inline-block mb-5">
              <div className="p-[3px] rounded-full bg-[linear-gradient(135deg,#7c3aed,#a21caf,#7c3aed)] bg-[length:200%_200%] animate-[shimmer_3s_linear_infinite]">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-[#1a1830] flex items-center justify-center">
                  {authUser?.profile || selectedImage ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-syne font-bold text-3xl text-violet-300">
                      {initials}
                    </span>
                  )}
                </div>
              </div>

              {/* Camera button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUpdatingProfile}
                className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center border-2 border-[#07060f] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                {isUpdatingProfile ? (
                  <Loader2 size={14} color="white" className="animate-spin" />
                ) : (
                  <Camera size={14} color="white" />
                )}
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Name & email */}
            <h2 className="font-syne font-bold text-xl text-white mb-1 tracking-tight">
              {authUser?.name || "User"}
            </h2>
            <p className="text-white/35 text-sm font-light mb-5">
              {authUser?.email}
            </p>

            {/* Active badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] text-emerald-400 font-medium">
                Active now
              </span>
            </div>

            {/* Upload hint */}
            <p className="text-white/20 text-[11px] font-light mt-4">
              {isUpdatingProfile
                ? "Uploading your photo..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Info cards */}
          <div className="animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] space-y-3 mb-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-medium px-1 mb-4">
              Account information
            </p>

            {/* Full name */}
            <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.07] transition-all duration-200 hover:bg-violet-600/[0.06] hover:border-violet-500/30">
              <div className="w-9 h-9 rounded-[10px] bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <User size={15} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-medium mb-0.5">
                  Full name
                </p>
                <p className="text-[14px] text-white/75 font-normal truncate">
                  {authUser?.name || "—"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.07] transition-all duration-200 hover:bg-violet-600/[0.06] hover:border-violet-500/30">
              <div className="w-9 h-9 rounded-[10px] bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <Mail size={15} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-medium mb-0.5">
                  Email address
                </p>
                <p className="text-[14px] text-white/75 font-normal truncate">
                  {authUser?.email || "—"}
                </p>
              </div>
            </div>

            {/* Member since */}
            <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.07] transition-all duration-200 hover:bg-violet-600/[0.06] hover:border-violet-500/30">
              <div className="w-9 h-9 rounded-[10px] bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <Calendar size={15} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-medium mb-0.5">
                  Member since
                </p>
                <p className="text-[14px] text-white/75 font-normal">
                  {joinDate}
                </p>
              </div>
            </div>
          </div>

          {/* Account status */}
          <div className="animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.4s_both] rounded-2xl border border-violet-700/20 bg-[#0c0b17]/80 backdrop-blur-xl p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-medium mb-4">
              Account status
            </p>

            <div className="space-y-3">
              {/* Verified row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Shield size={14} className="text-violet-400" />
                  <span className="text-[13px] text-white/50 font-light">
                    Account verified
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Check
                    size={10}
                    className="text-emerald-400"
                    strokeWidth={2.5}
                  />
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Verified
                  </span>
                </div>
              </div>

              <div className="h-px bg-white/[0.05]" />

              {/* Profile photo row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Pencil size={14} className="text-violet-400" />
                  <span className="text-[13px] text-white/50 font-light">
                    Profile photo
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${
                    authUser?.profilePic
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-white/[0.04] border-white/[0.08] text-white/25"
                  }`}>
                  {authUser?.profilePic ? (
                    <>
                      <Check size={10} strokeWidth={2.5} /> Uploaded
                    </>
                  ) : (
                    "Not set"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
