import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customError";

class AuthorizationError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = AuthorizationError;
