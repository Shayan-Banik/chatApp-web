import { Server as SocketIOServer } from "socket.io";
import http from "http";
import express from "express";

const server = SocketIOServer;
const app = express();
const httpServer = http.createServer(app);
const io = new server(httpServer, {
  cors: {
    origin: ["https://banterbox-orcin.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

// 🧠 Simple analogy
// Think like:
// userSocketMap = phone book 📒
// userId = contact name
// socket.id = phone number
// phoneBook["Shayan"] = "987654321";

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send events to all the connected client
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
  });
  // update online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});

export { io, httpServer, app };
