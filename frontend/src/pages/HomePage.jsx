import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-dm h-full bg-[#07060f] flex flex-col overflow-hidden">
        {/* Ambient orbs 07060f */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-20 -left-16 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_70%)]" />
          <div className="absolute -bottom-16 -right-10 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(162,28,175,0.09)_0%,transparent_70%)]" />
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

        {/* Main content */}
        <div className="h-full flex">
          <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 overflow-hidden">
            <div className="w-full max-w-6xl h-full">
              {/* Outer card */}
              <div className="h-full rounded-2xl border border-violet-700/20 bg-[#0c0b17]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.07)] flex flex-col">
                {/* Top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent shrink-0" />

                {/* Body: sidebar + chat */}
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  {selectedUser ? <ChatBox /> : <NoChatSelected />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
