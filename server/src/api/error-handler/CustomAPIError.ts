
export class CustomAPIError extends Error {
  constructor(public message: string, public status: number) {
    super(message)
  }
}