import { io, Socket } from "socket.io-client";

const BASE =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) ||
  "http://localhost:4000";

let socket: ReturnType<typeof io> | null = null;

export const getSocket = (token: string | null): Socket | null => {
  if (!token) return null;
  if (socket?.connected) return socket;
  socket = io(BASE, {
    auth: { token },
    transports: ["websocket", "polling"],
  });
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
