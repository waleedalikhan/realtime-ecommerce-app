/**
 * Socket.io client: connect with JWT from secure storage, join user room.
 * Lifecycle: connect when user is logged in; leave room on logout; cleanup on unmount.
 */
import { io, type Socket } from "socket.io-client";
import { getAccessToken } from "@/api/client";

const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";
let socket: Socket | null = null;

export function getSocket(token: string): Socket {
  if (socket?.connected) return socket;
  socket = io(BASE, { auth: { token }, transports: ["websocket"] });
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export async function connectAndJoin(): Promise<Socket | null> {
  const token = await getAccessToken();
  if (!token) return null;
  return getSocket(token);
}
