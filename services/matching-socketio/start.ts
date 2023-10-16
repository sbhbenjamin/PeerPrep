import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


const port = process.env.PORT || 6001;

io.on("connection", (socket) => {
    console.log("A user connected!");

    socket.on("register", (msg) => {
        console.log(`WE HAVE RECEIVED A NEW MESSAGE AS ${msg.id}, ${msg.difficulty}`);
    })
    socket.on("disconnect", () => {
        console.log("User has disconnected!");
    })
});

httpServer.listen(port, () => {
    console.log(`Matching service running on ${port}`)
});