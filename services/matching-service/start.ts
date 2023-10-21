import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

import { extractCategory, extractDifficulty, checkIdExists } from "./domain/match_validators";
import { Match } from "./types";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


const port = process.env.PORT || 6001;

io.on("connection", (socket) => {
    socket.emit("reply", "hello from server");

    socket.on("register", (msg) => {
        console.log(`A NEW USER WITH ID ${msg.id} JOINED!`);    
    
        const difficulty = extractDifficulty(msg.difficulty);
        const category = extractCategory(msg.category);
        
        // Check Valid Difficulty
        if (difficulty == undefined) {
            socket.emit("error", "Invalid Difficulty!");
            return;
        }
        
        //Check valid Category
        if (category == undefined) {
            socket.emit("error", "Invalid Category!");
            return;
        }
        
        // Check for duplicate ID and push to Queue
        if (checkIdExists(msg.id)) {
            socket.emit("error", "You are already in the queue!");
            return;
        } 

        // Find match if exists, else create new queue and wait.
   
        const queueName = difficulty + category; // e.g. easyrecursion
        let thisQueue = queues.get(queueName);
        if (thisQueue) {
            // Match found, remove queue from queues
            console.log("WE FOUND A MATCH!");
            queues.delete(queueName);
            
            // Remove id from ids.
            const peerID = thisQueue[0].id;
            ids = ids.filter(id => id != msg.id && id != peerID);
            
            // Emit on this user's socket
            socket.emit("success", `You have been paired with User ${peerID}.`);

            // Emit on paired user's socket
            const peerSockAddr = thisQueue[0].sockAddr;
            const peerSocket = io.sockets.sockets.get(peerSockAddr);
            if (peerSocket) {
                peerSocket.emit("success", `You have been paired with User ${msg.id}`);
                peerSocket.disconnect();
            } else {
                console.log("Cannot find peer socket!");
            }        
            socket.disconnect();
        } else {
            // No match, so we push queue to queues.
            const thisMatch = {
                id: msg.id,
                difficulty: difficulty,
                category: category,
                sockAddr: socket.id
            };            
            thisQueue = [thisMatch];
            queues.set(queueName, thisQueue);

            // Push this user's id into ids.
            ids.push(msg.id);

            // Wait
            const DELAY = 5000;
            setTimeout(() => {
                thisQueue = queues.get(queueName);
                if (ids.includes(msg.id) && thisQueue) {
                    queues.delete(queueName);
                    ids = ids.filter(id => id != msg.id);
                    console.log("FAILURE!");
                    socket.emit("error", "Sorry, we could not find you a match!");
                    socket.disconnect();
                }
            }, DELAY);
        }
        socket.emit("reply", "You are in the queue!");
    })





    socket.on("disconnect", () => {
        console.log("User has disconnected!");
    })
});

httpServer.listen(port, () => {
    console.log(`Matching service running on ${port}`)
});


const queues: Map<string, Array<Match>> = new Map();

export let ids: Array<number> = [];