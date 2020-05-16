# Microraptor

_Microraptor_ is a lightweight framework for easy routing on top of deno network lib.
Project is a work-in-progress and in _pre-alpha_.

## Install

Import your _Microraptor_ in your project with just one line of code:

```ts
import { Microraptor } from "https://deno.land/x/microraptor/microraptor.ts";
```

## How to use (basic)

A basic example of usage is creating a new file named for example `web.ts`:

```ts
import {
  Microraptor,
  Method,
  MicroraptorRequest,
} from "https://deno.land/x/microraptor/";

const server = new Microraptor({ port: 3000 });

server.route({
  method: Method.get,
  path: "/",
  validation: [],
  controller: {
    response: (req: MicroraptorRequest) => {
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

You can discover a bit more for now in `/test` directory.

### Todo

- [ ] Middleware
- [ ] Cookie
- [ ] Querystring
- [ ] Validation
