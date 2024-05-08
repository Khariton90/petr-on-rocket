import { Container, Graphics, Text } from 'pixi.js'
import { getCutName } from '../../../utils'

const style = {
	fontSize: 12,
	fill: `#FFCC33`,
	dropShadow: true,
	dropShadowColor: '#000',
	dropShadowAngle: Math.PI / 6,
	dropShadowDistance: 2,
	letterSpacing: 1.5,
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
	}

	init = async () => {
		this.width = 180
		this.height = 70
		this.x = 20
		this.y = 20

		this.#view.user = new Text({
			text: `Пользователь: ${getCutName(this.#state.user.nickname)}`,
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

		this.addChild(this.#view.user)
		this.addChild(this.#view.id)
		this.addChild(this.#view.points)
	}

	async update(user) {
		this.#view.user.text = `Пользователь: ${getCutName(user.nickname)}`
		this.#view.id.text = `ID: ${user.id}`
		this.#view.points.text = `Лучший результат: ${user.points}`
	}
}
