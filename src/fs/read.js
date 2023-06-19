import { getDirName, join } from './getPath.js';
import { readFile } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const filePath = join(__dirname, folderName, fileName);

  try {
    const contents = await readFile(filePath, { encoding: 'utf-8' });
    console.log(contents);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await read();
