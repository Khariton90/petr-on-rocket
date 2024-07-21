import { PrimaryForm } from './entities/primary-form/primary-form'

export class App {
	#api = null
	#root = null
	#primaryForm = null

	constructor(root, api) {
		this.#api = api
		this.#root = root
		this.#primaryForm = new PrimaryForm(this.#root, this.#api)
	}

	init = async () => {
		try {
			const user = await this.#api.getUser()
			this.#primaryForm.init(user)
		} catch (error) {
			this.#primaryForm.login()
		}
	}
}
