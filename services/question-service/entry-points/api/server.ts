import { Server } from 'http';
import { AddressInfo } from 'net';
import express from 'express';
import defineRoutes from './routes';
import { errorHandler } from '../../errorHandler';
const cors = require('cors');

let connection: Server;

async function startWebServer(): Promise<AddressInfo> {
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
    const webServerPort = 2001 || 0;
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

export { startWebServer, stopWebServer };
