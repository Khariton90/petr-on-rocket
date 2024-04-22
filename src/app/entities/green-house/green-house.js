import { Container, Graphics, Sprite, Text } from 'pixi.js'

export class GreenHouse extends Container {
	#house = null
	#text = null
	#text2 = null

	#triangle = null

	constructor(houseAsset) {
		super()

		this.#house = new Sprite(houseAsset)
		this.#house.width = 600
		this.#house.height = 800
		this.#house.x = window.innerWidth - 610
		this.#house.y = window.innerHeight - 815

		this.#triangle = new Graphics().rect(180, 150, 200, 200).fill('#fff')

		this.#text = new Text({
			text: 'Зеленый',
			style: {
				fontSize: 30,
				fontWeight: '700',
			},
		})

		this.#text2 = new Text({
			text: 'Магазин',
			style: {
				fontSize: 30,
				fontWeight: '700',
				width: 200,
				height: 40,
			},
		})

		this.#text.x = 190
		this.#text.y = 180

		this.#text2.x = 190
		this.#text2.y = 220

		this.#triangle.addChild(this.#text)
		this.#triangle.addChild(this.#text2)
		this.#house.addChild(this.#triangle)
		this.addChild(this.#house)
	}

	setHouse() {
		if (this.#house.x > window.innerWidth - 510) {
			this.#house.x -= 3

			this.#text.x =
				this.#house.x + this.#house.width / 2 - this.#text.width / 2

			this.#text2.x =
				this.#house.x + this.#house.width / 2 - this.#text2.width / 2
		}
	}
}
