import {CustomAPIError} from './CustomAPIError'

export default class NotFoundError extends CustomAPIError {
  constructor(public message: string){
    super(message, 404);
  }
}