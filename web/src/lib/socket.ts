import { io } from "socket.io-client";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

let socket: ReturnType<typeof io> | null = null;

export function getSocket(token: string | null) {
  if (!token) return null;
  if (socket?.connected) return socket;
  socket = io(BASE, {
    auth: { token },
    transports: ["websocket", "polling"],
  });
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
