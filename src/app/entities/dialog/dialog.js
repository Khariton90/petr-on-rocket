import { Container, Graphics, Sprite, Text } from 'pixi.js'

export class Dialog extends Container {
	#form = null

	#title = null
	#text = 'ПЕТЯ НА РАКЕТЕ'

	#assets

	constructor(assets) {
		super()
		this.#assets = assets
		const background = new Graphics()
			.rect(0, 0, 400, 500)
			.fill('rgba(255,255,255, 0.95)')
			.stroke('orange')

		this.#form = new Container()
		this.#form.width = 400
		this.#form.height = 500

		this.#form.y = window.innerHeight / 2
		this.#form.x = window.innerWidth / 2

		this.#form.addChild(background)

		this.#title = new Text({
			text: this.#text,
			style: {
				fontSize: 40,
				fontWeight: 'bold',
				fill: '#ed1c25',
				dropShadow: '#999',
				textAlign: 'center',
			},
		})

		this.#title.width = 300

		this.#title.x = 50
		this.#title.y = 20

		let button = new Container()
		button.width = 300
		button.height = 60
		button.y = this.#form.height - button.height - 80
		button.x = 50

		let btn = new Graphics().rect(0, 0, 300, 60).fill('#ed1c25')

		const btnText = new Text({
			text: 'НАЖМИТЕ ENTER',
			style: {
				fontSize: 30,
				fontWeight: 'bold',
				fill: '#FFF',
			},
		})

		btnText.x = btn.width / 2 - btnText.width / 2
		btnText.y = btn.height / 2 - btnText.height / 2

		this.#form.addChild(this.#title)

		const sprite = new Sprite(this.#assets.dialog[0])
		sprite.width = 200
		sprite.height = 200
		sprite.x = (this.#form.width - sprite.width) / 2
		sprite.y = (this.#form.height - sprite.height) / 2 - 20

		button.addChild(btn)
		button.addChild(btnText)

		this.#form.addChild(sprite)
		this.#form.addChild(button)

		this.#form.y = (window.innerHeight - this.#form.height) / 2
		this.#form.x = (window.innerWidth - this.#form.width) / 2
		this.addChild(this.#form)
	}

	startGame(status) {
		this.#form.visible = false
	}

	endGame() {
		this.#form.visible = true
		this.#title.text = 'ПЕТЯ НА РАКЕТЕ'
		this.#title.x = 50
	}

	pause() {
		this.#form.visible = true
		this.#title.text = 'ПАУЗА'
		this.#title.x = (this.#form.width - this.#title.width) / 2
	}
}
