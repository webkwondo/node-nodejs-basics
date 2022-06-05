import { getDirName, join } from './getPath.js';
import { writeFile } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const create = async () => {
  const folderName = 'files';
  const folderPath = join(__dirname, folderName);
  const fileName = 'fresh.txt';
  const filePath = join(folderPath, fileName);
  const data = 'I am fresh and young';

  try {
    await writeFile(filePath, data, { flag: 'wx' });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

create();
