import { getDirName, join } from './getPath.js';
import { rename as renameFile, stat } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const rename = async () => {
  const folderName = 'files';
  const initialFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const initialFilePath = join(__dirname, folderName, initialFileName);
  const destFilePath = join(__dirname, folderName, newFileName);
  let destFileExists = false;

  try {
    await stat(destFilePath);
    destFileExists = true;
    throw new Error('FS operation failed');
  } catch (error) {
    if (!destFileExists) {
      try {
        await renameFile(initialFilePath, destFilePath);
      } catch (e) {
        throw new Error('FS operation failed');
      }
    } else {
      throw new Error(error.message);
    }
  }
};

rename();
