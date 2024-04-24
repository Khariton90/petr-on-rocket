import '../style.css'
import { Application } from 'pixi.js'
import GameBoard from './app/game-board.js'
import { Controller } from './app/controller/controller.js'
import { AppAssets } from './app/app.assets.js'
import { ApiServices } from './services/api-services.js'
import { PrimaryForm } from './app/entities/primary-form/primary-form.js'
import { deleteAccount, getAccount } from './services/local-storage.js'
import { FormEnum } from './app/app.constants.js'

const api = new ApiServices()
const app = document.querySelector('.app')
const primaryForm = new PrimaryForm(app, api)

export const render = async () => {
	const app = new Application()
	await app.init({ backgroundAlpha: 0, resizeTo: window })
	const assets = new AppAssets()
	await assets.init()
	const gameBoard = new GameBoard(app)
	await gameBoard.init(assets)

	const rootController = new Controller(gameBoard)

	app.ticker.add(gameBoard.update, gameBoard)
	document.body.appendChild(app.canvas)

	document.addEventListener('keydown', evt => rootController.onKeyDown(evt))
	document.addEventListener('keyup', evt => rootController.onKeyUp(evt))
}
;(async () => {
	const player = getAccount()
	if (!player) {
		primaryForm.init(FormEnum.LOGIN, null, render)
		return
	}
	const data = await api.getUser(player)
	if (!data) {
		deleteAccount()
		return
	}
	primaryForm.init(FormEnum.PROFILE, data, render)
})()
