import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// eslint-disable-next-line import/no-cycle
import { defineEventListeners } from "./entry_points/api/events";

import type { Match } from "./types";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const port = process.env.PORT || 6001;

defineEventListeners(io);

httpServer.listen(port, () => {
  console.log(`Matching service running on ${port}`);
});

export const queues: Map<string, Match> = new Map();
