import { Container, Graphics } from 'pixi.js'
import { INTERVAL, SPEED } from '../../app.constants.js'
import Obstacle from './obstacle.js'
import ObstacleContainer from './obstacle-container.js'

export default class ObstacleFactory extends Container {
	#app = null
	#container = null
	#texture
	#scoreBoard
	#obstacleTexture

	#assets = null

	constructor(app, assets, scoreBoard, obstacleTexture) {
		super()
		this.#app = app
		// this.#texture = texture

		this.#assets = assets
		this.#obstacleTexture = obstacleTexture
		this.#scoreBoard = scoreBoard
	}

	update() {
		if (this.#container.x + this.#container.width < 0) {
			this.#container.x = 0
		}

		this.x -= SPEED
	}

	createObstacle(x) {
		const positionX = this.#app.screen.width + x

		const size = {
			width: 110,
			height: this.#app.screen.height,
		}

		const position = { x: positionX }

		this.#container = new ObstacleContainer(
			size,
			position,
			this.#assets,
			this.#scoreBoard,
			this.#obstacleTexture
		)

		this.#app.stage.addChild(this.#container)

		return this.#container
	}
}
