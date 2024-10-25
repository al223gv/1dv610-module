import { IllegalArgumentException } from 'src/errors/IllegalArgumentException.js'
import { CanvasContextIsNullException } from 'src/errors/CanvasContextIsNull.js'
import type { CanvasDataType, CanvasDimensionsType } from '../types/canvasTypes.js'

export class GenerateDiagrams {
  #canvas: HTMLCanvasElement

  constructor(data: CanvasDataType) {
    this.#canvas = document.createElement('canvas')
    this.#canvas.width = data.canvasDimensions.width || 500
    this.#canvas.height = data.canvasDimensions.height || 500
    this.setCanvasBackgroundColor(data.backgroundColor || 'white')
  }

  /**
   * Set dimensions of the diagram.
   *
   * @param {canvasDimensionsType} data dimensions to be set to the canvas.
   */
  setCanvasDimensions(data: CanvasDimensionsType) {
    if (this.#isValuesInBounds([ data.height, data.width ], 0)) {
      throw new IllegalArgumentException(
        'Canvas dimensions height and width needs to be a non-zero positive integer.'
      )
    }

    this.#canvas.width = data.width
    this.#canvas.height = data.height
  }

  /**
   * Set background color of the diagram.
   *
   * @param {string} color color to be set to the canvas background.
   */
  setCanvasBackgroundColor(color: string) {
    const validatedColor = this.#validateOrFallbackColor(color)
    
    const canvasContext = this.#getCanvasContext()

    canvasContext.fillStyle = validatedColor
    canvasContext.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  #getCanvasContext(): CanvasRenderingContext2D {
    const canvasContext = this.#canvas.getContext('2d')

    if (!canvasContext) {
      throw new CanvasContextIsNullException()
    }

    return canvasContext
  }

  #validateOrFallbackColor(color: string) {
    if (typeof color === 'string' && this.#isValidColor(color)) {
      return color
    }

    console.warn(`Invalid color ${color} provided. Falling back to default "white".`)
    return 'white'
  }

  #isValidColor(color: string) {
    const s = new Option().style
    s.color = color
    return s.color !== ''
  }

  #isValuesInBounds(inputValues: number[], lowerLimit = -Infinity, upperLimit = Infinity): boolean {
    for (const value of inputValues) {
      if (!Number.isFinite(value) || (value < lowerLimit || value > upperLimit)) {
        return false
      }
    }

    return true
  }
}