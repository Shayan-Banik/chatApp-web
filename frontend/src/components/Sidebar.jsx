import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectUser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) => user.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 99px; }
      `}</style>

      <aside className="font-dm h-full w-20 lg:w-72 flex flex-col border-r border-violet-700/15 bg-[#09081a]/60 transition-all duration-300 shrink-0">

        {/* ── Header ── */}
        <div className="px-4 pt-5 pb-4 border-b border-violet-700/15">

          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center shrink-0">
              <Users size={14} color="white" />
            </div>
            <span className="font-syne font-bold text-white text-[15px] hidden lg:block tracking-tight">
              Contacts
            </span>

            {/* Online count badge */}
            <span className="hidden lg:flex ml-auto items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              {onlineUsers.length} online
            </span>
          </div>

          {/* Search — large screen only */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] focus-within:border-violet-500/40 focus-within:bg-violet-500/5 transition-all duration-200 mb-3">
            <Search size={13} className="text-white/25 shrink-0" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-[13px] text-white placeholder-white/20 font-light w-full"
            />
          </div>

          {/* Online only toggle — large screen */}
          <label className="hidden lg:flex items-center gap-2 cursor-pointer group">
            <div
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              className={`relative w-8 h-[18px] rounded-full transition-all duration-300 cursor-pointer ${
                showOnlineOnly
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                  : "bg-white/10 border border-white/10"
              }`}
            >
              <div className={`absolute top-[3px] w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                showOnlineOnly ? "left-[17px] shadow-[0_0_6px_rgba(124,58,237,0.6)]" : "left-[3px]"
              }`} />
            </div>
            <span className="text-[12px] text-white/35 group-hover:text-white/55 transition-colors font-light">
              Online only
            </span>
          </label>
        </div>

        {/* ── User List ── */}
        <div className="flex-1 overflow-y-auto sidebar-scroll px-2 py-3 space-y-1">

          {isUserLoading ? (
            /* Skeleton loaders */
            [...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-pulse">
                <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                <div className="hidden lg:flex flex-col gap-1.5 flex-1">
                  <div className="h-2.5 w-24 rounded bg-white/5" />
                  <div className="h-2 w-14 rounded bg-white/[0.03]" />
                </div>
              </div>
            ))
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <Users size={20} className="text-white/10" />
              <p className="text-[12px] text-white/20 font-light">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = selectedUser?._id === user._id;
              const isOnline = onlineUsers.includes(user._id);

              return (
                <button
                  key={user._id}
                  onClick={() => setSelectUser(user)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left group ${
                    isSelected
                      ? "bg-violet-600/15 border border-violet-500/25"
                      : "border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative mx-auto lg:mx-0 shrink-0">
                    <img
                      src={user.profilePic || "https://avatar.iran.liara.run/public/boy"}
                      alt={user.name}
                      className={`w-10 h-10 rounded-full object-cover ring-2 transition-all duration-200 ${
                        isSelected
                          ? "ring-violet-500/50"
                          : "ring-white/5 group-hover:ring-violet-500/20"
                      }`}
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#09081a] rounded-full" />
                    )}
                  </div>

                  {/* Info — large screen */}
                  <div className="hidden lg:flex flex-col flex-1 min-w-0">
                    <p className={`text-[13px] font-medium truncate transition-colors ${
                      isSelected ? "text-white" : "text-white/65 group-hover:text-white/85"
                    }`}>
                      {user.name}
                    </p>
                    <p className={`text-[11px] font-light ${isOnline ? "text-emerald-400/70" : "text-white/20"}`}>
                      {isOnline ? "Online" : "Offline"}
                    </p>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="hidden lg:block w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-4 py-3 border-t border-violet-700/15">
          <p className="hidden lg:block text-[10px] text-white/15 text-center font-light tracking-wide">
            {filteredUsers.length} contact{filteredUsers.length !== 1 ? "s" : ""}
          </p>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
