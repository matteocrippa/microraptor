import { assertEquals } from "https://deno.land/std@0.54.0/testing/asserts.ts";
import { ServerRequest } from "https://deno.land/std@0.54.0/http/server.ts";
import { MicroRequest, Method } from "../lib/types/index.ts";

const dummyRequest = new ServerRequest();
dummyRequest.headers = new Headers();
dummyRequest.method = "GET";

Deno.test("Querystring", async () => {
  dummyRequest.url = "/?string=value&number=2";

  const processed = new MicroRequest(dummyRequest, {
    method: Method.get,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });
  await processed.process();

  assertEquals(processed.query.string, "value");
  assertEquals(processed.query.number, "2");
  assertEquals(processed.query.notexisting, undefined);
});

Deno.test("Cookies", async () => {
  dummyRequest.url = "/";

  const processed = new MicroRequest(dummyRequest, {
    method: Method.get,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });
  await processed.process();

  assertEquals(processed.cookie, {});
});

Deno.test("Params", async () => {
  dummyRequest.url = "/second";

  const processed = new MicroRequest(dummyRequest, {
    method: Method.get,
    path: "/:first",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });

  await processed.process();

  assertEquals(processed.param.first, "second");
});
