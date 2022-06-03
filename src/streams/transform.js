import { Transform } from "stream";
import { stdin, stdout } from "process";

export const transform = async () => {
  const reverseInput = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().split("").reverse().join(""));
    },
  });

  stdin.pipe(reverseInput).pipe(stdout);

  console.log("type some text in console then press enter, ctrl + c to exit");
};

await transform();
