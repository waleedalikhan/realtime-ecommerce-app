/**
 * Express + Socket.io entry. Creates HTTP server, attaches Socket.io, sets app.get("io").
 */
import "./loadEnv.js";
import { createServer } from "http";
import { attachSocket } from "./socket.js";
import { logger } from "./utils/logger.js";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 4000;

const httpServer = createServer(app);
const io = attachSocket(httpServer);
app.set("io", io);

httpServer.listen(PORT, () => {
  logger.info({ port: PORT }, "Server listening");
});
