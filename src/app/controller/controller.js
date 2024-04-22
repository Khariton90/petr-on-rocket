import { ControlKeys, GameStatus } from '../app.constants.js'
import { PersonController } from '../entities/person/person.controller.js'

export class Controller {
	#gameBoard
	#state = {}
	#personController = null

	constructor(gameBoard) {
		this.#gameBoard = gameBoard
		this.#personController = new PersonController(this.#gameBoard.person)

		this.#state = {
			controls: {
				[ControlKeys.ENTER]: () => this.#gameBoard.assignGamePlay(),
			},
		}
	}

	onKeyDown(evt) {
		if (this.#state.controls.hasOwnProperty(evt.code)) {
			this.#state.controls[evt.code]()
			return
		}

		if (this.#gameBoard.status !== GameStatus.START) {
			return
		}

		this.#personController.onKeyDown(evt.code)
	}

	onKeyUp(evt) {
		if (this.#gameBoard.status !== GameStatus.START) {
			return
		}

		this.#personController.onKeyUp(evt.code)
	}
}
