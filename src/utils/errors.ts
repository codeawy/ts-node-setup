export class HttpError extends Error {
  statusCode: number;
  errors?: any;

  constructor(statusCode: number, name: string, message: string, errors?: any) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.errors = errors;

    // TODO: write the stack!
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", errors?: any) {
    super(400, "BadRequestError", message, errors);
  }
}
