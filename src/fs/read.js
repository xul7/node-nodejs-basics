import * as fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = __dirname + "/files/fileToRead.txt";

export const read = async () => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    console.log(fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await read();
