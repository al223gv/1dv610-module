export class IllegalArgumentException extends Error {
  constructor (exceptionMessage: string) {
    super(exceptionMessage)
    this.name = 'IllegalArgumentException'
  }
}