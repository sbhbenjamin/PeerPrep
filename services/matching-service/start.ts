import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

import { extractCategory, extractDifficulty, checkIdExists } from "./domain/match_validators";
import { Match } from "./types";
import { defineEventListeners } from "./events";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = process.env.PORT || 6001;

defineEventListeners(io);

httpServer.listen(port, () => {
    console.log(`Matching service running on ${port}`)
});


export const queues: Map<string, Match> = new Map();