import { MicroRequest } from "./microrequest.ts";

export interface Controller {
  response(req: MicroRequest): void;
}
