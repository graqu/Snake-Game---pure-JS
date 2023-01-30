import { draw as drawfood, update as updateFood } from './food.js'
import { outsideGrid } from './grid.js'
import {
	update as updateSnake,
	SNAKE_SPEED,
	draw as drawSnake,
	getSnakeHead,
	snakeIntersection,
	changeSpeed,
} from './snake.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
const speedOption = document.querySelector('#speed-select')
const submitSpeed = document.querySelector('.submit')
const welcomeText = document.querySelector('.welcome-text')
const defaultColorBtn = document.querySelector('.color-default-btn')
const defaultColorBtn2 = document.querySelector('.color-default-btn2')
const nokiaColorBtn = document.querySelector('.color-nokia-btn')
const nokiaColorBtn2 = document.querySelector('.color-nokia-btn2')
const root = document.querySelector(':root')
const cards = document.querySelectorAll('.card')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
let lastResult = 0

function main(currentTime) {
	if (gameOver) {
		if (confirm('You lost. Press ok to restart.')) {
			window.location = '/'
		}
		return
	}

	window.requestAnimationFrame(main)
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

	lastRenderTime = currentTime

	update()
	draw()
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', checkArrow, { once: true })
nokiaColorBtn.addEventListener('click', nokiaColorScheme)
nokiaColorBtn2.addEventListener('click', nokiaColorScheme)
defaultColorBtn.addEventListener('click', defaultColorScheme)
defaultColorBtn2.addEventListener('click', defaultColorScheme)
nextBtn.addEventListener('click', nextCard)
prevBtn.addEventListener('click', prevCard)

function update() {
	updateSnake()
	updateFood()
	checkDeath()
}
function draw() {
	gameBoard.innerHTML = ''
	drawSnake(gameBoard)
	drawfood(gameBoard)
}

function checkDeath() {
	gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function checkArrow() {
	console.log('działa')
	welcomeText.style.display = 'none'
	submitSpeed.setAttribute('disabled', 'true')
	speedOption.setAttribute('disabled', 'true')
}

submitSpeed.addEventListener('click', () => {
	console.log(parseInt(speedOption.value))
	console.log(speedOption.value)
	changeSpeed(speedOption.value)
})
function nokiaColorScheme() {
	console.log('kolorzmień')
	root.style.setProperty('--game-board-color', '#99c800')
	root.style.setProperty('--snake-color', '#284307')
	root.style.setProperty('--food-color', '#284307')
	root.style.setProperty('--frame-color', '#99c800')
}
function defaultColorScheme() {
	root.style.setProperty('--game-board-color', '#ccc')
	root.style.setProperty('--snake-color', 'royalblue')
	root.style.setProperty('--food-color', 'gold')
	root.style.setProperty('--frame-color', 'black')
}
function nextCard() {
	const activeCard = document.querySelector('.show')
	const activeId = parseInt(activeCard.getAttribute('data-id'))
	let nextId = 0
	if (activeId < cards.length) {
		nextId = activeId + 1
	} else {
		nextId = 1
	}

	cards.forEach(card => {
		card.classList.remove('show')
	})

	const cardToShow = document.querySelector(`[data-id="${nextId}"]`)
	cardToShow.classList.add('show')
}
function prevCard() {
	const activeCard = document.querySelector('.show')
	const activeId = parseInt(activeCard.getAttribute('data-id'))
	let prevId = 0
	if (activeId > 1) {
		prevId = activeId - 1
	} else {
		prevId = 3
	}

	cards.forEach(card => {
		card.classList.remove('show')
	})

	const cardToShow = document.querySelector(`[data-id="${prevId}"]`)
	cardToShow.classList.add('show')
}
