import { Container, Sprite, AnimatedSprite } from 'pixi.js'

export class Coin extends Container {
	#assets
	state = {
		animation: null,
		texture: null,
		isVisible: false,
	}

	constructor(position, assets, type = 'animation') {
		super()
		this.#assets = assets
		this.width = 38
		this.height = 38
		this.x = position.x
		this.y = position.y

		if (type === 'animation') {
			this.addChild(this.getAnimation())
		} else {
			this.addChild(this.getTexture())
		}
	}

	update(positionY) {
		this.y = positionY
	}

	getTexture() {
		const testCoin = new Sprite(this.#assets.spritesheet.textures['1.png'])
		testCoin.width = 38
		testCoin.height = 38
		this.state.texture = testCoin
		return testCoin
	}

	getAnimation() {
		const testCoin = new AnimatedSprite(
			this.#assets.spritesheet.animations['rotate']
		)
		testCoin.width = 38
		testCoin.height = 38
		testCoin.animationSpeed = 1 / 8
		this.state.animation = testCoin
		testCoin.play()
		return testCoin
	}

	stopAnimation() {
		this.state.animation.stop()
	}
}
