import { env } from "process";

// для проверки ввести в /node-nodejs-basics "RSS_name1=value1 RSS_name2=value2 node ./src/cli/env.js"

export const parseEnv = () => {
  console.log(
    Object.keys(env)
      .filter((key) => key.startsWith("RSS_"))
      .map((key) => `${key}=${env[key]}`)
      .join("; ")
  );
};

parseEnv();
