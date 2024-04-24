import { ControlKeys } from '../../app.constants.js'

export class PersonController {
	#person

	#state = {}

	constructor(person) {
		this.#person = person

		this.#state = {
			controls: {
				keyDown: {
					[ControlKeys.UP]: () => this.#person.jump(),
					[ControlKeys.ARROW_UP]: () => this.#person.jump(),
					[ControlKeys.LEFT]: () => this.#person.startLeftMove(),
					[ControlKeys.ARROW_LEFT]: () => this.#person.startLeftMove(),
					[ControlKeys.RIGHT]: () => this.#person.startRightMove(),
					[ControlKeys.ARROW_RIGHT]: () => this.#person.startRightMove(),
				},
				keyUp: {
					[ControlKeys.UP]: () => this.#person.setFly(),
					[ControlKeys.ARROW_UP]: () => this.#person.setFly(),
					[ControlKeys.LEFT]: () => this.#person.stopLeftMove(),
					[ControlKeys.ARROW_LEFT]: () => this.#person.stopLeftMove(),
					[ControlKeys.RIGHT]: () => this.#person.stopRightMove(),
					[ControlKeys.ARROW_RIGHT]: () => this.#person.stopRightMove(),
				},
			},
		}
	}

	onKeyDown(key) {
		if (this.#state.controls.keyDown.hasOwnProperty(key)) {
			this.#state.controls.keyDown[key]()
		}
	}

	onKeyUp(key) {
		if (this.#state.controls.keyUp.hasOwnProperty(key)) {
			this.#state.controls.keyUp[key]()
		}
	}
}
