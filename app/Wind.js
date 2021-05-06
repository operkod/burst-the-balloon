class Wind {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth
    this.way = Math.floor(Math.random() * 2)
  }

  getParam(dx) {
    let power = 0
    if (this.way) {
      power = (this.canvasWidth - dx) / this.canvasWidth + 0.5
    } else {
      power = dx / this.canvasWidth + 0.5
    }
    return { power, way: this.way }
  }
}

export default Wind
