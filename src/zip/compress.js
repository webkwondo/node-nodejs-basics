import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { getDirName, join } from '../fs/getPath.js';

const __dirname = getDirName(import.meta.url);
const pipelinePromise = promisify(pipeline);

export const compress = async () => {
  const folderName = 'files';
  const fileName = 'fileToCompress.txt';
  const filePath = join(__dirname, folderName, fileName);
  const archiveName = 'archive.gz';
  const archivePath = join(__dirname, folderName, archiveName);

  const doGzip = async (input, output) => {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipelinePromise(source, gzip, destination);
  };

  try {
    await doGzip(filePath, archivePath);
    await unlink(filePath);
  } catch (error) {
    console.error('Operation failed: ', error);
    process.exitCode = 1;
  }
};

compress();
