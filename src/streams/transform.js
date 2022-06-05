import { Transform } from 'stream';

export const transform = async () => {
  const reverseTr = new Transform({
    transform(chunk, encoding, callback) {
      let str = chunk.toString().split('').reverse().join('');
      if (str.startsWith('\r\n') || str.startsWith('\n')) {
        str = str.slice(1);
      }
      this.push(str + '\r\n');
      callback();
    }
  });

  process.stdin.pipe(reverseTr).pipe(process.stdout);
};

transform();
