import pino from "pino";
import type { Server } from "socket.io";

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
    socket.on("join", (roomId: string) => {
      if (socket.rooms.has(roomId)) {
        logger.error(`already joined ${roomId}`);
        return;
      }
      io.in(roomId)
        .fetchSockets()
        .catch((e) => logger.error(e))
        .then((connectedSockets) => {
          if (!connectedSockets || connectedSockets.length > 1) {
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
            io.to(connectedSocket.id).emit(
              "connected",
              socket.handshake.auth.username,
            );
            io.to(socket.id).emit(
              "connected",
              connectedSocket.handshake.auth.username,
            );
          } else {
            resetCacheTimeouts(roomId);
          }
        });
    });

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
          `received message: "${message.content}" from: ${message.username}`,
        );
        socket.to(to).emit("message", [message]);
        updateMessageCache(to, message);
      },
    );

    socket.on("leave", (roomId: string) => {
      io.to(roomId).emit("end_session");
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
    });

    socket.on("disconnecting", () => {
      for (const room of socket.rooms) {
        if (room === socket.id) {
          return;
        }
        logger.info(`disconnecting from room: ${room}`);
        io.to(room).emit("disconnected", socket.handshake.auth.username);
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
