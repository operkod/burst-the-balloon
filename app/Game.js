import Ball from './Ball'
import Needle from './Needle'
import Wind from './Wind'

class Game {
  constructor(canvas, timer) {
    this.WIDTH = 600
    this.HEIGHT = 400
    this.START_BALLS_COUNT = 5
    this.TIMER = timer * 1000
    this.CALLBACK_FREQUENCY = 1000
    this.callbackNumbers = this.TIMER / this.CALLBACK_FREQUENCY
    this.increaseRatio = 1
    this.ballsNumbers = this.START_BALLS_COUNT
    this.gameTime = 0
    this.isGameEnd = false
    this._skipped = 0
    this._hints = 0
    this.init(canvas)
    this.needle.draw()
  }

  init(canvas) {
    this.range = { w: this.WIDTH, h: this.HEIGHT }
    this.canvas = canvas
    this.canvas.width = this.WIDTH
    this.canvas.height = this.HEIGHT
    this.ctx = canvas.getContext('2d')
    this.balls = []
    for (let i = 0; i < this.START_BALLS_COUNT; i++) {
      this.balls.push(new Ball(this.ctx, this.range))
    }
    this.needle = new Needle(this.ctx, this.range)
    this.wind = new Wind(this.canvas.width)
  }

  startGame(callback) {
    this.timerID = setInterval(() => {
      this.increaseRatio += 3 / this.callbackNumbers
      this.ballsNumbers = Math.round(this.START_BALLS_COUNT + this.increaseRatio * 2)
      this.gameTime += this.CALLBACK_FREQUENCY
      callback({
        time: this.gameTime / 1000,
        skipped: this.skipped,
        hints: this.hints
      })
    }, this.CALLBACK_FREQUENCY)
    this.startRender()
  }

  endGame(callBack) {
    this.endCallback = callBack
  }

  startRender() {
    let prevTimes = 0

    const loop = times => {
      if (!this.isGameEnd) {
        requestAnimationFrame(loop)
      }

      const currentTimes = times - prevTimes
      const oneDrawPart = Math.min(16.7, currentTimes / 1000)
      prevTimes = times

      this.clearCanvas()
      this.drawNeedle(oneDrawPart)
      this.drawBalls(oneDrawPart)
      this.changeState()

      if (this.balls.length === 0) {
        this.isGameEnd = true
        this.endCallback()
        this.blurCanvas()
      }

      if (this.gameTime >= this.TIMER) {
        clearInterval(this.timerID)
      }
    }

    requestAnimationFrame(loop)
  }

  drawNeedle(oneDrawPart) {
    if (this.gameTime < this.TIMER) {
      this.needle.draw(oneDrawPart)
    } else {
      this.needle.tipCord.y -= this.canvas.HEIGHT
    }
  }

  drawBalls(oneDrawPart) {
    this.balls.forEach(ball => {
      ball.draw(oneDrawPart, this.wind.getParam(ball.x), this.increaseRatio)
    })
  }

  changeState() {
    this.balls.forEach(ball => {
      this.skippedObserver(ball)
      this.hintObserver(ball)
    })
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  skippedObserver(ball) {
    if (ball.bottomCord <= 0) {
      this.ballToggle(ball)
      this._skipped++
    }
  }

  hintObserver(ball) {
    if (
      (this.needle.tipCord.x - ball.x) ** 2 + (this.needle.tipCord.y - ball.y) ** 2 <=
      ball.r ** 2
    ) {
      this.ballToggle(ball)
      this._hints++
    }
  }

  ballToggle(ball) {
    this.balls.splice(this.balls.indexOf(ball), 1)
    if (this.gameTime < this.TIMER) {
      while (this.balls.length < this.ballsNumbers) this.balls.push(new Ball(this.ctx, this.range))
    }
  }

  blurCanvas() {
    this.ctx.beginPath()
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    this.ctx.fill()
  }

  get skipped() {
    return this._skipped
  }

  get hints() {
    return this._hints
  }
}
export default Game
