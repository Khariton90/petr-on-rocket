import { Container, Graphics, Text } from 'pixi.js'

export class ScoreBoard extends Container {
	#scoreBoard = null
	#score = 0
	#text

	constructor(score = 0) {
		super()

		this.#score = score

		this.#scoreBoard = new Graphics()
			.rect(0, 0, 220, 80)
			.fill('rgba(255,255,255, 0.85)')
		this.#scoreBoard.y = 10
		this.#scoreBoard.x = window.innerWidth - this.#scoreBoard.width - 10

		this.#text = new Text({
			text: `Очки: ${this.#score}`,
			style: {
				fontSize: 40,
			},
		})

		this.#text.y = this.#scoreBoard.height / 2 - this.#text.height / 2
		this.#text.x = 20

		this.#scoreBoard.addChild(this.#text)

		this.addChild(this.#scoreBoard)
	}

	update() {
		this.#text.text = `Очки: ${this.#score}`
	}

	getScore(score) {
		this.#score = score
		this.update()
	}
}
