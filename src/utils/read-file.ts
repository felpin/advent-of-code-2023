import fs, { PathLike } from "node:fs";
import * as readline from "node:readline";

export const readFileLineByLine = async (
  path: PathLike,
  callback: (line: string) => void,
) => {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    callback(line);
  }
};
