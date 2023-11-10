import type { Socket } from "socket.io";

import { Difficulty, Language, type Match } from "../../commons/types";

export const validateInput = async (
  msg: Match,
  socket: Socket,
): Promise<boolean> => {
  if (Difficulty[msg.difficulty] === undefined) {
    socket.emit("error", "Invalid Difficulty!");
    return false;
  }

  if (Language[msg.language] === undefined) {
    socket.emit("error", "Invalid Language!");
    return false;
  }

  return true;
};
