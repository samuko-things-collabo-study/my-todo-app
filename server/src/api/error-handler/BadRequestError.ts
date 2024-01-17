import {CustomAPIError} from './CustomAPIError'

export default class BadRequestError extends CustomAPIError {
  constructor(public message: string){
    super(message, 400);
  }
}