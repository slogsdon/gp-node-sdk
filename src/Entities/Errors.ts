// tslint:disable:max-classes-per-file

export class ApiError extends Error {
}

export class ArgumentError extends ApiError {
}

export class GatewayError extends ApiError {
}

export class NotImplementedError extends ApiError {
}
