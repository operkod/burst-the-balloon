class Needle {
  constructor(ctx, range) {
    this.WIDTH = 10
    this.HEIGHT = 40
    this.canvasRange = range
    this.ctx = ctx
    this.init()
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  init() {
    this.a = [this.canvasRange.w / 2 - this.WIDTH / 2, 0]
    this.b = [this.canvasRange.w / 2 + this.WIDTH / 2, 0]
    this.c = [this.canvasRange.w / 2, this.HEIGHT]
    this.speed = 500
  }

  draw(oneDrawPart = 0) {
    this.changeCords(oneDrawPart)
    this.tipCord = {
      x: this.c[0],
      y: this.c[1]
    }
    this.ctx.beginPath()
    this.ctx.moveTo(...this.a)
    this.ctx.lineTo(...this.b)
    this.ctx.lineTo(...this.c)
    this.ctx.fillStyle = '#3d405b'
    this.ctx.fill()
  }

  changeCords(oneDrawPart) {
    if (this.leftKey) {
      this.a[0] = Math.max(0, this.a[0] - oneDrawPart * this.speed)
      this.b[0] = Math.max(this.WIDTH, this.b[0] - oneDrawPart * this.speed)
      this.c[0] = Math.max(this.WIDTH / 2, this.c[0] - oneDrawPart * this.speed)
    }
    if (this.rightKey) {
      this.a[0] = Math.min(this.canvasRange.w - this.WIDTH, this.a[0] + oneDrawPart * this.speed)
      this.b[0] = Math.min(this.canvasRange.w, this.b[0] + oneDrawPart * this.speed)
      this.c[0] = Math.min(
        this.canvasRange.w - this.WIDTH / 2,
        this.c[0] + oneDrawPart * this.speed
      )
    }
  }

  onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      this.leftKey = true
    }
    if (event.key === 'ArrowRight') {
      this.rightKey = true
    }
  }

  onKeyUp(event) {
    if (event.key === 'ArrowLeft') {
      this.leftKey = false
    }
    if (event.key === 'ArrowRight') {
      this.rightKey = false
    }
  }
}

export default Needle
