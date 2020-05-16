import {
  ServerRequest,
  Response,
} from "https://deno.land/std@v0.51.0/http/server.ts";

export type Options = {
  readonly port: number;
};

export enum Method {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
  option = "OPTION",
}

export type Route = {
  readonly method: Method;
  readonly path: string;
  readonly validation: Array<Validator>;
  readonly controller: Controller;
};

export type Validator = {};

export type Middleware = {};

interface Controller {
  response(req: MicroraptorRequest): void;
}

export class MicroraptorRequest {
  readonly request: ServerRequest;
  route: Route;
  query: any = {};
  param: any = {};
  cookie: any = {};

  constructor(
    req: ServerRequest,
    route: Route,
  ) {
    this.request = req;
    this.route = route;
    this.query = this.getQuery();
    this.param = this.getParam();
    this.cookie = this.getCookie();
  }

  private getQuery(): any {
    return {};
  }

  private getParam(): any {
    if (this.route.path.indexOf(":") !== -1) {
      const regex = new RegExp(
        this.route.path.replace(/:([a-zA-Z0-9_]*)/g, "([^\/]*)"),
      );
      const values: Array<string> = (regex.exec(this.request.url) ?? []).splice(
        1,
      );
      const keys: Array<string> = (regex.exec(this.route.path) ?? []).splice(
        1,
      ).map((item) => item.replace(":", ""));
      const data = keys.reduce((o, k, i) => ({ ...o, [k]: values[i] }), {});

      return data;
    }
    return {};
  }

  private getCookie(): any {
    return {};
  }
}
