import { assertEquals } from "https://deno.land/std@0.50.0/testing/asserts.ts";
import { ServerRequest } from "https://deno.land/std@v0.51.0/http/server.ts";
import { MicroRequest, Method } from "../lib/types/index.ts";

Deno.test("Querystring / Strict implementation", () => {
  const dummyRequest = new ServerRequest();
  dummyRequest.method = "GET";
  dummyRequest.url = "/?string=value&number=2";

  const processed = new MicroRequest(dummyRequest, {
    method: Method.get,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {},
    },
  });

  assertEquals(processed.query.string, "value");
  assertEquals(processed.query.number, "2");
  assertEquals(processed.query.notexisting, undefined);
});

// Deno.test("Querystring / Mispelled implementation", () => {
//   const dummyRequest = new ServerRequest();
//   dummyRequest.method = "GET";
//   dummyRequest.url = "/&string=value&number=2";

//   const processed = new MicroRequest(dummyRequest, {
//     method: Method.get,
//     path: "/",
//     controller: {
//       response: (req: MicroRequest) => {},
//     },
//   });

//   assertEquals(processed.query.string, "value");
//   assertEquals(processed.query.number, 2);
//   assertEquals(processed.query.notexisting, undefined);
// });
