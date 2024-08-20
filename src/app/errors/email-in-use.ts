import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customError";

class EmailInUse extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default EmailInUse;
