import { Container, Graphics, Text } from 'pixi.js'
import { Coin } from '../coin/coin'

export class ScoreBoard extends Container {
	#scoreBoard = null
	#score = 0
	#text

	#image

	constructor(score = 0, texture) {
		super()

		this.#score = score
		this.#scoreBoard = new Graphics()
			.rect(0, 0, 260, 80)
			.fill('rgba(255,255,255, 0.5)')
		this.#scoreBoard.y = 10
		this.#scoreBoard.x = window.innerWidth - this.#scoreBoard.width - 10

		this.#text = new Text({
			text: `${this.#score} / 50`,
			style: {
				fontSize: 50,
			},
		})

		this.#text.y = 25
		this.#text.x = window.innerWidth - 180

		this.#image = new Coin(
			{
				x: window.innerWidth - 240,
				y: (this.#scoreBoard.height - 19) / 2,
			},
			texture,
			'texture'
		)

		this.addChild(this.#scoreBoard)
		this.addChild(this.#text)
		this.addChild(this.#image)
	}

	update() {
		this.#text.text = `${this.#score} / 50
		`
	}

	incScore(score) {
		this.#score += score
		this.#text.text = `${this.#score} / 50
		`
	}

	setScore(score) {
		this.#score = score
	}

	getScore() {
		return this.#score
	}
}
