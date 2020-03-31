import { loadENV } from "../lib";

export default class Database {

  private configMap = new Map([
    ["user", "root"],
    ["password", ""],
    ["host", "127.0.0.1:27017"],
    ["colData", ""],
    ["colAuth", "admin"],
  ])

  private envMap = new Map([
    ["user", "MONGO_USER"],
    ["password", "MONGO_PASSWD"],
    ["host", "MONGO_HOST"],
    ["colData", "MONGO_COL_DATA"],
    ["colAuth", "MONGO_COL_AUTH"],
  ])

  private uri = "";

  /**
   *
   */
  constructor() {
    
    // load config from env
    loadENV(this.configMap, this.envMap);

    // connect
    this.uri = `
      mongodb://${ this.configMap.get("user") }
      :${ this.configMap.get("password") }
      @${ this.configMap.get("host") }
      /${ this.configMap.get("colData") }
      ?authSource=${ this.configMap.get("colAuth") }
    `;
    // remove all white spaces
    this.uri = this.uri.replace(/\s+/g, '');
    console.log(this.uri);
    
    
  }




}