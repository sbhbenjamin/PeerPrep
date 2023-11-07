export type Message = {
  username: string;
  content: string;
};

export enum Status {
  Connected = "Connected",
  Disconnected = "Disconnected",
  SessionEnded = "Session Ended",
}
