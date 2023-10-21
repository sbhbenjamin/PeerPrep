import { Server } from "socket.io";
import { checkIdExists, extractCategory, extractDifficulty } from "./domain/match_validators";
import { queues } from "./start";
import { Match } from "./types";

export function defineEventListeners(io: Server) {
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
        
        // Check for duplicate ID
        if (checkIdExists(msg.id)) {
            socket.emit("error", "You are already in the queue!");
            return;
        } 

        // Find match if exists, else create new queue and wait.
   
        const matchName = difficulty + category; // e.g. easyrecursion
        if (queues.has(matchName)) {
            let thisQueue: Match = queues.get(matchName) as Match;

            // Match found, remove queue from queues
            console.log("WE FOUND A MATCH!");
            queues.delete(matchName);
            
            // Remove id from ids.
            const peerID = thisQueue.id;
            // ids = ids.filter(id => id != msg.id && id != peerID);
            
            // Emit on this user's socket
            socket.emit("success", `You have been paired with User ${peerID}.`);

            // Emit on paired user's socket
            const peerSockAddr = thisQueue.sockAddr;
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
    })





    socket.on("disconnect", () => {
        console.log("User has disconnected!");
    })
});

}