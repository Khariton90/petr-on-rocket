import { Container, TilingSprite } from 'pixi.js'

const height = window.innerHeight

export default class Obstacle extends Container {
	#height = height
	#texture

	constructor(texture) {
		super()
		this.#texture = texture
		this.width = 110
		this.#height = height
		const obstacle = new TilingSprite(this.#texture)
		obstacle.width = 110
		obstacle.height = this.#height
		this.addChild(obstacle)
	}
}
