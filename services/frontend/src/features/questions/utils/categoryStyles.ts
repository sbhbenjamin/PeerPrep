import { createHash } from "crypto";

export const hashStringToColour = (str: string) => {
  const hash = createHash("md5").update(str).digest("hex");
  const colorClasses = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "fuschia",
    "cyan",
    "rose",
    "lime",
  ];
  const colorIndex = parseInt(hash.substring(0, 6), 16) % colorClasses.length;
  const color = colorClasses[colorIndex];
  return `bg-${color}-100 text-${color}-700 border-${color}-100 hover:bg-${color}-200 hover:text-${color}-900`;
};
