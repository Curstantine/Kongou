export class ServerError extends Error {
  constructor (message: string, status: string | number) {
    super(`${message} [${status}]`)
    this.name = 'ServerError'
  }
}

export class InternalError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InternalError'
  }
}
