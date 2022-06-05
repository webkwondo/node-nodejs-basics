import { getDirName, join } from './getPath.js';
import { copyFile, mkdir, readdir } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const copy = async () => {
  const sourceDirName = 'files';
  const sourceDirPath = join(__dirname, sourceDirName);
  const destDirName = sourceDirName + '_copy';
  const destDirPath = join(__dirname, destDirName);

  const createDir = async (dirPath) => {
    try {
      await mkdir(dirPath);
    } catch (error) {
      throw new Error('FS operation failed');
    }
  };

  const copyDir = async (srcDirPath, destDirPath) => {
    let direntsArr = [];

    try {
      direntsArr = await readdir(srcDirPath, { withFileTypes: true });
      await createDir(destDirPath);
    } catch (error) {
      throw new Error('FS operation failed');
    }

    const arr = [];

    if (!direntsArr.length) {
      return arr;
    }

    for (const entry of direntsArr) {
      const srcPath = join(srcDirPath, entry.name);
      const destPath = join(destDirPath, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        arr.push(destPath);
        await copyFile(srcPath, destPath);
      }
    }

    return arr;
  };

  copyDir(sourceDirPath, destDirPath);
    // .catch((e) => console.error(e));
};

copy();
