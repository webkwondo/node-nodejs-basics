import { createGunzip } from 'zlib';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { stat, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { getDirName, join } from '../fs/getPath.js';

const __dirname = getDirName(import.meta.url);
const pipelinePromise = promisify(pipeline);

export const decompress = async () => {
  const folderName = 'files';
  const fileName = 'fileToCompress.txt';
  const filePath = join(__dirname, folderName, fileName);
  const archiveName = 'archive.gz';
  const archivePath = join(__dirname, folderName, archiveName);

  const doGunzip = async (input, output) => {
    const gunzip = createGunzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipelinePromise(source, gunzip, destination);
  };

  try {
    await stat(archivePath);
    await doGunzip(archivePath, filePath);
    await unlink(archivePath);
  } catch (error) {
    console.error('Operation failed:\r\n', error);
    process.exitCode = 1;
  }
};

decompress();
