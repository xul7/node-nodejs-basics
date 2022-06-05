import { dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { stdout } from "process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = __dirname + "/files/fileToRead.txt";

export const read = async () => {
  const input = createReadStream(filePath);
  return input.pipe(stdout);
};

await read();
