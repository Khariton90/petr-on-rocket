import { Container, Text, TilingSprite } from 'pixi.js'
import gsap from 'gsap'

export class GameLevel extends Container {
	#bgList = []
	#size = null
	#state = {
		level: 'first',
	}
	#assets
	#levelText = null
	#level

	constructor(size, assets, level) {
		super()
		this.#level = level
		this.#size = size
		this.#assets = assets
		this.createBg(this.#size, this.#assets.level1)
		this.#levelText = new Text({
			text: `Уровень ${this.#level.user.level}`,
			style: {
				fill: `rgba(255,255,255, 1)`,
			},
		})

		this.#levelText.width = 200
		this.#levelText.x = (this.#size.width - this.#levelText.width) / 2
		this.#levelText.y = 100

		this.addChild(this.#levelText)
		this.#bgList[1].scale = 1.05
		this.#bgList[0].scale = 1.1
	}

	showLevelText() {
		gsap.fromTo(this.#levelText, { y: 100 }, { y: -50, delay: 1 })
	}

	updateText(count) {
		this.#levelText.text = `Уровень ${count}`
	}

	update(speed) {
		this.#bgList[0].tilePosition.x -= 0.2
		this.#bgList[1].tilePosition.x -= 0.4
	}

	async change(level) {
		if (this.#state.level === level) {
			return
		}

		this.#state.level = level
		this.createBg(this.#size)
	}

	createBg({ width, height }, assets) {
		this.#bgList = assets.map(item => {
			const tile = new TilingSprite({
				texture: item,
				width,
				height,
			})

			this.addChild(tile)
			return tile
		})
	}
}
