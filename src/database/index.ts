import { connect, Mongoose } from "mongoose";

import { loadENV } from "../lib";

interface DBInitOption {
  isAutoConnect: boolean
}

export default class Database {

  instance: Mongoose | null = null;

  private configMap = new Map([
    ["user", "root"],
    ["password", ""],
    ["host", "127.0.0.1:27017"],
    ["dbData", ""],
    ["dbAuth", "admin"],
  ])

  private envMap = new Map([
    ["user", "MONGO_USER"],
    ["password", "MONGO_PASSWD"],
    ["host", "MONGO_HOST"],
    ["dbData", "MONGO_DB_DATA"],
    ["dbAuth", "MONGO_DB_AUTH"],
  ])

  private uri = "";

  connect = async () => {

    try {

      console.log(`💿 Establishing connection to DB: ${ this.configMap.get("dbData") }@${ this.configMap.get("host") }...`);
      
      this.instance = await connect(this.uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });

      console.log(`📀 ${ this.configMap.get("dbData") }@${ this.configMap.get("host") } is now online `);
      
    } catch (error) {
      console.log(`😧 We are having trouble reaching ${ this.configMap.get("dbData") }@${ this.configMap.get("host") }: \n ${error.message}`);
    }



  };

  /**
   *
   */
  constructor(option?: DBInitOption) {
    
    // load config from env
    loadENV(this.configMap, this.envMap);

    // connect
    this.uri = `
      mongodb://${ this.configMap.get("user") }
      :${ this.configMap.get("password") }
      @${ this.configMap.get("host") }
      /${ this.configMap.get("dbData") }
      ?authSource=${ this.configMap.get("dbAuth") }
    `;
    // remove all white spaces
    this.uri = this.uri.replace(/\s+/g, '');


    if (option && option.isAutoConnect) {
      // connect to MongoDB
      this.connect();
    }
    
  }




}