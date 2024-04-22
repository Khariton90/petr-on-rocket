import { Container, Graphics, Sprite } from 'pixi.js'
import { ViewStatus } from '../../app.constants'

export class PersonView extends Container {
	#bounds = {
		width: 150,
		height: 150,
	}

	#rootNode
	#state = {
		current: ViewStatus.DEFAULT,
		initialState: {},
	}

	constructor(texture1, texture2, texture3) {
		super()

		this.#createRootNode()
		this.setInvisible()
		this.#state.initialState[ViewStatus.FLY] = this.#getDefaultImage(texture1)
		this.#state.initialState[ViewStatus.CRASH] = this.#getCrashImage(texture2)
		this.#state.initialState[ViewStatus.BOOST] = this.#getBustImage(texture3)

		for (let key in this.#state.initialState) {
			this.#rootNode.addChild(this.#state.initialState[key])
		}
	}

	#createRootNode() {
		const rootNode = new Container()
		this.addChild(rootNode)
		this.#rootNode = rootNode
	}

	setFly() {
		if (this.#state.current === ViewStatus.DEFAULT) {
			this.setVisible()
		}

		this.#setState(ViewStatus.FLY)
	}

	setBoost() {
		this.#setState(ViewStatus.BOOST)
	}

	setCrash() {
		this.#setState(ViewStatus.CRASH)
	}

	setVisible() {
		this.visible = true
	}

	setInvisible() {
		this.visible = false
	}

	#setState(key) {
		if (this.#state.current === key) {
			return
		}
		for (let key in this.#state.initialState) {
			this.#state.initialState[key].visible = false
		}
		this.#state.initialState[key].visible = true
		this.#state.current = key
	}

	#getDefaultImage(image) {
		const texture = new Sprite(image)
		texture.width = this.#bounds.width
		texture.height = this.#bounds.height

		return texture
	}

	#getBustImage(image) {
		const texture = new Sprite(image)
		texture.width = this.#bounds.width
		texture.height = this.#bounds.height

		return texture
	}

	#getCrashImage(image) {
		const texture = new Sprite(image)
		texture.width = this.#bounds.width
		texture.height = this.#bounds.height
		return texture
	}
}
