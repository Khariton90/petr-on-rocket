import { Container } from 'pixi.js'
import ObstacleFactory from '../obstacles/obstacle.factory'
import { SPEED, obstacleCountList, obstaclesPosX } from '../../app.constants'

export class Scene extends Container {
	#app
	#assets
	#scoreBoard
	#state
	#obstacleFactory = null
	#obstacleList = []
	#obstacleWidth = 110

	constructor(size, app, assets, scoreBoard, state) {
		super()
		this.#app = app
		this.#assets = assets
		this.#scoreBoard = scoreBoard
		this.#state = state
		this.x = 0
		this.y = 0
		this.width = size.width
		this.height = size.height
		this.#obstacleFactory = new ObstacleFactory(
			this.#app,
			this.#assets,
			this.#scoreBoard
		)
	}

	get obstacleList() {
		return this.#obstacleList.slice(0, 5)
	}

	get obstacleCount() {
		return obstacleCountList[this.#state.user.level - 1]
	}

	get xPosition() {
		return this.x
	}

	deleteObstacle(index) {
		if (this.#obstacleList[index].x + this.x + this.#obstacleWidth <= 0) {
			this.#obstacleList[index].visible = false
			this.#obstacleList.splice(index, 1)
		}
	}

	create() {
		this.#obstacleList = obstaclesPosX(this.obstacleCount).map(position =>
			this.addChild(this.#obstacleFactory.createObstacle(position))
		)
	}

	update() {
		this.x -= SPEED
	}

	setInitial() {
		this.x = 0
		this.#obstacleList.forEach(container => container.removeFromParent())
		this.create()
	}
}
