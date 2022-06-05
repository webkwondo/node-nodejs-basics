import { getDirName, join } from '../fs/getPath.js';
import { createWriteStream } from 'fs';

const __dirname = getDirName(import.meta.url);

export const write = async () => {
  const folderName = 'files';
  const fileName = 'fileToWrite.txt';
  const filePath = join(__dirname, folderName, fileName);

  const writableStream = createWriteStream(filePath);
  process.stdin.pipe(writableStream);
};

write();
