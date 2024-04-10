import { INTERVAL } from '../../constants.js'
import Obstacle from './obstacle.js'

export default class ObstacleFactory {
	#app = null

	constructor(app) {
		this.#app = app
	}

	create(x, y) {
		const obstacleTop = new Obstacle()
		const obstacleBottom = new Obstacle()
		obstacleTop.x = x
		obstacleTop.y = y

		obstacleBottom.x = x
		obstacleBottom.y = -window.innerHeight + obstacleTop.y - INTERVAL

		this.#app.stage.addChild(obstacleTop)
		this.#app.stage.addChild(obstacleBottom)
		return [obstacleTop, obstacleBottom]
	}
}
