import { IllegalArgumentException } from 'src/errors/IllegalArgumentException.js'
import { CanvasContextIsNullException } from 'src/errors/CanvasContextIsNull.js'
import type { CanvasDimensionsType } from '../types/canvasTypes.js'

export abstract class BaseChart {
  protected canvas: HTMLCanvasElement

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 500
    this.canvas.height = 500
    this.setCanvasBackgroundColor('white')
  }

  /**
   * Set dimensions of the diagram.
   *
   * @param {canvasDimensionsType} data dimensions to be set to the canvas.
   */
  private setCanvasDimensions(data: CanvasDimensionsType) {
    if (this._isValuesInBounds([ data.height, data.width ], 0)) {
      throw new IllegalArgumentException('Canvas dimensions needs to be non-zero positive integers.')
    }

    this.canvas.width = data.width
    this.canvas.height = data.height
  }

  /**
   * Set background color of the diagram.
   *
   * @param {string} color color to be set to the canvas background.
   */
  private setCanvasBackgroundColor(color: string) {
    const validatedColor = this._validateOrFallbackColor(color)
    
    const canvasContext = this.getCanvasContext()

    canvasContext.fillStyle = validatedColor
    canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  protected setupCanvas(data) {
    if (data.backgroundColor) {
      this.setCanvasBackgroundColor(data.backgroundColor)
    }

    // TODO: Fix so that both are checked separatly.
    if (data.canvasDimensions.height || data.canvasDimensions.width) {
      this.setCanvasDimensions(data.canvasDimensions)
    }
  }

  protected getCanvasContext(): CanvasRenderingContext2D {
    const canvasContext = this.canvas.getContext('2d')

    if (!canvasContext) {
      throw new CanvasContextIsNullException()
    }

    return canvasContext
  }

  protected clearCanvas(): void {
    const canvasContext = this.getCanvasContext()

    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private _validateOrFallbackColor(color: string) {
    if (typeof color === 'string' && this._isValidColor(color)) {
      return color
    }

    console.warn(`Invalid color ${color} provided. Falling back to default "white".`)
    return 'white'
  }

  private _isValidColor(color: string) {
    const s = new Option().style
    s.color = color
    return s.color !== ''
  }

  private _isValuesInBounds(inputValues: number[], lowerLimit = -Infinity, upperLimit = Infinity): boolean {
    for (const value of inputValues) {
      if (!Number.isFinite(value) || (value < lowerLimit || value > upperLimit)) {
        return false
      }
    }

    return true
  }
}