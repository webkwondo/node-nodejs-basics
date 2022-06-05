import { getDirName, join } from '../fs/getPath.js';
import { open } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const filePath = join(__dirname, folderName, fileName);

  const fd = await open(filePath);
  const readableStream = fd.createReadStream();
  readableStream.pipe(process.stdout);
};

read();
