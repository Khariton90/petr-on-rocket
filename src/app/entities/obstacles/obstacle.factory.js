import { Container } from 'pixi.js'
import ObstacleContainer from './obstacle-container.js'

export default class ObstacleFactory extends Container {
	#app = null
	#container = null
	#scoreBoard
	#assets = null

	constructor(app, assets, scoreBoard) {
		super()
		this.#app = app
		this.#assets = assets
		this.#scoreBoard = scoreBoard
	}

	createObstacle(x) {
		const positionX = this.#app.width + x
		const size = {
			width: 110,
			height: this.#app.height,
		}
		const position = { x: positionX }
		this.#container = new ObstacleContainer(
			size,
			position,
			this.#assets,
			this.#scoreBoard
		)

		return this.#container
	}
}
