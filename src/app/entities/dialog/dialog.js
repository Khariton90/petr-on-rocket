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
			.rect(0, 0, 400, 400)
			.fill('rgba(255,255,255, 0.6)')
			.stroke('#FFCC33')

		this.#form = new Container()
		this.#form.width = 460
		this.#form.height = 400
		this.#form.y = window.innerHeight / 2
		this.#form.x = window.innerWidth / 2
		this.#form.addChild(background)
		this.#title = new Text({
			text: this.#text,
			style: {
				fontSize: 40,
				fontWeight: 'bold',
				fill: '#ED1C24',
				dropShadow: true,
				dropShadowColor: '#000',
				dropShadowAngle: Math.PI / 6,
				dropShadowDistance: 2,
				letterSpacing: 1,
			},
		})

		this.#title.width = 340

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

		this.#title.x = (this.#form.width - 340) / 2
		this.#title.y = 20

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

	startGame() {
		this.#form.visible = false
	}

	update(text) {
		this.#form.visible = true
		this.#title.text = text
	}
}
