export class HttpError extends Error {
  status: boolean;

  constructor(status: boolean, message?: string) {
    super(message);
    this.status = status;
  }
}
