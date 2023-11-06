import pino from "pino";
import type { Server } from "socket.io";

import { findMatch } from "../../domain/match-usecase";

import { validateInput } from "./validators";

const logger = pino();

export const defineEventListeners = (io: Server) => {
  io.on("connection", (socket) => {
    logger.info(`User connected with socket id: ${socket.id}`);

    socket.on("register", async (data) => {
      logger.info(`Received register event from ${socket.id}`);
      logger.debug(`Register data: ${JSON.stringify(data)}`);

      // validate inputs
      const isValid = await validateInput(data, socket);
      if (!isValid) {
        logger.warn(`Input validation failed for socket id: ${socket.id}`);
        return;
      }

      logger.info(`Input validation succeeded for socket id: ${socket.id}`);
      await findMatch({ ...data, socketId: socket.id }, io, socket);
    });

    socket.on("disconnect", () => {
      logger.warn(`User disconnected with socket id: ${socket.id}`);
    });
  });
};
