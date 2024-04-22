import '../style.css'
import { Application, Assets, Loader, Spritesheet, Texture } from 'pixi.js'
import GameBoard from './app/app.js'
import preview from '../images/petr-up-new.png'
import coin from '../PNG/pet2.svg'
import obstacle from '../PNG/zortch_unused2/tile233-110.png'

import first_1 from '../PNG/tilingsprites/second_1.png'
import first_2 from '../PNG/tilingsprites/second_2.png'
import first_3 from '../PNG/tilingsprites/second_3.png'
import first_4 from '../PNG/tilingsprites/second_4.png'
import first_5 from '../PNG/tilingsprites/second_5.png'
import first_6 from '../PNG/tilingsprites/second_6.png'
import first_7 from '../PNG/tilingsprites/second_7.png'
import { Controller } from './app/controller/controller.js'
import { AppAssets } from './app/app.assets.js'
import coinJson from '../assets/coin.json'

const button = document.querySelector('.button')
const form = document.querySelector('.form')

const loadLevel = async (...images) => {
	const assets = Promise.all(
		images.map(async element => await Assets.load(element))
	)

	return assets
}

const render = async () => {
	const app = new Application()
	await app.init({ backgroundAlpha: 0, resizeTo: window })
	const assets = new AppAssets()
	await assets.init()
	// const texture = await Assets.load(preview)

	// const obstacleTexture = await Assets.load(obstacle)
	// const coinTexture = await Assets.load(coin)

	const gameBoard = new GameBoard(app)

	await gameBoard.init(assets)

	const rootController = new Controller(gameBoard)

	app.ticker.add(gameBoard.update, gameBoard)
	document.body.appendChild(app.canvas)

	document.addEventListener('keydown', evt => rootController.onKeyDown(evt))
	document.addEventListener('keyup', evt => rootController.onKeyUp(evt))
}

render()
// form.addEventListener('submit', evt => {
// 	evt.preventDefault()

// 	const username = new FormData(evt.target).get('username').trim()

// 	if (username) {
// 		render()
// 		evt.target.remove(true)
// 	}
// })
