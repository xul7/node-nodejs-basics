import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// n should be received from main thread
export const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (n) => {
  // This function sends result of nthFibonacci computations to main thread
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      const worker = new Worker(__filename, {
        workerData: n,
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    } else {
      const number = workerData;
      parentPort.postMessage(nthFibonacci(number));
    }
  });
};

console.log("result from worker is", await sendResult(10));
