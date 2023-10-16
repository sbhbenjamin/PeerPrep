import express from "express";
import { createServer } from "http";
import type { AddressInfo } from "net";
import { Server } from "socket.io";

// import { errorHandler } from "../../errorHandler";

const cors = require("cors");

let connection: Server;

const setupSocket = (io: Server) => {
  const getConnectedUsers = (roomId: string) =>
    io
      .in(roomId)
      .fetchSockets()
      .catch((e) => console.error(e))
      .then(
        (connectedSockets) =>
          connectedSockets?.map((socket) => ({
            userID: socket.id,
            username: (socket as any).username,
          })),
      );

  io.use((socket, next) => {
    const { username } = socket.handshake.auth;
    if (!username) {
      return next(new Error("invalid username"));
    }
    (socket as any).username = username;
    next();
  });

  io.on("connection", (socket) => {
    socket.on("join", (roomId: string) => {
      if (socket.rooms.has(roomId)) {
        return;
      }
      // join new room
      socket.join(roomId);

      // updating list
      socket.to(roomId).emit("user_connected", {
        userID: socket.id,
        username: (socket as any).username,
      });
      console.log(`joined: ${roomId}`);
      getConnectedUsers(roomId)
        .catch((e) => console.error(e))
        .then((users) => {
          socket.emit("users", users);
        });
    });

    socket.on(
      "code_update",
      ({ content, to }: { content: string; to: string }) => {
        socket.to(to).emit("code_update", content);
      },
    );

    socket.on(
      "message",
      ({
        content,
        to,
        from,
      }: {
        content: string;
        to: string;
        from: string;
      }) => {
        console.log(`received message: ${content}`);
        socket.to(to).emit("message", {
          username: from,
          content,
        });
      },
    );

    socket.on("disconnecting", () => {
      console.log("disconnected");
      for (const room of socket.rooms) {
        if (room === socket.id) {
          continue;
        }
        getConnectedUsers(room)
          .catch((e) => console.error(e))
          .then((users) => {
            const remainingUsers = users?.filter(
              (user) => user.userID !== socket.id,
            );
            console.log(`emitting to ${room}: ${remainingUsers}`);
            io.to(room).emit("users", remainingUsers);
          });
      }
    });
  });
};

async function openConnection(
  expressApp: express.Application,
): Promise<AddressInfo> {
  return new Promise(() => {
    const webServerPort = process.env.PORT || 4001;
    const httpServer = createServer(expressApp);
    httpServer.listen(webServerPort, () => {
      console.log(`listening on ${webServerPort}`);
    });
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
      },
    });
    setupSocket(io);
  });
}

async function startWebServer(): Promise<AddressInfo> {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  // defineRoutes(expressApp);
  // expressApp.use(errorHandler);
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

export { startWebServer, stopWebServer };
