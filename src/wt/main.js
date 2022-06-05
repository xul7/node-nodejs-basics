import os from "os";
import { sendResult } from "./worker.js";

export const performCalculations = async () => {
  const cpus = os.cpus();
  const num = 10;
  const results = [];

  for (let i = 0; i < cpus.length; i++) {
    results.push(sendResult(num + i));
  }

  return (await Promise.allSettled(results)).map((result) => {
    if (result.status === "fulfilled") {
      return { data: result.value, status: "resolved" };
    }
    return { data: null, status: "error" };
  });
};

console.log(await performCalculations());
