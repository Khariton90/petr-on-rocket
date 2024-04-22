import { Container, TilingSprite } from 'pixi.js'
import { SPEED } from '../app.constants'

export default class Floor extends Container {
	#height = 40

	#assets = null
	$texture = null

	constructor(assets) {
		super()

		this.#assets = assets

		this.$texture = this.#setTexture()
		this.addChild(this.$texture)
	}

	update() {
		this.$texture.tilePosition.x -= SPEED
	}

	#setTexture() {
		const floor = new TilingSprite(this.#assets.floor[0])
		floor.width = window.innerWidth
		floor.height = this.#height
		return floor
	}
}
