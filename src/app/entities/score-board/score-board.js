import { Container, Graphics, Text } from 'pixi.js'
import { Coin } from '../coin/coin'
import { obstacleCountList } from '../../app.constants'

export class ScoreBoard extends Container {
	#scoreBoard = null
	#score = 0
	#text

	#image
	#levelCount = null

	constructor(score = 0, texture, level) {
		super()
		this.#levelCount = obstacleCountList[level - 1]

		this.#score = score
		this.#scoreBoard = new Graphics()
			.rect(0, 0, 320, 80)
			.fill('rgba(255,255,255, 0.3)')
		this.#scoreBoard.y = 10
		this.#scoreBoard.x = window.innerWidth - this.#scoreBoard.width - 10

		this.#text = new Text({
			text: `${this.#score}  / ${this.#levelCount}`,
			style: {
				fontSize: 50,
			},
		})

		this.#text.y = 24
		this.#text.x = window.innerWidth - 230
		this.#image = new Coin(
			{
				x: window.innerWidth - 290,
				y: (this.#scoreBoard.height - 19) / 2,
			},
			texture,
			'texture'
		)

		this.addChild(this.#scoreBoard)
		this.addChild(this.#text)
		this.addChild(this.#image)
	}

	get coinX() {
		return window.innerWidth - 400
	}

	get coinY() {
		return (this.#scoreBoard.height - 19) / 2
	}

	update() {
		this.#text.text = `${this.#score} / ${this.#levelCount}
		`
	}

	incScore(score) {
		this.#score += score
		this.#text.text = `${this.#score} / ${this.#levelCount}
		`
	}

	setLevelCount(count) {
		this.#levelCount = count
	}

	setScore(score) {
		this.#score = score
	}

	getScore() {
		return this.#score
	}
}
