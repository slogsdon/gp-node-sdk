// tslint:disable:max-classes-per-file

export class ApiError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = this.constructor.name;
  }
}

export class ArgumentError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, ArgumentError.prototype);
    this.name = this.constructor.name;
  }
}

export class GatewayError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, GatewayError.prototype);
    this.name = this.constructor.name;
  }
}

export class NotImplementedError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, NotImplementedError.prototype);
    this.name = this.constructor.name;
  }
}

export class UnsupportedTransactionError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, UnsupportedTransactionError.prototype);
    this.name = this.constructor.name;
  }
}
