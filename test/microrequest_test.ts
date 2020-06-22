import { assertEquals } from "https://deno.land/std@0.58.0/testing/asserts.ts";
import { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";
import { MicroRequest, Method } from "../lib/types/index.ts";
import { BufReader, BufWriter } from "https://deno.land/std@0.58.0/io/bufio.ts";
import { encode } from "https://deno.land/std@v0.58.0/encoding/utf8.ts";

const { Buffer, test } = Deno;

const testRequest = new ServerRequest();
testRequest.headers = new Headers();
testRequest.method = "GET";

test("Querystring", async () => {
  testRequest.url = "/?string=value&number=2";

  const processed = new MicroRequest(testRequest, {
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

test("Cookies", async () => {
  testRequest.url = "/";

  const processed = new MicroRequest(testRequest, {
    method: Method.get,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });
  await processed.process();

  assertEquals(processed.cookie, {});
});

test("Params", async () => {
  testRequest.url = "/second";

  const processed = new MicroRequest(testRequest, {
    method: Method.get,
    path: "/:first",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });

  await processed.process();

  assertEquals(processed.param.first, "second");
});

test("Body", async () => {
  const testRequest = new ServerRequest();
  testRequest.url = "/third";
  testRequest.method = "POST";

  const payload = { second: "third" };
  const json = JSON.stringify(payload);
  const encoded = encode(json);
  const buf = new Buffer(encoded);
  testRequest.headers = new Headers();
  testRequest.r = new BufReader(buf);

  const processed = new MicroRequest(testRequest, {
    method: Method.post,
    path: "/third",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });

  await processed.process();

  assertEquals(processed.body.second, "third");
});
