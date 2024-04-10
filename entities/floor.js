import { Container, Graphics, Sprite, Texture } from 'pixi.js'

export default class Floor extends Container {
	#height = 40

	constructor() {
		super()

		const rectangle = new Graphics()
			.rect(0, 0, window.innerWidth, this.#height)
			.fill('#51b56d')
		this.addChild(rectangle)
	}
}
