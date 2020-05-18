import { MicroRequest } from "./microrequest.ts";

export enum Type {
  string,
  number,
  alphanumeric,
  email,
}

export namespace Type {
  export function custom(validator: (input: any) => boolean) {}
}

export class Validator {
  readonly name: string;
  readonly optional: boolean;
  readonly type: Type;
  constructor(name: string, type: Type, optional: boolean = true) {
    this.name = name;
    this.optional = optional;
    this.type = type;
  }
}

export class Validation {
  readonly request: MicroRequest;
  readonly body: Array<Validator>;
  readonly param: Array<Validator>;
  readonly cookie: Array<Validator>;
  readonly query: Array<Validator>;
  readonly header: Array<Validator>;

  constructor(
    request: MicroRequest,
    body?: Array<Validator>,
    param?: Array<Validator>,
    cookie?: Array<Validator>,
    query?: Array<Validator>,
    header?: Array<Validator>,
  ) {
    this.request = request;
    this.body = body ?? [];
    this.param = param ?? [];
    this.cookie = cookie ?? [];
    this.query = query ?? [];
    this.header = header ?? [];
  }

  validate(): Array<Type> {
    let validate: Array<Type> = [];

    this.body.forEach((item) => {
    });

    this.param.forEach((item) => {
    });

    this.cookie.forEach((item) => {
    });

    this.query.forEach((item) => {
    });

    this.header.forEach((item) => {
    });

    return validate;
  }

  private isString(input: any): boolean {
    return (Object.prototype.toString.call(input) === "[object String]");
  }

  private isNumber(input: any): boolean {
    return !(input instanceof Array) && (input - parseFloat(input) + 1) >= 0;
  }

  private isEmail(input: any): boolean {
    const casted = input as unknown as string;
    const re = /\S+@\S+\.\S+/;
    return re.test(casted);
  }

  private isAlphanumeric(input: any): boolean {
    const casted = input as unknown as string;
    const re = /^\w+$/;
    return re.test(casted);
  }
}
