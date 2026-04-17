import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASEURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://banterbox-r98l.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await fetch(`${BASEURL}/api/auth/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Auth check failed");
      }

      set({ authUser: data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checking auth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });

    try {
      const response = await fetch(`${BASEURL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      set({ authUser: data.user });
      get().connectSocket();

      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });

    try {
      const response = await fetch(`${BASEURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);
      console.log("SETTING USER:", data.user);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      set({ authUser: data.user });
      get().connectSocket();

      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${BASEURL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      set({ authUser: null, onlineUsers: [] });
      get().disconnectSocket();

      toast.success("Logout successful!");
    } catch (error) {
      toast.error(error.message);
    }
  },

  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });

    try {
      const response = await fetch(`${BASEURL}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      set({ authUser: data.user });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser || !authUser._id || socket?.connected) return;

    const newSocket = io(BASEURL, {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket?.connected) {
      socket.disconnect();
    }

    set({ socket: null });
  },
}));
