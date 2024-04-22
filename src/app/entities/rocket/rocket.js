import { Container, Graphics } from 'pixi.js'

const position = {
	x: 10,
	y: 115,
}

export class Rocket extends Container {
	#rocket

	#bounds = {
		width: 100,
		height: 20,
	}

	#view

	constructor(view) {
		super()

		this.#view = view
		this.#rocket = new Graphics()
			.rect(position.x, position.y, this.#bounds.width, this.#bounds.height)
			.stroke('transparent')
		this.#rocket.rotation = -0.3

		this.#rocket.width = this.#bounds.width
		this.#rocket.height = this.#bounds.height
		this.addChild(this.#rocket)
	}

	update() {
		this.x = this.#view.x
		this.y = this.#view.y
	}

	getBounds() {
		return this.#rocket.getBounds()
	}
}
