class Ball {
  constructor(ctx, range) {
    this.MAX_RADIUS = 30
    this.MIN_RADIUS = 8
    this.MAX_SPEED = 100
    this.MIN_SPEED = 30
    this.BRIGHTNESS = 100
    this.ctx = ctx
    this.canvasRange = range
    this.init()
  }

  init() {
    this.r = this.MIN_RADIUS + Math.random() * (this.MAX_RADIUS - this.MIN_RADIUS)
    this.speed = this.MIN_SPEED + Math.random() * (this.MAX_SPEED - this.MIN_SPEED)
    this.x = this.r + Math.random() * (this.canvasRange.w - 2 * this.r)
    this.y = this.canvasRange.h + 2 * this.r
    this.color = this.randomColor
    this.angle = Math.PI / 30 + (Math.random() * Math.PI) / 5
  }

  draw(oneDrawPart, windParam, speedBoost = 1) {
    this.calculateCords(oneDrawPart, windParam, speedBoost)
    this.drawShadow()
    this.drawBall()
    this.bottomCord = this.y + this.r
  }

  calculateCords(oneDrawPart, windParam, speedBoost) {
    const ratio = windParam.power ** 3 * oneDrawPart * this.speed
    if (windParam.way) {
      this.x = Math.min(this.x + ratio * Math.sin(this.angle), this.canvasRange.w - this.r)
    } else {
      this.x = Math.max(this.x - ratio * Math.sin(this.angle), this.r)
    }
    this.y -= oneDrawPart * this.speed * Math.cos(this.angle) * speedBoost
  }

  drawBall() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    this.ctx.stroke()
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  drawShadow() {
    this.ctx.beginPath()
    this.ctx.arc(this.x + 3, this.y + 3, this.r, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fill()
  }

  get randomColor() {
    function randomChannel(brightness) {
      const r = 255 - brightness
      const n = 0 | (Math.random() * r + brightness)
      const s = n.toString(16)
      return s.length == 1 ? '0' + s : s
    }
    return (
      '#' +
      randomChannel(this.BRIGHTNESS) +
      randomChannel(this.BRIGHTNESS) +
      randomChannel(this.BRIGHTNESS)
    )
  }
}

export default Ball
