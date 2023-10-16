import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

import { defineQueue, isDuplicateID } from "./domain/match_validators";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


const port = process.env.PORT || 6001;

io.on("connection", (socket) => {
    socket.emit("reply", "hello from server");

    socket.on("register", (msg) => {
        console.log(`A NEW USER WITH ID ${msg.id} JOINED!`);
        // Check Valid Difficulty
        const this_queue = defineQueue(msg.difficulty);
        if (this_queue == undefined) {
            socket.emit("error", "Invalid Difficulty!");
            // Temporary Return to avoid undefined arrays
            return;
        }
        
        // Check for duplicate ID and push to Queue
        if (isDuplicateID(msg.id)) {
            socket.emit("error", "You are already in the queue!");
            // Temporary Return to avoid undefined arrays
            return;
        } else {
            socket.emit("reply", "You are in the queue!");
            this_queue.push({
                id: msg.id,
                difficulty: msg.difficulty,
                sockAddr: socket.id
            });
        }
        console.log(`Length of queue is: ${this_queue.filter(element => element != undefined).length}`);
        
        // Check for match
        if (this_queue.length == 2) {
            console.log("WE FOUND A MATCH!");
            socket.emit("success", `You have been paired with User ${this_queue[0].id}`);

            const sockAddr = this_queue[0].sockAddr;
            const peerSocket = io.sockets.sockets.get(sockAddr);
            if (peerSocket) {
                peerSocket.emit("success", `You have been paired with User ${this_queue[1].id}`);
                peerSocket.disconnect();
            } else {
                console.log("Cannot find peer socket!");
            }
            this_queue.length = 0;
            socket.disconnect();
        } else {
            // Delay 5s
            const DELAY = 5000;
            setTimeout(() => {
                if (this_queue.find((user) => user.id == msg.id)) {
                    console.log("FAILURE!");
                    socket.emit("error", "Sorry, we could not find you a match!");
                    socket.disconnect();
                    this_queue.length = 0;
                }
            }, DELAY);
        }
    })





    socket.on("disconnect", () => {
        console.log("User has disconnected!");
    })
});

httpServer.listen(port, () => {
    console.log(`Matching service running on ${port}`)
});

export interface Match {
  id: number,
  difficulty: string,
  sockAddr: string
}

// export const easy_queue: Match[] = [];
export const easy_queue = new Array<Match>(0);
export const medium_queue = new Array<Match>(0);
export const hard_queue = new Array<Match>(0);