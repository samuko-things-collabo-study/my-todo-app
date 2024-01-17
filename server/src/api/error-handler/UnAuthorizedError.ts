import {CustomAPIError} from './CustomAPIError'

export default class UnAuthorizedError extends CustomAPIError {
  constructor(public message: string){
    super(message, 401);
  }
}