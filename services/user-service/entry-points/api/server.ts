import { Server } from 'http';
import { AddressInfo } from 'net';
import express from 'express';
import defineRoutes from './routes';
import { errorHandler } from '../../errorHandler';
const cors = require('cors');

let connection: Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
async function startWebServer(): Promise<AddressInfo> {
  // ️️️✅ Best Practice: Declare a strict configuration schema and fail fast if the configuration is invalid
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  defineRoutes(expressApp);
  expressApp.use(errorHandler)
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

async function openConnection(
  expressApp: express.Application
): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const webServerPort = process.env.SERVER_PORT || 2001;
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}



export { startWebServer, stopWebServer };