import { Container, Graphics } from 'pixi.js'

const position = {
	x: 60,
	y: 30,
}

export class Human extends Container {
	#human
	#bounds = {
		width: 10,
		height: 130,
	}
	#view

	constructor(view) {
		super()
		this.#view = view

		this.#human = new Graphics()
			.rect(position.x, position.y, this.#bounds.width, this.#bounds.height)
			.stroke('transparent')
		this.#human.rotation = -0.3

		this.#human.width = this.#bounds.width
		this.#human.height = this.#bounds.height
		this.addChild(this.#human)
	}

	update() {
		this.x = this.#view.x
		this.y = this.#view.y
	}

	getBounds() {
		return this.#human.getBounds()
	}
}
