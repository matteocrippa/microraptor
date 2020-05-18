import { Microraptor, Method, MicroRequest } from "../microraptor.ts";
const server = new Microraptor({ port: 3000 });

server.route(
  {
    method: Method.get,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {
        req.request.respond({ body: "Hello Microraptor!" });
      },
    },
  },
);

server.route(
  {
    method: Method.get,
    path: "/:country/:city",
    controller: {
      response: (req: MicroRequest) => {
        req.request.respond(
          {
            body: JSON.stringify(
              {
                param: req.param,
                query: req.query,
                cookie: req.cookie,
              },
            ),
          },
        );
      },
    },
  },
);

server.start();
