import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { verifyToken } from "./utils/jwt.js";
import type { TokenPayload } from "./utils/jwt.js";
import { logger } from "./utils/logger.js";

const ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET ?? "";
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is required");

/**
 * Attach Socket.io to HTTP server. Auth: client sends auth: { token } in handshake;
 * we verify JWT and attach userId to socket, then join room user:${userId}.
 */
export const attachSocket = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()) ?? "*",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = (socket.handshake.auth as { token?: string })?.token;
    if (!token) {
      return next(new Error("Auth required"));
    }
    try {
      const payload = verifyToken<TokenPayload>(token, ACCESS_SECRET);
      socket.data.userId = payload.sub;
      next();
    } catch (e) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId as string;
    const room = `user:${userId}`;
    socket.join(room);
    logger.info(
      { userId, socketId: socket.id },
      "Socket connected, joined room"
    );

    socket.on("disconnect", () => {
      logger.debug({ userId, socketId: socket.id }, "Socket disconnected");
    });
  });

  return io;
};
