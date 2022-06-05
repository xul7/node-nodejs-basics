import * as fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const oldFilePath = __dirname + "/files/wrongFilename.txt";
const newFilePath = __dirname + "/files/properFilename.md";

const NEW_FILE_ALREADY_EXIST = "NEW_FILE_ALREADY_EXIST";

export const rename = async () => {
  try {
    await fs.access(newFilePath);
    throw new Error(NEW_FILE_ALREADY_EXIST);
  } catch (accessError) {
    if (accessError.message === NEW_FILE_ALREADY_EXIST) {
      throw new Error("FS operation failed");
    } else {
      try {
        await fs.rename(oldFilePath, newFilePath);
      } catch (renameError) {
        if (renameError.code === "ENOENT") {
          throw new Error("FS operation failed");
        }
      }
    }
  }
};

await rename();
