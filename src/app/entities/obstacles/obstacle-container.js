import { Container, Graphics } from 'pixi.js'
import { INTERVAL, SPEED } from '../../app.constants.js'
import { getPipeSizePair, testForAABB } from '../../../utils.js'
import Obstacle from './obstacle.js'
import { Coin } from '../coin/coin.js'
import gsap from 'gsap'

const height = window.innerHeight

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
		this.addChild(this.#coin)
		this.addChild(this.#container)
	}

	update(person) {
		// this.x -= SPEED

		if (testForAABB(person, this.#coin)) {
			this.#setCoinAnimation()
			this.#setPoint()
		}
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

		this.#isPointed = false
		this.visible = true
	}

	#setCoinAnimation() {
		gsap.to(this.#coin, { x: this.#scoreBoard.coinX })
		gsap.to(this.#coin, {
			y: this.#scoreBoard.coinY,
			onComplete: () => this.removeChild(this.#coin),
		})
	}

	#setPoint() {
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
