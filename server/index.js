import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { dirname, join } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

import initSocket from "./utils/initSocket.js";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(join(__dirname, "../client/dist")));

const server = createServer(app);

const io = new Server(server, {
  cors: process.env.ALLOWED_ORIGIN,
  serveClient: false,
});

io.on("connection", initSocket);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server ready on port ${port} 🚀`);
});
