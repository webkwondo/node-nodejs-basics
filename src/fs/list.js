import { getDirName, join } from './getPath.js';
import { readdir } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const list = async () => {
  const folderName = 'files';
  const dirPath = join(__dirname, folderName);

  let direntsArr = [];

  try {
    direntsArr = await readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    throw new Error('FS operation failed');
  }

  const paths = direntsArr.map((dirent) => {
    if (dirent.isFile()) {
      return dirent.name;
    }

    return null;
  }).filter((i) => i);

  console.log(paths);
};

await list();
