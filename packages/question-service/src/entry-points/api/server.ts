import express from "express";
import type { Server } from "http";
import type { AddressInfo } from "net";

import { errorHandler } from "../../../errorHandler";

import defineRoutes from "./routes";

const cors = require("cors");

let connection: Server;

async function openConnection(
  expressApp: express.Application,
): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const webServerPort = process.env.PORT || 5001;
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

async function startWebServer(): Promise<AddressInfo> {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  defineRoutes(expressApp);
  expressApp.use(errorHandler);
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
