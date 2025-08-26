/**
 * User-caused errors
 * Can be displayed directly to the user.
 */
export class UserError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

/**
 * Unexpected server error
 * Only display generic message to user
 */
export class ServerError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}
