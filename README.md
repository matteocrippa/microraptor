# ![](https://raw.githubusercontent.com/matteocrippa/microraptor/master/.github/velociraptor.png) Microraptor

_Microraptor_ is a lightweight framework for easy routing on top of deno network lib.
Project is a work-in-progress and in _pre-alpha_.

## Install

Import _Microraptor_ in your project with just one line of code:

```ts
import { Microraptor } from "https://deno.land/x/microraptor/microraptor.ts";
```

## How to use (basic)

A basic example of usage is creating a new file named for example `web.ts`:

```ts
import { Microraptor, Method, MicroRequest } from "../microraptor.ts";
const server = new Microraptor({ port: 3000 });

server.route({
  method: Method.get,
  path: "/",
  controller: {
    response: (req: MicroRequest) => {
      req.request.respond({ body: "Hello Microraptor!" });
    },
  },
});

server.start();
```

Then in your terminal you can run:

```bash
$ deno run --allow-net web.ts
```

You can discover a bit more for now in `/examples` directory.

### Parameters

Parameters are easily accessible from `.param` variable of `MicroRequest`.

```ts
server.route(
  {
    method: Method.get,
    path: "/:name",
    controller: {
      response: (req: MicroRequest) => {
        req.request.respond({ body: `Hello ${req.params.name}` });
      },
    },
  },
);
```

### Querystring

Querystring are easily accessible from `.query` variable of `MicroRequest`.

```ts
server.route(
  {
    method: Method.get,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {
        req.request.respond({ body: `Hello ${req.query.name}` });
      },
    },
  },
);
```

### Body

Body is easily accessible from `.body` variable of `MicroRequest`.

```ts
server.route(
  {
    method: Method.post,
    path: "/",
    controller: {
      response: (req: MicroRequest) => {
        req.request.respond({ body: `Hello ${req.body.name}` });
      },
    },
  },
);
```

### Validation

Validation in _Microraptor_ is powered by [fossil](https://deno.land/x/fossil)/ a library that easily validate values and types.

A simple usage can be the following:

```ts
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
```

## Pending implementation

- [x] Querystring
- [x] Params
- [x] Cookie
- [ ] CORS
- [ ] Middleware
- [ ] Response type (text, json)
- [ ] AWS Lambda support
- [x] Test

### Credits

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)
