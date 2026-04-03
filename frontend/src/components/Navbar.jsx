import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { LogOut, User, MessageSquare } from "lucide-react";

const Navbar = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm  { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <nav className="font-dm sticky top-0 z-50 w-full bg-[#07060f]/85 backdrop-blur-xl border-b border-violet-700/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 h-[58px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center shrink-0">
              <MessageSquare size={16} color="white" />
            </div>
            <span className="font-syne font-extrabold text-[17px] text-white tracking-tight">
              Luminary
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            {authUser ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white/[0.03] border border-white/[0.07] mr-1">
                  <div className="relative">
                    {authUser?.profile ? (
                      <img
                        src={authUser.profile}
                        alt="profile"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center text-[11px] font-semibold text-white shrink-0">
                        {authUser?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="absolute -bottom-px -right-px w-[7px] h-[7px] rounded-full bg-emerald-400 border-[1.5px] border-[#07060f]" />
                  </div>
                  <span className="text-[13px] text-white/50 font-normal max-w-[90px] truncate">
                    {authUser?.name?.split(" ")[0] || "User"}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3.5 py-[7px] rounded-[10px] text-[13px] text-white/45 border border-transparent hover:text-white/90 hover:bg-violet-600/10 hover:border-violet-500/25 transition-all duration-200 no-underline">
                  <User size={14} />
                  Profile
                </Link>

                <Link
                  to="/ai"
                  className="flex items-center gap-1.5 px-3.5 py-[7px] rounded-[10px] text-[13px] text-white/45 border border-transparent hover:text-white/90 hover:bg-violet-600/10 hover:border-violet-500/25 transition-all duration-200 no-underline">
                  <MessageSquare size={14} />
                  Ai 
                </Link>

                <button
                  onClick={() => setShowModal(true)}
                  className="font-dm flex items-center gap-1.5 px-3.5 py-[7px] rounded-[10px] text-[13px] text-red-400/70 bg-red-500/10 border border-red-500/15 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 cursor-pointer">
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowModal(false)}>
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0c1a] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="font-syne text-xl font-bold text-white">
              Confirm Logout
            </h3>

            <p className="mt-2 text-sm text-white/60">
              Are you sure you want to logout from your account?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-sm text-white/70 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm text-white bg-red-500/80 border border-red-400/20 hover:bg-red-500 transition-all duration-200 cursor-pointer">
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
