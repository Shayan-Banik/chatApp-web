import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

import toast from "react-hot-toast";

const BASEURL =
  import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await fetch(`${BASEURL}/api/messages/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to get users");
      }
      set({
        users: data.users,
      });
    } catch (error) {
      console.log("Failed to get users", error);
      toast.error("Failed to get users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await fetch(`${BASEURL}/api/messages/users/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to get messages");
      }
      set({
        messages: data.messages,
      });
    } catch (error) {
      console.log("Failed to get messages", error);
      toast.error("Failed to get messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await fetch(
        `${BASEURL}/api/messages/send/${selectedUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }
      set({
        messages: [...messages, data.message],
      });
    } catch (error) {
      console.log("Failed to send message", error);
      toast.error("Failed to send message");
    }
  },

  subscribeToMsg: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // prevent duplicate listeners
    socket.off("newMessage");

    socket.on("newMessage", (message) => {
      const isMessageFromSelectedUser = message.senderId === selectedUser._id;

      if (!isMessageFromSelectedUser) return;

      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  unSubscribeFromMsg: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectUser: (selectedUser) => set({ selectedUser }),
}));
