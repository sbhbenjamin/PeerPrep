import type { Server } from "socket.io";

// eslint-disable-next-line import/no-cycle
import {
  checkIdExists,
  extractCategory,
  extractDifficulty,
} from "../../domain/match_validators";
import { queues } from "../../start";
import type { Match } from "../../types";

export function defineEventListeners(io: Server) {
  io.on("connection", (socket) => {
    socket.emit("reply", "hello from server");

    socket.on("register", (msg) => {
      console.log(`A NEW USER WITH ID ${msg.id} JOINED!`);

      const difficulty = extractDifficulty(msg.difficulty);
      const category = extractCategory(msg.category);

      // Check Valid Difficulty
      if (difficulty === undefined) {
        socket.emit("error", "Invalid Difficulty!");
        return;
      }

      // Check valid Category
      if (category === undefined) {
        socket.emit("error", "Invalid Category!");
        return;
      }

      // Check for duplicate ID
      if (checkIdExists(msg.id)) {
        socket.emit("error", "You are already in the queue!");
        return;
      }

      // Find match if exists, else create new queue and wait.
      const matchName = difficulty + category; // e.g. easyrecursion

      const thisMatch = {
        id: msg.id,
        difficulty,
        category,
        sockAddr: socket.id,
      };

      if (queues.has(matchName)) {
        const thisQueue: Match = queues.get(matchName) as Match;

        // Emit on paired user's socket
        const peerSockAddr = thisQueue.sockAddr;
        const peerSocket = io.sockets.sockets.get(peerSockAddr);

        // Match found, remove from queues. (If peer connection lost => delete the queue and replace with current user.)
        queues.delete(matchName);
        if (peerSocket) {
          console.log("WE FOUND A MATCH!");

          const peerID = thisQueue.id;

          // Emit on peer user's socket
          peerSocket.emit(
            "success",
            `You have been paired with User ${msg.id}`,
          );
          peerSocket.disconnect();

          // Emit on this user's socket
          socket.emit("success", `You have been paired with User ${peerID}.`);
          socket.disconnect();
        } else {
          console.log("Cannot find peer socket!");
          queues.set(matchName, thisMatch);
        }
      } else {
        // No match, so we push match to queues.
        queues.set(matchName, thisMatch);

        // Wait
        const DELAY = 5000;
        setTimeout(() => {
          if (queues.has(matchName)) {
            queues.delete(matchName);
            console.log("FAILURE!");
            socket.emit("error", "Sorry, we could not find you a match!");
            socket.disconnect();
          }
        }, DELAY);
      }
      socket.emit("reply", "You are in the queue!");
    });

    socket.on("disconnect", () => {
      console.log("User has disconnected!");
    });
  });
}
