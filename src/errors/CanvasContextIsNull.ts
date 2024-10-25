export class CanvasContextIsNullException extends Error {
  constructor () {
    super('The canvas context could not be retrieved.')
    this.name = 'CanvasContextIsNullException'
  }
}