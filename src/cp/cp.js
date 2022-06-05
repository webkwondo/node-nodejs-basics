import { spawn } from 'child_process';
import { getDirName, join } from '../fs/getPath.js';

const __dirname = getDirName(import.meta.url);

export const spawnChildProcess = async (args) => {
  const folderName = 'files';
  const fileName = 'script.js';
  const filePath = join(__dirname, folderName, fileName);

  const child = spawn('node', [filePath, ...args]);

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
};

spawnChildProcess(['a1', 'a2', 'a3']);
