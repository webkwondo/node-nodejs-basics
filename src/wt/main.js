import { Worker }  from 'worker_threads';
import { cpus } from 'os';
import { getDirName, join } from '../fs/getPath.js';

const __dirname = getDirName(import.meta.url);

export const performCalculations = async () => {
  const fileName = 'worker.js';
  const filePath = join(__dirname, fileName);
  const cpuCount = cpus().length;
  let number = 10;

  const createWorker = (data) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(filePath, {
        workerData: data
      });

      worker.on('message', (msg) => {
        if (typeof msg === 'number') {
          resolve({status: 'resolved', data: msg});
        } else {
          resolve({status: 'error', data: null});
        }
      });

      worker.on('error', (msg) => {
        reject({status: 'error', data: null});
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject({status: 'error', data: null});
        }
      });
    });
  };

  const promises = [];

  for (let i = 0; i < cpuCount; i++, number++) {
    promises.push(createWorker(number));
  }

  const results = (await Promise.allSettled(promises)).map((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }

    if (result.status === 'rejected') {
      return result.reason;
    }
  });

  return results;
};

const res = await performCalculations();
console.log(res);
