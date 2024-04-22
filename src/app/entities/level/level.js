import { Container, TilingSprite } from 'pixi.js'

export class GameLevel extends Container {
	#bgList = []
	#speed = 0.5
	#size = null

	#state = {
		level: 'first',
	}

	#assets

	constructor(size, assets) {
		super()
		this.#size = size
		this.#assets = assets
		this.createBg(this.#size, this.#assets.level1)
	}

	update() {
		this.#bgList[0].tilePosition.x -= 1 * this.#speed
		this.#bgList[1].tilePosition.x -= 1.5 * this.#speed
		this.#bgList[2].tilePosition.x -= 2 * this.#speed
		this.#bgList[3].tilePosition.x -= 2.5 * this.#speed
		this.#bgList[4].tilePosition.x -= 3 * this.#speed
		this.#bgList[5].tilePosition.x -= 3.5 * this.#speed
		this.#bgList[6].tilePosition.x -= 4 * this.#speed
	}

	async change(level) {
		if (this.#state.level === level) {
			return
		}

		this.#state.level = level

		this.createBg(this.#size)
	}

	createBg({ width, height }, assets) {
		const level = this.#state.level
		this.#bgList = assets.map(item => {
			const tile = new TilingSprite({
				texture: item,
				width,
				height,
				scale: {
					x: 1,
					y: 1,
				},
			})

			this.addChild(tile)
			return tile
		})
	}
}
