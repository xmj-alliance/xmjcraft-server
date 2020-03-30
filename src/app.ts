import { resolve } from 'path';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';
import { readFileSync } from 'fs';

import * as Koa from "koa";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";
import * as serve from 'koa-static';
import { parse } from 'yaml';
import RootGraph from './controllers/indexGraph';

class App {
  app = new Koa();
  port = 3000;              // env: KOA_PORT
  host = "127.0.0.1";       // env: KOA_HOST
  clientPath = resolve(__dirname, "./statics/client");
  configPath = resolve(__dirname, "./configs");
  server: Server;
  gqlServer = new RootGraph().server;

  loadConfig = () => {
    this.loadConfigMain();
    this.loadConfigSecrets();
  };

  loadConfigMain = () => {
    // load main config
    let configFileContent = "";
    try {
      configFileContent = readFileSync( resolve(`${this.configPath}/main.yaml`), "utf8");
      let config = parse(configFileContent);
      if (!config) {
        return;
      }

      // extract koa config
      if (config.koa) {
        if (config.koa.port) {process.env.KOA_PORT = config.koa.port}
        if (config.koa.host) {process.env.KOA_HOST = config.koa.host}
      }
      
    } catch (error) {
      console.warn(`Failed to load main config: \n ${error}`);
    }
  };

  loadConfigSecrets = () => {
    // load secrets config
    let configFileContent = "";
    try {
      configFileContent = readFileSync( resolve(`${this.configPath}/secrets.yaml`), "utf8");
      let config = parse(configFileContent);
      if (!config) {
        return;
      }

      // Load the secrets here ...
      
    } catch (error) {
      console.warn(`Failed to load secrets config: \n ${error}`);
    }
  };

  loadENV = () => {

    this.port = (process.env.KOA_PORT? process.env.KOA_PORT: this.port) as number;
    this.host = (process.env.KOA_HOST? process.env.KOA_HOST: this.host);

  };

  report = () => {
    const { address, port } = this.server.address() as AddressInfo;
    console.log(`🎧 xmjcraft is listening on http://${address}:${port}/`);
  };

  constructor() {
    
    this.app.use(logger());
    this.app.use(cors());
    this.app.use(serve(this.clientPath));

    // load config to env
    this.loadConfig();
    
    // load env
    this.loadENV();

    // activate graphQL endpoint
    this.gqlServer.applyMiddleware(
      {
        app: this.app,
        path: `/gql`
      }
    )

    // Listen
    this.server = createServer(this.app.callback())
      .listen(this.port, this.host, this.report)

  }
}

export default new App();