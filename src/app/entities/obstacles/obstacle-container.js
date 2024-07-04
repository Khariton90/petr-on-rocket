import { Container, Graphics } from 'pixi.js'
import { INTERVAL } from '../../app.constants.js'
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
	#obstacleTexture
	#assets
	#coinPosition = {
		x: 0,
		y: 0,
	}

	#isCompleted = false

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
		this.#coinPosition.x = 110 / 2 - 15
		this.#coinPosition.y =
			this.#top.y + this.#container.height + INTERVAL - INTERVAL / 2

		this.#coin = new Coin(this.#coinPosition, this.#assets)
		this.addChild(this.#top)
		this.addChild(this.#bottom)
		this.addChild(this.#coin)
		this.addChild(this.#container)
		this.visible = false
	}

	get coin() {
		return this.#coin
	}

	get topBottom() {
		return [this.#top, this.#bottom]
	}

	update(person) {
		if (!this.visible) {
			this.visible = true
			return
		}

		if (testForAABB(person, this.#coin) && !this.#isCompleted) {
			this.#isCompleted = true
			this.#setCoinAnimation()
			this.#setPoint()
		}
	}

	setInvisible() {
		this.visible = false
	}

	setInitial() {
		this.x = this.#positionX
		this.#top.y = getPipeSizePair(height)
		this.#bottom.y = this.#top.y + this.#container.height + INTERVAL
		const coinPosition =
			this.#top.y + this.#container.height + INTERVAL - INTERVAL / 2
		this.removeChild(this.#coin)
		this.#coin = new Coin(this.#coinPosition, this.#assets)
		this.addChild(this.#coin)
	}

	#setCoinAnimation() {
		this.#coin.stopAnimation()
		gsap.to(this.#coin, {
			x: this.#scoreBoard.coinX,
			y: this.#scoreBoard.coinY,
			duration: 0.4,
			onComplete: () => this.removeChild(this.#coin),
		})
	}

	#setPoint() {
		this.#scoreBoard.incScore(1)
	}
}
