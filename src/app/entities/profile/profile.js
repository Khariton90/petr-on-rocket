import { Container, Graphics, Text } from 'pixi.js'

const style = {
	fill: '#FFCC33',
	fontSize: 10,
}

export class Profile extends Container {
	#state = {
		user: null,
	}

	#view = {
		user: null,
		id: null,
		points: null,
	}

	constructor(user) {
		super()
		this.#state.user = user
		this.width = 180
		this.height = 70
		this.x = 20
		this.y = 20
		const mask = new Graphics().rect(-10, -10, 180, 70).fill('rgba(0,0,0,0.4)')
		this.#view.user = new Text({
			text: `Пользователь: ${this.#state.user.nickname}`,
			style,
		})
		this.#view.id = new Text({
			text: `ID: ${this.#state.user.id}`,
			style,
		})
		this.#view.points = new Text({
			text: `Лучший результат: ${this.#state.user.points}`,
			style,
		})
		this.#view.user.y = 0
		this.#view.id.y = 16
		this.#view.points.y = 32
		this.addChild(mask)
		this.addChild(this.#view.user)
		this.addChild(this.#view.id)
		this.addChild(this.#view.points)
	}

	async update(user) {
		this.#view.user.text = `Пользователь: ${user.nickname}`
		this.#view.id.text = `ID: ${user.id}`
		this.#view.points.text = `Лучший результат: ${user.points}`
	}
}
