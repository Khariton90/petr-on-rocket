import { Container } from 'pixi.js'
import ObstacleFactory from '../obstacles/obstacle.factory'
import { obstacleCountList, obstaclesPosX } from '../../app.constants'
import gsap from 'gsap'

const levelSpeedList = [
	5, 5.5, 6, 6.2, 6.4, 6.6, 6.8, 7, 7.2, 7.4, 7.6, 7.8, 8, 8.2, 8.4, 8.6, 8.8,
]

export class Scene extends Container {
	#app
	#assets
	#scoreBoard
	#state
	#obstacleFactory = null
	#obstacleList = []
	#obstacleWidth = 110
	#speed = 5

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

		this.#speed = levelSpeedList[this.#state.user.level - 1]
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

	changeLevelSpeed(level) {
		if (this.#speed === levelSpeedList[level - 1]) {
			return
		}

		this.#speed = levelSpeedList[level - 1]
	}

	deleteObstacle() {
		if (this.#obstacleList[0].x + this.x + this.#obstacleWidth > 0) {
			return
		}

		this.#obstacleList[0].removeChild()
		this.#obstacleList[0].removeFromParent()
		this.#obstacleList.splice(0, 1)
	}

	create() {
		this.#obstacleList = obstaclesPosX(this.obstacleCount).map(position =>
			this.addChild(this.#obstacleFactory.createObstacle(position))
		)
	}

	update() {
		this.x -= this.#speed
	}

	setInitial() {
		this.x = 0
		this.#obstacleList.forEach(container => container.removeFromParent())
		this.create()
	}
}
