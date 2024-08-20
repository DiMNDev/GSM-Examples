import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customError";

class BadRequest extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
