import express from "express";
import type { Server } from "http";
import type { AddressInfo } from "net";

import { errorHandler } from "../../../errorHandler";

import defineRoutes from "./routes";

const cors = require("cors");

let connection: Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
async function openConnection(
  expressApp: express.Application,
): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const webServerPort = 2001;
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

function createWebApplication() {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  defineRoutes(expressApp);
  expressApp.use(errorHandler);
  return expressApp;
}

async function startWebServer(): Promise<AddressInfo> {
  // ️️️✅ Best Practice: Declare a strict configuration schema and fail fast if the configuration is invalid
  const APIAddress = await openConnection(createWebApplication());
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

export { createWebApplication, startWebServer, stopWebServer };
