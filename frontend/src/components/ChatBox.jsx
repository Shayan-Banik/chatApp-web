import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  Send,
  X,
  Image,
  Smile,
  ChevronLeft,
  Loader2,
  CheckCheck,
} from "lucide-react";

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const MessageBubble = ({
  message,
  isOwn,
  showAvatar,
  senderPic,
  senderInitial,
}) => {
  return (
    <div
      className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      {showAvatar ? (
        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-0.5">
          {senderPic ? (
            <img
              src={senderPic}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center text-[10px] font-bold text-white">
              {senderInitial}
            </div>
          )}
        </div>
      ) : (
        <div className="w-7 shrink-0" />
      )}

      <div
        className={`max-w-[68%] flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
        {message.image && (
          <div
            className={`rounded-2xl overflow-hidden border ${
              isOwn ? "border-violet-500/20" : "border-white/[0.07]"
            } max-w-[220px]`}>
            <img
              src={message.image}
              alt="attachment"
              className="w-full object-cover"
            />
          </div>
        )}

        {message.text && (
          <div
            className={`px-4 py-2.5 rounded-2xl text-[13px] font-light leading-relaxed break-words ${
              isOwn
                ? "bg-gradient-to-br from-violet-600 to-fuchsia-700 text-white rounded-br-sm"
                : "bg-white/[0.06] border border-white/[0.08] text-white/80 rounded-bl-sm"
            }`}>
            {message.text}
          </div>
        )}

        <div
          className={`flex items-center gap-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-white/20 font-light">
            {formatTime(message.createdAt)}
          </span>
          {isOwn && <CheckCheck size={11} className="text-violet-400/60" />}
        </div>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    isMessagesLoading,
    setSelectUser,
    subscribeToMsg,
    unSubscribeFromMsg,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subscribeToMsg();

    return () => {
      unSubscribeFromMsg();
    };
  }, [selectedUser?._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if (!text.trim() && !imagePreview) return;

    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const initials = (name) =>
    name
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
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 99px; }
      `}</style>

      <div className="font-dm flex-1 flex flex-col min-h-0 bg-[#0c0b17] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-violet-700/15 flex items-center gap-3 bg-[#09081a]/80 backdrop-blur-sm shrink-0">
          <button
            onClick={() => setSelectUser(null)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl text-white/40 hover:text-white/80 hover:bg-white/[0.05] transition-all duration-200">
            <ChevronLeft size={18} />
          </button>

          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-violet-500/20">
              {selectedUser?.profile ? (
                <img
                  src={selectedUser.profile}
                  alt={selectedUser?.name || "user"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center text-[13px] font-bold text-white">
                  {initials(selectedUser?.name)}
                </div>
              )}
            </div>

            {isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#09081a] rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-syne font-bold text-[14px] text-white tracking-tight truncate">
              {selectedUser?.name}
            </p>
            <p
              className={`text-[11px] font-light ${isOnline ? "text-emerald-400/80" : "text-white/25"}`}>
              {isOnline ? "Online now" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto chat-scroll px-5 py-5 pb-28">
          {isMessagesLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 size={22} className="text-violet-500/50 animate-spin" />
              <p className="text-[12px] text-white/20 font-light">
                Loading messages...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                <Send size={18} className="text-violet-400/50" />
              </div>
              <p className="text-[13px] text-white/25 font-light">
                No messages yet. Say hello!
              </p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isOwn = String(msg.senderId) === String(authUser?._id);
              const prevMsg = messages[i - 1];
              const showAvatar =
                !isOwn && String(prevMsg?.senderId) !== String(msg.senderId);

              console.log("authUser._id:", authUser?._id);
              console.log("selectedUser._id:", selectedUser?._id);
              console.log("msg.senderId:", msg.senderId);
              console.log(
                "isOwn:",
                String(msg.senderId) === String(authUser?._id),
              );

              return (
                <MessageBubble
                  key={msg._id}
                  message={msg}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  senderPic={isOwn ? authUser?.profile : selectedUser?.profile}
                  senderInitial={
                    isOwn
                      ? initials(authUser?.name)
                      : initials(selectedUser?.name)
                  }
                />
              );
            })
          )}

          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 z-10">
          {imagePreview && (
            <div className="px-5 pb-3 bg-[#09081a]/80 backdrop-blur-sm">
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded-xl border border-violet-500/30"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0c0b17] border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X size={10} />
                </button>
              </div>
            </div>
          )}

          <div className="px-5 py-4 border-t border-violet-700/15 bg-[#09081a]/80 backdrop-blur-sm shrink-0">
            <div className="flex items-end gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl text-white/30 hover:text-violet-400 hover:bg-violet-600/10 border border-transparent hover:border-violet-500/20 transition-all duration-200 mb-1">
                <Image size={16} />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="flex-1 flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] focus-within:border-violet-500/40 focus-within:bg-violet-500/[0.04] transition-all duration-200">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none resize-none text-[13px] text-white placeholder-white/20 font-light leading-relaxed max-h-[120px] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                  style={{ scrollbarWidth: "none" }}
                />
                <button className="text-white/20 hover:text-violet-400 transition-colors mb-0.5 shrink-0">
                  <Smile size={16} />
                </button>
              </div>

              <button
                onClick={handleSend}
                disabled={isSending || (!text.trim() && !imagePreview)}
                className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-700 flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none mb-0.5">
                {isSending ? (
                  <Loader2 size={15} color="white" className="animate-spin" />
                ) : (
                  <Send size={15} color="white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
