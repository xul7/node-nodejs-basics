import * as fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = __dirname + "/files/fresh.txt";
const fileText = "I am fresh and young";

export const create = async () => {
  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.appendFile(filePath, fileText);
    } else {
      throw error;
    }
  }
};

await create();
