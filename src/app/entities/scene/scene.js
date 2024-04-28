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
		return this.#obstacleList
	}

	get obstacleCount() {
		return obstacleCountList[this.#state.user.level - 1]
	}

	create() {
		this.#obstacleList = obstaclesPosX(this.obstacleCount).map(position =>
			this.addChild(this.#obstacleFactory.createObstacle(position))
		)
	}

	#checkIsVisible(obstacle, index) {
		if (obstacle.x + this.x + this.#obstacleWidth < 0) {
			if (obstacle.parent !== null) {
				obstacle.removeFromParent()
			}
			this.#obstacleList.splice(index, 1)
		}
	}

	update(person) {
		this.x -= SPEED
		for (let i = 0; i < this.obstacleList.length; i++) {
			this.obstacleList[i].update(person.getHuman())
			this.#checkIsVisible(this.obstacleList[i], i)
		}
	}

	setInitial() {
		this.x = 0
		this.#obstacleList.forEach(container => container.removeFromParent())
		this.create()
	}
}
