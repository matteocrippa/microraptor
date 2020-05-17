import { Microraptor, Method, MicroraptorRequest } from "../microraptor.ts";
const server = new Microraptor({ port: 3000 });

server.route(
  {
    method: Method.get,
    path: "/",
    validation: [],
    controller: {
      response: (req: MicroraptorRequest) => {
        req.request.respond({ body: "Hello Microraptor!" });
      },
    },
  },
);

server.route(
  {
    method: Method.get,
    path: "/:country/:city",
    validation: [],
    controller: {
      response: (req: MicroraptorRequest) => {
        req.request.respond(
          {
            body: JSON.stringify(
              {
                country: req.param.country,
                city: req.param.city,
                query: req.query,
              },
            ),
          },
        );
      },
    },
  },
);

server.start();
