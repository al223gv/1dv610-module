import { CanvasDataType } from "src/types/canvasTypes.js";
import { BaseChart } from "./BaseChart.js";

export class BarChart extends BaseChart {
  public create(data: CanvasDataType) {
    this.clearCanvas()

    this.setupCanvas()

    this._draw()
  }

  private _draw() {
    const numberOfBars = this._calculateNumberOfBars()

    this._drawBar()
  }

  private _calculateNumberOfBars(): number {
    return 0
  }

  private _drawBar() {}
}