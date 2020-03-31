import { Dirent, readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "yaml";
import { getNestedObject } from "./lib";

interface AppConfig {
  [index: string]: any,
  koa: {
    host: string,
    port: number,
  }
}

export default class Config {

  private configPath = resolve(__dirname, "./configs");

  private configMap = new Map([
    ["KOA_HOST", "koa.host"],
    ["KOA_PORT", "koa.port"],
    ["MONGO_USER", "mongo.user"],
    ["MONGO_PASSWD", "mongo.password"],
    ["MONGO_HOST", "mongo.host"],
    ["MONGO_DB_DATA", "mongo.db.data"],
    ["MONGO_DB_AUTH", "mongo.db.auth"],
  ]);

  private loadConfig = () => {

    let configs: AppConfig[] = [];

    // get file list from configs folder (as {})
    
    let dirEntries: Dirent[];
    let fileNames: string[] = [];
    try {
      dirEntries = readdirSync(this.configPath, { withFileTypes: true });
      fileNames = dirEntries.filter(dirent => dirent.isFile())
                            .map(dirent => dirent.name);

    } catch (error) {
      console.warn(`Error locating configs folder. \n${error}`);
      return {} as AppConfig;
    }

    // read content from each file and store in an array
    for (let file of fileNames) {
      let configFileContent = ""; 
      try {
        configFileContent = readFileSync( resolve(`${this.configPath}/${file}`), "utf8");
      } catch (error) {
        console.warn(`Error loading config: ${file}`);
      }
      let config = parse(configFileContent);
      if (!config) {
        continue;
      }
      configs.push(config);
    }

    // TODO: priorities

    // combine configs to a single object
    // TODO: recursively
    let appConfig = configs.reduce((total, current) => {
      let mergedConfig = {
        ...total,
        ...current
      };
      for (let key in mergedConfig) {

        if (mergedConfig[key] instanceof Array) {
          mergedConfig[key] = [
            ...total[key],
            ...current[key]
          ];
        } else if (typeof mergedConfig[key] === "object") {
          mergedConfig[key] = {
            ...total[key],
            ...current[key]
          }
        }
      }
      return mergedConfig;
    });

    return appConfig;
  };

  private applyConfig = (appConfig: AppConfig) => {
    // apply config to env
    for (let configEntry of this.configMap) {

      let envName = configEntry[0];

      let valueToSet = getNestedObject(appConfig, configEntry[1].split("."));

      if (valueToSet) {
        process.env[envName] = valueToSet;
      }

    }

  };

  /**
   *
   */
  constructor(configOverride?: AppConfig) {
    let appConfig = this.loadConfig();

    if (configOverride) {

      // TODO: config override

      // for (let key in configOverride) {
      //   let valueToSet = getNestedObject(configOverride, key.split("."));

      // }
      
    }
    this.applyConfig(appConfig);
  }

}