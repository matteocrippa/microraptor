import { Method } from "./method.ts";
import { Validation } from "./validation.ts";
import { Controller } from "./controller.ts";

export type Route = {
  readonly method: Method;
  readonly path: string;
  readonly validation?: Validation;
  readonly controller: Controller;
};
