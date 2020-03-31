export const loadENV = (configMap: Map<string, any>, envMap: Map<string, string>) => {

  for (let config of configMap) {

    // 0: key; 1: value
    let envName = envMap.get(config[0]);
    if (!envName) {
      continue;
    }

    let envValue = process.env[envName];

    if (envValue) {
      configMap.set(config[0], envValue);
    }

  }
};

export const getNestedObject = (nestedObj: any, pathArr: string[]) => {
  return pathArr.reduce((obj, key) =>
      (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}