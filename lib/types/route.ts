import { Method } from "./method.ts";
import { Controller } from "./controller.ts";
import { Validation } from "./validation.ts";

export type Route = {
  readonly method: Method;
  readonly path: string;
  readonly controller: Controller;
  readonly validation?: Validation;
};
