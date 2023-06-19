import { parentPort, workerData }  from 'worker_threads';

const number = workerData;

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
  const result = nthFibonacci(number);
  parentPort.postMessage(result);
};

sendResult();
