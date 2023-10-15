import { startWebServer } from "./entry-points/api/server";

async function start() {
  // 🦉 Array of entry point is being used to support more entry-points kinds like message queue, scheduled job,
  return Promise.all([startWebServer()]);
}

export interface Match {
  id: number,
  difficulty: string
}

export const easy_queue: Match[] = [];
export const medium_queue: Match[] = [];
export const hard_queue: Match[] = [];


start()
  .then((startResponses) => console.log(startResponses))
  .catch((error) => {
    console.log(error);
  });

