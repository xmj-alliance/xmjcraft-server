import { resolve } from 'path';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';

import * as Koa from "koa";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";
import * as serve from 'koa-static';
import * as Router from "@koa/router";

import RootGraph from './controllers/indexGraph';
import APIRoute from './controllers/apiRoute';
import Database from './database';
import Config from './config';
import { loadENV } from './lib';

class App {
  private app = new Koa();
  private clientPath = resolve(__dirname, "./statics/client");
  private server: Server;
  private gqlServer = new RootGraph().server;
  private router = new Router();

  private configMap = new Map<string, any>([
    ["host", "127.0.0.1"],
    ["port", 3000],
  ]);

  private envMap = new Map([
    ["host", "KOA_HOST"],
    ["port", "KOA_PORT"],
  ]);

  private report = () => {
    const { address, port } = this.server.address() as AddressInfo;
    console.log(`🎧 xmjcraft is listening on http://${address}:${port}/`);
  };

  constructor() {
    
    this.app.use(logger());
    this.app.use(cors());
    this.app.use(serve(this.clientPath));

    // init env
    new Config();

    // load env
    loadENV(this.configMap, this.envMap);

    // connect to database
    new Database({isAutoConnect: true});

    // activate graphQL endpoint
    this.gqlServer.applyMiddleware(
      {
        app: this.app,
        path: `/gql`
      }
    )

    // activate readiness probe endpoint
    let apiRoute = new APIRoute().router;
    this.router.use("/api", apiRoute.routes(), apiRoute.allowedMethods());
    this.app.use(this.router.routes())
            .use(this.router.allowedMethods());

    // Listen
    this.server = createServer(this.app.callback())
      .listen(
        this.configMap.get("port"),
        this.configMap.get("host"),
        this.report
      )

  }
}

export default new App();