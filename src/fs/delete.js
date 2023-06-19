import { getDirName, join } from './getPath.js';
import { unlink } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const remove = async () => {
  const folderName = 'files';
  const fileName = 'fileToRemove.txt';
  const filePath = join(__dirname, folderName, fileName);

  try {
    await unlink(filePath);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await remove();
