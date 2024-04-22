import { Container, Assets, TilingSprite, Graphics } from 'pixi.js'
import image from '../../../../PNG/zortch_unused2/tile233-110.png'
import { INTERVAL, SPEED } from '../../app.constants.js'
import { getPipeSizePair, testForAABB } from '../../../utils.js'
import Obstacle from './obstacle.js'
import { Coin } from '../coin/coin.js'

const height = window.innerHeight
const width = window.innerWidth

const animationCoinPosition = 10

export default class ObstacleContainer extends Container {
	#container
	#top
	#bottom
	#coin
	#positionX
	#scoreBoard
	#isPointed = false
	#obstacleTexture
	#assets

	constructor(size, position, assets, scoreBoard) {
		super()
		this.#assets = assets
		this.#obstacleTexture = this.#assets.obstacle[0]
		this.#scoreBoard = scoreBoard
		this.#container = new Graphics()
			.rect(0, 0, size.width, size.height)
			.fill('transparent')
			.stroke('transparent')
		this.#positionX = position.x

		this.x = this.#positionX

		this.y = 0
		this.#top = new Obstacle(this.#obstacleTexture)
		this.#bottom = new Obstacle(this.#obstacleTexture)

		this.#top.x = 0
		this.#bottom.x = 0

		this.#top.y = getPipeSizePair(height)
		this.#bottom.y = this.#top.y + this.#container.height + INTERVAL

		const coinPosition =
			this.#top.y + this.#container.height + INTERVAL - INTERVAL / 2

		this.#coin = new Coin({ x: 110 / 2 - 15, y: coinPosition }, this.#assets)

		this.addChild(this.#top)
		this.addChild(this.#bottom)

		this.addChild(this.#container)
		this.addChild(this.#coin)
	}

	setInitial() {
		this.x = this.#positionX
		this.#top.y = getPipeSizePair(height)
		this.#bottom.y = this.#top.y + this.#container.height + INTERVAL

		const coinPosition =
			this.#top.y + this.#container.height + INTERVAL - INTERVAL / 2

		this.removeChild(this.#coin)
		this.#coin = new Coin({ x: 110 / 2 - 15, y: coinPosition }, this.#assets)
		this.addChild(this.#coin)

		if (this.#isPointed) {
			this.#isPointed = false
		}
	}

	createCoin() {
		const coinPosition =
			this.#top.y + this.#container.height + INTERVAL - INTERVAL / 2

		this.#coin.destroy()

		this.#coin = new Coin({ x: 110 / 2 - 15, y: coinPosition }, this.#assets)

		this.#isPointed = false
		this.addChild(this.#coin)
	}

	update(personX, cb) {
		if (personX >= this.x && !this.#isPointed) {
			this.setPoint()
		}

		if (personX >= this.x) {
			this.removeChild(this.#coin)
		}

		if (this.x + this.width < 0) {
			const positionY = getPipeSizePair(height)
			this.#top.y = positionY
			this.#bottom.y = this.#top.y + this.#container.height + INTERVAL

			this.x = width

			this.createCoin()
		}

		this.x -= SPEED
	}

	setPoint() {
		this.#isPointed = true
		if (this.#isPointed) {
			this.#scoreBoard.incScore(1)
		}
	}

	getTop() {
		return this.#top
	}

	getBottom() {
		return this.#bottom
	}
}
