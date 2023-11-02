import type { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line import/no-cycle
import { checkIdExists } from "../../domain/match_validators";
import { queues } from "../../start";
import { Category, Difficulty, Language, type Match } from "../../types";

export function defineEventListeners(io: Server) {
  io.on("connection", (socket) => {
    socket.on("register", (msg: Match) => {
      console.log(`${JSON.stringify(msg)} joined the queue!`);

      // Check Valid Difficulty
      if (Difficulty[msg.difficulty] === undefined) {
        socket.emit("error", "Invalid Difficulty!");
        return;
      }
      // Check valid Category
      msg.categories.forEach((category) => {
        if (Category[category] === undefined) {
          socket.emit("error", "Invalid Category!");
        }
      });

      // Check valid Language
      if (Language[msg.language] === undefined) {
        socket.emit("error", "Invalid Language!");
        return;
      }

      // Check for duplicate ID
      if (checkIdExists(msg.socketId)) {
        socket.emit("error", "You are already in the queue!");
        return;
      }

      socket.emit("matchPending", true);

      const difficulty = msg.difficulty.toString();
      const category = msg.categories[0].toString();
      const language = msg.language.toString();

      // Find match if exists, else create new queue and wait.
      const matchName = difficulty + category + language; // e.g. easyrecursionjavascript

      const thisMatch = {
        socketId: msg.socketId,
        difficulty: msg.difficulty,
        categories: msg.categories,
        language: msg.language,
      };

      if (queues.has(matchName)) {
        const thisQueue: Match = queues.get(matchName) as Match;

        // Emit on paired user's socket
        const peerSockAddr = thisQueue.socketId;
        const peerSocket = io.sockets.sockets.get(peerSockAddr);

        // Match found, remove from queues. (If peer connection lost => delete the queue and replace with current user.)
        queues.delete(matchName);
        if (peerSocket) {
          console.log("match found");

          const params = new URLSearchParams({
            difficulty,
            category,
            getOne: "true",
          });

          fetch(`http://localhost:5001/question/?${params.toString()}`)
            // eslint-disable-next-line consistent-return
            .then((response) => {
              if (response.headers.get("Content-Length") === "0") {
                console.log(`no question found for ${params}`);
                io.to(peerSockAddr)
                  .to(socket.id)
                  .emit("error", "No questions meet your provided criteria");
                io.to(peerSockAddr).to(socket.id).emit("matchPending", false);
                io.to(peerSockAddr).to(socket.id).emit("queue_name", undefined);
              } else {
                return response.json();
              }
            })
            .then((json) => {
              if (!json) {
                return;
              }
              const roomId = uuidv4();
              io.to(peerSockAddr).to(socket.id).emit("match", {
                question: json,
                roomId,
                language,
              });
              peerSocket.disconnect();
              socket.disconnect();
            });
        } else {
          console.log("Cannot find peer socket!");
          queues.set(matchName, thisMatch);
        }
      } else {
        // No match, so we push match to queues.
        queues.set(matchName, thisMatch);

        // Wait
        const DELAY = 120000;
        setTimeout(() => {
          if (queues.has(matchName)) {
            queues.delete(matchName);
            console.log("matching timed out");
            socket.emit("matchPending", false);
            socket.emit("error", "Sorry, we could not find you a match!");
          }
        }, DELAY);
      }
      socket.emit("queue_name", matchName);
    });

    socket.on("unqueue", (matchName: string) => {
      if (queues.has(matchName)) {
        queues.delete(matchName);
        socket.emit("queue_name", undefined);
        socket.emit("matchPending", false);
      }
    });

    socket.on("disconnect", () => {
      console.log("User has disconnected!");
    });
  });
}
