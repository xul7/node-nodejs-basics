import { dirname } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { stdin, stdout } from "process";
import readline from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = __dirname + "/files/fileToWrite.txt";

export const write = async () => {
  const stream = createWriteStream(filePath);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  rl.on("line", (input) => {
    stream.write(input);
  });

  console.log("type some text in console then press enter, ctrl + c to exit");
};

await write();
