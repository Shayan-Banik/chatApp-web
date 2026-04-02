import { MessageSquare, Sparkles, ArrowLeft } from "lucide-react";

const NoChatSelected = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-dm flex-1 flex flex-col items-center justify-center bg-[#0c0b17] relative overflow-hidden">
        {/* Subtle orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(162,28,175,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 text-center px-8 max-w-sm">
          {/* Animated icon */}
          <div className="relative inline-flex items-center justify-center mb-7">
            {/* Outer pulse ring */}
            <div className="absolute w-24 h-24 rounded-full border border-violet-500/15 animate-ping" />
            <div className="absolute w-20 h-20 rounded-full border border-violet-500/10" />

            {/* Icon container */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-700/20 border border-violet-500/25 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/10 to-fuchsia-700/10 animate-pulse" />
              <MessageSquare
                size={28}
                className="text-violet-400 relative z-10"
              />
            </div>

            {/* Sparkle dot top-right */}
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center border-2 border-[#0c0b17]">
              <Sparkles size={9} color="white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-syne font-bold text-xl text-white tracking-tight mb-2">
            No conversation selected
          </h2>

          {/* Subtext */}
          <p className="text-[13px] text-white/30 font-light leading-relaxed mb-7">
            Pick a contact from the sidebar to start chatting. Your messages are
            end-to-end encrypted.
          </p>

          {/* Hint pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07]">
            <ArrowLeft size={12} className="text-violet-400/70" />
            <span className="text-[12px] text-white/25 font-light">
              Select a contact to begin
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoChatSelected;
