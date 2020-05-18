import {
  ServerRequest,
} from "https://deno.land/std@v0.51.0/http/server.ts";
import { Route } from "./route.ts";

export class MicroRequest {
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

  private getQuery(): object {
    if (this.request.url.indexOf("?") !== -1) {
      const requestParams: Array<string> =
        (this.request.url.split("?")[1] ?? "").split("&");

      return requestParams.reduce((queries: object, query: string): object => {
        if (!query) {
          return queries;
        }
        const items = query.split("=");
        return {
          ...queries,
          [items?.[0]]: items?.[1],
        };
      }, {}) || {};
    }
    return {};
  }

  private getParam(): object {
    if (this.route.path.indexOf(":") !== -1) {
      const sanitized = (this.request.url.split("?")?.[0] ?? "");

      const regex = new RegExp(
        this.route.path.replace(/:([a-zA-Z0-9_]*)/g, "([^\/]*)"),
      );
      const values: Array<string> = (regex.exec(sanitized) ?? []).splice(
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

  private getCookie(): object {
    const cookies = this.request.headers?.get("cookie");
    return cookies?.split(";").reduce((prev: any, cookie: string) => {
      const parts = cookie.match(/(.*?)=(.*)$/);
      if (parts && parts.length > 1) {
        const key = parts[1].trim();
        const value = parts[2].trim();
        return {
          ...prev,
          [key]: value,
        };
      }
      return {
        ...prev,
      };
    }, {}) || {};
  }
}
