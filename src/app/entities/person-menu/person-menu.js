import { PersonMenuView } from './person-menu.view'

export class PersonMenu {
	#form = null
	#view = null
	#content = null
	#api = null
	constructor(node, contentNode, api) {
		this.#form = node
		this.#content = contentNode
		this.#api = api
	}

	init() {
		this.#form.addEventListener('change', this.change)
		this.#view = new PersonMenuView(this.#content, this.#api)
	}

	change = async evt => {
		const key = parseInt(evt.target.value, 10)

		if (key === 2) {
			const data = await this.#api.getStatistic()
			console.log(data)

			this.#view.createTemplate(key, data)
		} else {
			this.#view.createTemplate(key)
		}
	}
}
