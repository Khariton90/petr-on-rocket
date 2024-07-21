import { PersonMenuView } from './person-menu.view'

export class PersonMenu {
	#form = null
	#view = null
	#content = null
	#api = null
	#profile = null

	#state = {
		user: null,
	}
	constructor(node, contentNode, api) {
		this.#form = node
		this.#content = contentNode
		this.#api = api
	}

	async init(user, profile) {
		this.#form.addEventListener('change', this.change)
		this.#view = new PersonMenuView(this.#content, this.#api)
		this.#state.user = user
		this.#profile = profile
	}

	change = async evt => {
		const key = parseInt(evt.target.value, 10)

		switch (key) {
			case 2: {
				const data = await this.#api.getStatistic()
				this.#view.createTemplate(key, data)
				break
			}
			case 4: {
				this.#view.createTemplate(key, this.#state.user)
				const profileUsername = document.querySelector('.profile-username')
				const profileBtn = document.querySelector('.profile-username-btn')
				profileUsername.addEventListener('dblclick', this.#toggleTextField)
				profileBtn.addEventListener('click', this.#changeUsername)
				break
			}
			default: {
				this.#view.createTemplate(key)
			}
		}
	}

	#toggleTextField = () => {
		const profileUsername = document.querySelector('.profile-username')
		const profileUsernameField = document.querySelector(
			'.profile-username-field'
		)
		const profileBtn = document.querySelector('.profile-username-btn')
		profileUsernameField.classList.remove('visually-hidden')
		profileBtn.classList.remove('visually-hidden')
		profileUsername.classList.add('visually-hidden')
		profileUsernameField.value = profileUsername.textContent
	}

	#changeUsername = async () => {
		const profileUsername = document.querySelector('.profile-username')
		const profileUsernameField = document.querySelector(
			'.profile-username-field'
		)
		const profileBtn = document.querySelector('.profile-username-btn')

		if (
			profileUsername.textContent.toLowerCase() ===
			profileUsernameField.value.toLowerCase().trim()
		) {
			this.#backToUsernameText()
			return
		}

		profileBtn.setAttribute('disabled', true)
		const updatedUser = await this.#api.updateUser({
			...this.#state.user,
			nickname: profileUsernameField.value.toLowerCase(),
		})

		if (updatedUser.statusCode >= 400) {
			this.#handleError()
			return
		}

		this.#state.user = updatedUser
		this.#profile.update(this.#state.user)
		this.#backToUsernameText()
		profileBtn.removeAttribute('disabled')
	}

	#backToUsernameText() {
		const profileUsername = document.querySelector('.profile-username')
		const profileUsernameField = document.querySelector(
			'.profile-username-field'
		)
		const profileBtn = document.querySelector('.profile-username-btn')
		profileUsernameField.classList.add('visually-hidden')
		profileBtn.classList.add('visually-hidden')
		profileUsername.classList.remove('visually-hidden')
		profileUsername.textContent = profileUsernameField.value
	}

	#handleError() {
		const profileUsernameField = document.querySelector(
			'.profile-username-field'
		)
		const profileBtn = document.querySelector('.profile-username-btn')
		profileUsernameField.classList.add('error')
		profileBtn.classList.add('error')

		setTimeout(() => {
			profileUsernameField.classList.remove('error')
			profileBtn.classList.remove('error')
			profileBtn.removeAttribute('disabled')
		}, 1000)
	}
}
