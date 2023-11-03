import type { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line import/no-cycle
import { checkIdExists } from "../../domain/match_validators";
import { queues } from "../../start";
import {
  Category,
  Difficulty,
  Language,
  type Match,
  type MatchRequest,
} from "../../types";

export function defineEventListeners(io: Server) {
  io.on("connection", (socket) => {
    socket.emit("reply", "hello from server");

    socket.on("register", (msg: MatchRequest) => {
      console.log(`${JSON.stringify(msg)} joined the queue!`);

      // Check Valid Difficulty
      if (Difficulty[msg.difficulty] === undefined) {
        socket.emit("error", "Invalid Difficulty!");
        return;
      }

      // Check valid Category
      if (Category[msg.category] === undefined) {
        socket.emit("error", "Invalid Category!");
        return;
      }

      // Check valid Language
      if (Language[msg.language] === undefined) {
        socket.emit("error", "Invalid Language!");
        return;
      }

      // Check for duplicate ID
      if (checkIdExists(msg.id)) {
        socket.emit("error", "You are already in the queue!");
        return;
      }

      const difficulty = msg.difficulty.toString();
      const category = msg.category.toString();
      const language = msg.language.toString();

      // Find match if exists, else create new queue and wait.
      const matchName = difficulty + category + language; // e.g. easyrecursionjavascript

      const thisMatch = {
        id: msg.id,
        difficulty: msg.difficulty,
        category: msg.category,
        language: msg.language,
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
                console.log("no question found");
                io.to(peerSockAddr)
                  .to(socket.id)
                  .emit("error", "No questions meet your provided criteria");
              } else {
                return response.json();
              }
            })
            .then((json) => {
              if (json) {
                console.log(json);
                const roomId = uuidv4();
                io.to(peerSockAddr).to(socket.id).emit("match", {
                  question: json,
                  roomId,
                  language,
                });
              }
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
