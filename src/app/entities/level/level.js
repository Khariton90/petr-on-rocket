import { Container, Text, TilingSprite } from 'pixi.js'

export class GameLevel extends Container {
	#bgList = []
	#speed = 0.5
	#size = null

	#state = {
		level: 'first',
	}

	#assets

	#levelText = null

	#opacity = 0

	#level

	constructor(size, assets, level) {
		super()
		this.#level = level
		this.#size = size
		this.#assets = assets
		this.createBg(this.#size, this.#assets.level1)
		this.#levelText = new Text({
			text: `Уровень 1`,
			style: {
				fill: `rgba(255,255,255, ${this.#opacity})`,
			},
		})

		this.#levelText.width = 200

		this.#levelText.x = (this.#size.width - this.#levelText.width) / 2
		this.#levelText.y = 100

		this.#speed += this.#level.levels[this.#level.defaultLevel].count / 10

		this.addChild(this.#levelText)
	}

	setVisible(level) {
		this.#opacity = 1
		this.#levelText.style.fill = `rgba(255,255,255, ${this.#opacity})`

		this.#speed = 0.5
	}

	setInvisible() {
		this.#opacity = 0
		this.#levelText.style.fill = `rgba(255,255,255, ${this.#opacity})`
	}

	update() {
		if (this.#opacity > 0) {
			this.#levelText.style.fill = `rgba(255,255,255, ${this.#opacity})`
			this.#opacity -= 0.008
		}

		this.#bgList[1].tilePosition.x -= 1.5 * this.#speed
		this.#bgList[2].tilePosition.x -= 2 * this.#speed
		this.#bgList[3].tilePosition.x -= 2.5 * this.#speed
		this.#bgList[4].tilePosition.x -= 3 * this.#speed
		// this.#bgList[5].tilePosition.x -= 3.5 * this.#speed
		// this.#bgList[6].tilePosition.x -= 4 * this.#speed
	}

	async change(level) {
		if (this.#state.level === level) {
			return
		}

		this.#state.level = level

		this.createBg(this.#size)
	}

	createBg({ width, height }, assets) {
		this.#bgList = assets.slice(0, 5).map(item => {
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
