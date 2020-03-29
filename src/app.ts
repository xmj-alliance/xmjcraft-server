import { resolve } from 'path';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';

import * as Koa from "koa";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";
import * as serve from 'koa-static';

class App {
  app = new Koa();
  port = 3000;
  host = "localhost";
  clientPath = resolve(__dirname, "./statics/client");
  server: Server;

  loadConfig = () => {

  };

  loadENV = () => {

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

    // load env

    // Listen
    this.server = createServer(this.app.callback())
      .listen(this.port, this.host, this.report)

  }
}

export default new App();