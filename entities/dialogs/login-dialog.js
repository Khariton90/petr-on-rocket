import { Container, Graphics, Text } from 'pixi.js'

export class LoginDialog extends Container {
	#form = null

	constructor() {
		super()
		this.#form = new Graphics()
			.rect(0, 0, 400, 240)
			.fill('rgba(255,255,255, 0.85)')
		this.#form.y = window.innerHeight / 2 - this.#form.height / 2
		this.#form.x = window.innerWidth / 2 - this.#form.width / 2

		const text = new Text({
			text: 'ПЕТЯ НА РАКЕТЕ',
			style: {
				fontSize: 40,
				fontStyle: 'italic',
				fontWeight: 'bold',
				fill: '#ed1c25',
			},
		})

		text.x = 30
		text.y = 20

		let button = new Graphics().rect(0, 0, 300, 60).fill('#ed1c25')

		button.y = this.#form.height - button.height - 30
		button.x = 50

		const btnText = new Text({
			text: 'Играть',
			style: {
				fontSize: 30,
				fontWeight: 'bold',
				fill: '#FFF',
			},
		})

		btnText.x = button.width / 2 - btnText.width / 2
		btnText.y = button.height / 2 - btnText.height / 2

		this.#form.addChild(text)

		button.addChild(btnText)
		this.#form.addChild(button)
		this.addChild(this.#form)
	}

	startGame() {
		this.#form.visible = false
	}

	endGame() {
		this.#form.visible = true
	}
}
