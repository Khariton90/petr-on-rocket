import { Application } from 'pixi.js'
import { deleteAccount, getAccount } from '../services/local-storage'
import { GameBoardAssets } from './game-board.assets'
import GameBoard from './game-board'
import { Controller } from './controller/controller'
import { FormEnum } from './app.constants'
import { PrimaryForm } from './entities/primary-form/primary-form'

export class App {
	#api
	#root
	#primaryForm
	#state = {
		user: null,
	}

	#app = null

	constructor(root, api) {
		this.#app = new Application()
		this.#api = api
		this.#root = root
		this.#primaryForm = new PrimaryForm(this.#root, this.#api)
	}

	init = async () => {
		const player = getAccount()
		await this.#primaryForm.setStatictic()
		if (!player) {
			this.#primaryForm.init(FormEnum.LOGIN, null, this.#render)
			return
		}

		const data = await this.#api.getUser(player)
		if (!data) {
			deleteAccount()
			return
		}

		this.#state.user = data
		this.#primaryForm.init(FormEnum.PROFILE, data, this.#render)
	}

	#render = async () => {
		const assets = new GameBoardAssets()
		const gameBoard = new GameBoard(this.#app, this.#state, this.#api)
		await this.#app.init({ backgroundAlpha: 0, resizeTo: window })
		await assets.init()
		await gameBoard.init(assets)

		const rootController = new Controller(gameBoard)
		this.#app.ticker.add(gameBoard.update, gameBoard)
		this.#root.appendChild(this.#app.canvas)
		document.addEventListener('keydown', evt => rootController.onKeyDown(evt))
		document.addEventListener('keyup', evt => rootController.onKeyUp(evt))
	}
}
