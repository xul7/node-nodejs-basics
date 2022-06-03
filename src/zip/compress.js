import { createGzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { promisify } from "util";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFilePath = __dirname + "/files/fileToCompress.txt";
const destinationFilePath = __dirname + "/files/archive.gz";

export const compress = async (input, output) => {
  const pipe = promisify(pipeline);
  const gzip = createGzip();
  const source = createReadStream(input);
  const destination = createWriteStream(output);
  await pipe(source, gzip, destination);
};

compress(sourceFilePath, destinationFilePath).catch((err) => {
  console.error("An error occurred:", err);
  process.exitCode = 1;
});
