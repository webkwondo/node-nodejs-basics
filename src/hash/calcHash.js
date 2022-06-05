import { createHash } from 'crypto';
import { getDirName, join } from '../fs/getPath.js';
import { readFile } from 'fs/promises';

const __dirname = getDirName(import.meta.url);

export const calculateHash = async () => {
  const folderName = 'files';
  const fileName = 'fileToCalculateHashFor.txt';
  const filePath = join(__dirname, folderName, fileName);

  const fileBuffer = await readFile(filePath);
  const hash = createHash('sha256');
  hash.update(fileBuffer);

  const hex = hash.digest('hex');

  console.log(hex);

  return hex;
};

calculateHash();
