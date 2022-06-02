import { dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { stdout } from "process";
const { createHash } = await import("crypto");

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = __dirname + "/files/fileToCalculateHashFor.txt";

export const calculateHash = async () => {
  const hash = createHash("sha256");
  const input = createReadStream(filePath);
  return input.pipe(hash).setEncoding("hex").pipe(stdout);
};

await calculateHash();
