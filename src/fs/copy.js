import * as fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFolderPath = __dirname + "/files";
const destinationFolderPath = __dirname + "/files_copy";

export const copy = async () => {
  try {
    const files = await fs.readdir(sourceFolderPath);
    await fs.mkdir(destinationFolderPath);

    for (const file of files) {
      const fileContent = await fs.readFile(`${sourceFolderPath}/${file}`);
      await fs.appendFile(`${destinationFolderPath}/${file}`, fileContent);
    }
  } catch (error) {
    if (error.code === "EEXIST" || error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    console.log(error);
  }
};

await copy();
