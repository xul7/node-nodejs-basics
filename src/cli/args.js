import { argv } from "process";

// для проверки ввести в /node-nodejs-basics "node ./src/cli/args.js --propName value --prop2Name value2"

export const parseArgs = () => {
  console.log(
    argv
      .slice(2)
      .reduce((acc, curr, index, array) => {
        if (curr.startsWith("--")) {
          return [...acc, `${array[index].slice(2)} is ${array[index + 1]}`];
        }
        return acc;
      }, [])
      .join(", ")
  );
};

parseArgs();
