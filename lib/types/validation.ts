import {
  Validator,
  Valid,
  ValidatorType,
  ValidatorFunction,
} from "https://deno.land/x/fossil/fossil.ts";
import { MicroRequest } from "./microrequest.ts";

export class MicroValidator extends Validator {
  key: string;

  constructor(
    key: string,
    type: ValidatorType,
    allowed: Array<unknown>,
    func?: ValidatorFunction,
  ) {
    super(null, type, allowed, func);
    this.key = key;
  }
}

interface Validable {
  body?: Array<MicroValidator>;
  param?: Array<MicroValidator>;
  query?: Array<MicroValidator>;
  cookie?: Array<MicroValidator>;
}

export class Validation {
  readonly body: Array<MicroValidator>;
  readonly param: Array<MicroValidator>;
  readonly query: Array<MicroValidator>;
  readonly cookie: Array<MicroValidator>;

  constructor(data: Validable) {
    this.body = data.body ?? [];
    this.param = data.param ?? [];
    this.query = data.query ?? [];
    this.cookie = data.cookie ?? [];
  }

  validate(request: MicroRequest): Valid {
    this.body.forEach((v) => {
      const result = v.isValid(request.body[v.key]);
      if (result !== true) {
        return result;
      }
    });

    this.param.forEach((v) => {
      console.log(v.key);
      console.log(request.param[v.key]);
      const result = v.isValid(request.param[v.key]);
      console.log(result);
      if (result !== true) {
        return result;
      }
    });

    this.query.forEach((v) => {
      const result = v.isValid(request.query[v.key]);
      if (result !== true) {
        return result;
      }
    });

    this.cookie.forEach((v) => {
      const result = v.isValid(request.cookie[v.key]);
      if (result !== true) {
        return result;
      }
    });

    return true;
  }
}
