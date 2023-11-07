import express from "express";
import { createServer } from "http";
import type { AddressInfo } from "net";
import { Server } from "socket.io";

import type { Message } from "./types";

const cors = require("cors");

let connection: Server;
const codeCache: Map<string, string> = new Map();
const messageCache: Map<string, Message[]> = new Map();
const timeouts: Map<string, NodeJS.Timeout> = new Map();

const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join", (roomId: string) => {
      if (socket.rooms.has(roomId)) {
        return;
      }
      // join new room
      socket.join(roomId);

      socket.to(roomId).emit("connected", socket.handshake.auth.username);

      console.log(`joined: ${roomId}`);

      if (codeCache.has(roomId)) {
        socket.emit("code_update", codeCache.get(roomId));
      }
      if (messageCache.has(roomId)) {
        socket.emit("message", messageCache.get(roomId));
      }
      if (timeouts.has(roomId)) {
        console.log(`resetting timeout for room: ${roomId}`);
        clearTimeout(timeouts.get(roomId));
        timeouts.delete(roomId);
      }
    });

    socket.on(
      "code_update",
      ({ content, to }: { content: string; to: string }) => {
        socket.to(to).emit("code_update", content);
        codeCache.set(to, content);
      },
    );

    socket.on(
      "message",
      ({ to, message }: { to: string; message: Message }) => {
        console.log(
          `received message: "${message.content}" from: ${message.username}`,
        );
        socket.to(to).emit("message", [message]);
        if (messageCache.has(to)) {
          messageCache.get(to)!.push(message);
        } else {
          messageCache.set(to, [message]);
        }
      },
    );

    socket.on("disconnecting", () => {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          console.log(`disconnecting from room: ${room}`);
          io.to(room).emit("disconnected", socket.handshake.auth.username);
        }

        io.in(room)
          .fetchSockets()
          .catch((e) => console.error(e))
          .then((connectedSockets) => {
            if (connectedSockets?.length && connectedSockets?.length < 2) {
              console.log(`setting cache timeout for empty room: ${room}`);
              const clearRoomCacheTimeout = setTimeout(() => {
                messageCache.delete(room);
                codeCache.delete(room);
                console.log(`cleared caches for room: ${room}`);
              }, 600000);
              timeouts.set(room, clearRoomCacheTimeout);
            }
          });
      }
    });
  });
};

async function openConnection(
  expressApp: express.Application,
): Promise<AddressInfo> {
  return new Promise(() => {
    const webServerPort = process.env.PORT || 4001;
    const httpServer = createServer(expressApp);
    httpServer.listen(webServerPort, () => {
      console.log(`listening on ${webServerPort}`);
    });
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
      },
    });
    setupSocket(io);
  });
}

async function startWebServer(): Promise<AddressInfo> {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

export { startWebServer, stopWebServer };
