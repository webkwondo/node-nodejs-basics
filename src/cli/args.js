export const parseArgs = () => {
  const args = process.argv.slice(2);
  let result = '';

  for (let i = 0; i < args.length; i++) {
    const propName = args[i];
    let val = args[i + 1];
    if (propName.startsWith('--') && val && !val.startsWith('--')) {
      const str = propName + ' is ' + val;
      result = (result) ? result + ', ' + str : result + str;
    }
  }

  if (result) {
    console.log(result);
  }
};

parseArgs();
