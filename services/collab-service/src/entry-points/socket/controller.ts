import pino from "pino";
import { type Server } from "socket.io";

import type { Message } from "../../commons/types";
import {
  resetCacheTimeouts,
  sendCache,
  setCacheTimeouts,
  updateCodeCache,
  updateMessageCache,
} from "../../data-access/collab-caches";

const logger = pino();

export const defineEventListeners = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on(
      "join",
      ({ roomId, username }: { roomId: string; username: string }) => {
        if (socket.rooms.has(roomId)) {
          return;
        }
        io.in(roomId)
          .fetchSockets()
          .catch((e) => logger.error(e))
          .then((connectedSockets) => {
            if (!connectedSockets) {
              io.to(socket.id).emit(
                "error",
                "An error occurred with the session, please try to find another match again.",
              );
              return;
            }

            sendCache(socket, roomId);
            const connectedSocket = connectedSockets[0];
            socket.join(roomId);

            if (connectedSocket) {
              io.to(connectedSocket.id).emit("connected", username);
              io.to(socket.id).emit("connected");
            } else {
              resetCacheTimeouts(roomId);
            }
          });
      },
    );

    socket.on(
      "code_update",
      ({ content, to }: { content: string; to: string }) => {
        socket.to(to).emit("code_update", content);
        updateCodeCache(to, content);
      },
    );

    socket.on(
      "message",
      ({ to, message }: { to: string; message: Message }) => {
        logger.info(
          `received message: "${message.content}" from: ${message.userId}`,
        );
        socket.to(to).emit("message", [message]);
        updateMessageCache(to, message);
      },
    );

    socket.on(
      "leave",
      ({ roomId, username }: { roomId: string; username: string }) => {
        io.to(roomId).emit("end_session", username);
        io.in(roomId)
          .fetchSockets()
          .catch((e) => logger.error(e))
          .then((connectedSockets) => {
            if (connectedSockets) {
              connectedSockets.forEach((remainingSocket) => {
                remainingSocket.disconnect();
              });
            }
          });
      },
    );

    socket.on("disconnecting", () => {
      for (const room of socket.rooms) {
        if (room === socket.id) {
          continue;
        }
        io.to(room).emit("disconnected");
        io.in(room)
          .fetchSockets()
          .catch((e) => logger.error(e))
          .then((connectedSockets) => {
            if (connectedSockets?.length && connectedSockets?.length < 2) {
              setCacheTimeouts(room, 600000);
            }
          });
      }
    });
  });
};
