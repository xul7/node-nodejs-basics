import { Worker, isMainThread, parentPort } from "worker_threads";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// n should be received from main thread
export const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (n) => {
  // This function sends result of nthFibonacci computations to main thread
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      const worker = new Worker(__filename);
      worker.postMessage(n);
      worker.on("message", resolve);
      worker.on("error", reject);
    } else {
      parentPort.on("message", (data) => {
        parentPort.postMessage(nthFibonacci(data));
      });
    }
  });
};

console.log("result from worker is", await sendResult(10));
