import * as fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const folderPath = __dirname + "/files";

export const list = async () => {
  try {
    const files = await fs.readdir(folderPath);
    console.log(files);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await list();
