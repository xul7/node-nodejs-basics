import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { promisify } from "util";
import { dirname } from "path";
import { fileURLToPath } from "url";

console.log(
  "to check correct work 1 - do compress.js, 2 - delete fileToCompress.txt, 3 - do decompress.js"
);

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFilePath = __dirname + "/files/archive.gz";
const destinationFilePath = __dirname + "/files/fileToCompress.txt";

export const decompress = async (input, output) => {
  const pipe = promisify(pipeline);
  const gunzip = createGunzip();
  const source = createReadStream(input);
  const destination = createWriteStream(output);
  await pipe(source, gunzip, destination);
};

decompress(sourceFilePath, destinationFilePath).catch((err) => {
  console.error("An error occurred:", err);
  process.exitCode = 1;
});
