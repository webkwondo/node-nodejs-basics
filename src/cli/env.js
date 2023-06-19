export const parseEnv = () => {
  const envObj = process.env;
  let result = '';

  for (const [key, value] of Object.entries(envObj)) {
    if (key.startsWith('RSS_')) {
      const str = key + '=' + value;
      result = (result) ? result + '; ' + str : result + str;
    }
  }

  if (result) {
    console.log(result);
  }
};

parseEnv();
