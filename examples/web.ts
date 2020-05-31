import {
  Microraptor,
  Method,
  MicroRequest,
} from "../microraptor.ts";
import { Validation, MicroValidator } from "../lib/types/validation.ts";
import {
  ValidatorType,
} from "https://deno.land/x/fossil/lib/validator.ts";
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
                body: req.body,
              },
            ),
          },
        );
      },
    },
    validation: new Validation(
      {
        param: [
          new MicroValidator(
            "country",
            ValidatorType.string,
            ["Italy", "italy"],
          ),
        ],
      },
    ),
  },
);

server.start();
