import {
  serve,
  Server,
} from "https://deno.land/std@v0.51.0/http/server.ts";
import {
  Options,
  Route,
  Middleware,
  Method,
  MicroraptorRequest,
} from "./lib/types.ts";

export class Microraptor {
  private readonly server: Server;
  private options: Options = { port: 3000 };
  private routes: Array<Route> = [];
  private middlewares: Array<Middleware> = [];

  constructor(options: Options) {
    this.options = options || this.options;
    this.server = serve({ port: options.port });
  }

  start() {
    this.listener();
  }

  route(r: Route) {
    this.routes.push(r);
  }

  middleware(m: Middleware) {
    this.middlewares.push(m);
  }

  private async listener() {
    for await (const request of this.server) {
      const route = this.routes.find((route: Route) => {
        // FIXME: consider remove trailing slash at the end

        if (route.method !== request.method) {
          return false;
        }

        if (route.path.indexOf(":") !== -1) {
          const regex = new RegExp(
            route.path.replace(/:([a-zA-Z0-9_]*)/g, "([^\/]*)"),
          );
          const values: Array<string> = (regex.exec(request.url) ?? []).splice(
            1,
          );
          const keys: Array<string> = (regex.exec(route.path) ?? []).splice(
            1,
          ).map((item) => item.replace(":", ""));
          const data = keys.reduce((o, k, i) => ({ ...o, [k]: values[i] }), {});

          let check = route.path;
          keys.forEach((value, key) =>
            check = check.replace(`:${value}`, values[key])
          );
          return check === request.url;
        }

        return route.path === request.url;
      });
      if (route) {
        const requestEnanched: MicroraptorRequest = new MicroraptorRequest(
          request,
          route,
        );
        // TODO: check validation first
        route.controller.response(requestEnanched);
      } else {
        request.respond(
          {
            body: JSON.stringify({ status: 404, error: "Url not found" }),
            status: 404,
          },
        );
      }
    }
  }
}

export { Route, Options, Middleware, Method, MicroraptorRequest };
