import './style.css'
import { Application, Assets } from 'pixi.js'
import GameBoard from './entities/game-board.js'
import image from './black-forest-1440.png'
import image2 from './red-forest.png'
import image3 from './forest-1440.png'
import { getRandom } from './utils.js'
import petr from './images/petr_1.png'
import boost from './images/petr.png'
import boom from './images/boom-250.png'

const bgList = [image, image2, image3]

;(async () => {
	const app = new Application()
	await app.init({ backgroundAlpha: 0, resizeTo: window })
	const texture = await Assets.load(image)

	const petrTexture = await Assets.load(petr)
	const boomTexture = await Assets.load(boom)
	const boostTexture = await Assets.load(boost)
	const textureList = [petrTexture, boomTexture, boostTexture]
	const gameBoard = new GameBoard(app, texture, textureList)
	app.ticker.add(gameBoard.update, gameBoard)
	document.body.appendChild(app.canvas)
	document.addEventListener('keydown', evt => gameBoard.onKeyDown(evt))
	document.addEventListener('keyup', evt => gameBoard.onKeyUp(evt))
	document.addEventListener('click', evt => gameBoard.onClick(evt))
})()

const el = document.querySelector('.scene1')
const el2 = document.querySelector('.scene2')

const random = getRandom(0, bgList.length - 1)
el.style.backgroundImage = `url(${bgList[random]})`
el2.style.backgroundImage = `url(${bgList[random]})`
