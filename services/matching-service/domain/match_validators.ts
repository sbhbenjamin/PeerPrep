// eslint-disable-next-line import/no-cycle
import { queues } from "../start";

export function checkIdExists(id: number) {
  const matches = Array.from(queues.entries());
  const res = matches.find((element) => element[1].id === id);
  return res !== undefined;
}
