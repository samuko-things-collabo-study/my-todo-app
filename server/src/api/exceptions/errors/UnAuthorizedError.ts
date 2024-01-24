import { CustomError, HttpCode } from "../CustomError";

export class UnAuthorizedError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.UNAUTHORIZED)
  }
}