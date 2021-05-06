import Game from './Game'

const TIMER = 60
const canvas = document.querySelector('.js-canvas')
const startButton = document.querySelector('.js-button-start')
const replayButton = document.querySelector('.js-button-replay')
const timer = document.querySelector('.js-timer')
const hintsElements = document.querySelectorAll('.js-hints')
const skippedElements = document.querySelectorAll('.js-skipped')
const modalStart = document.querySelector('.js-modal-start')
const modalEnd = document.querySelector('.js-modal-end')
modalEnd.classList.add('display-none')

startButton.addEventListener('click', startGame)
replayButton.addEventListener('click', startGame)

function startGame() {
  modalStart.classList.add('display-none')
  modalEnd.classList.add('display-none')
  timer.innerHTML = TIMER.toString().length > 1 ? `${TIMER}:00` : `0${TIMER}:00`
  modalEnd.classList.add('display-none')
  hintsElements.forEach(hints => (hints.innerHTML = '0'))
  skippedElements.forEach(skipped => (skipped.innerHTML = '0'))
  const game = new Game(canvas, TIMER)
  game.startGame(changeState)
  game.endGame(endGame)
}

function changeState(state) {
  const timeLeft = TIMER - state.time
  if (timeLeft.toString().length > 1) {
    timer.innerHTML = `${timeLeft}: 00`
  } else {
    timer.innerHTML = `0${timeLeft}: 00`
  }
  hintsElements.forEach(hints => (hints.innerHTML = state.hints))
  skippedElements.forEach(skipped => (skipped.innerHTML = state.skipped))
}

function endGame() {
  modalEnd.classList.remove('display-none')
}
