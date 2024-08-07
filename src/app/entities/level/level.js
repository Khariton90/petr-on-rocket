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
				fill: `#FFCC33`,
				dropShadow: true,
				dropShadowColor: '#000',
				dropShadowAngle: Math.PI / 6,
				dropShadowDistance: 2,
			},
		})

		this.#levelText.width = 200
		this.#levelText.x = (this.#size.width - this.#levelText.width) / 2
		this.#levelText.y = 200

		this.addChild(this.#levelText)
		this.#bgList[0].scale = 1.2
	}

	showLevelText() {
		gsap.fromTo(this.#levelText, { y: 200 }, { y: -50, delay: 1 })
	}

	updateText(count) {
		this.#levelText.text = `Уровень ${count}`
	}

	update(speed) {
		this.#bgList[0].tilePosition.x -= 1
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
