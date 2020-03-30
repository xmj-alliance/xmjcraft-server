import * as Router from "@koa/router";

export default class APIRoute {
  router = new Router();

  /**
   *
   */
  constructor() {
    
    this.router.get("/", async (ctx) => {
      ctx.status = 200;
      ctx.body = {
        ok: true,
        messsage: "API works!",
      }
    });
    
  }

}