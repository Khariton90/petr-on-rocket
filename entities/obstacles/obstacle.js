import { Container, Sprite, Assets } from 'pixi.js'
import image from '../../images/paving-600.jpg'
import { SPEED } from '../../constants'

export default class Obstacle extends Container {
	#height = window.innerHeight

	constructor() {
		super()
		this.loadTexture()
	}

	update() {
		this.x -= SPEED
	}

	async loadTexture() {
		const texture = await Assets.load(image)
		const obstacle = new Sprite(texture)
		obstacle.width = 130
		obstacle.height = this.#height
		this.addChild(obstacle)
	}
}
