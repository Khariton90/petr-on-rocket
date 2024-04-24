import { deleteAccount, setAccount } from '../../../services/local-storage'
import { FormEnum } from '../../app.constants'
import { PrimaryFormView } from './primary-form.view'

export class PrimaryForm {
	#node = null
	#view = null
	#api

	#currentTemplate = FormEnum.LOGIN

	#form = null
	#link = null

	#state = {}

	constructor(node, api) {
		this.#node = node
		this.#api = api
		this.#view = new PrimaryFormView()

		this.#state = {
			[FormEnum.LOGIN]: async dto => await this.#api.authUser(dto),
			[FormEnum.PROFILE]: () => this.start(),
			[FormEnum.REGISTER]: async dto => await this.#api.createUser(dto),
		}
	}

	start() {
		console.log(this.#currentTemplate)
		console.log('completed')
	}

	init(value = this.#currentTemplate, data, cb) {
		this.#currentTemplate = value

		if (cb) {
			this.#state[FormEnum.PROFILE] = () => {
				this.#node.replaceChildren()
				cb()
			}
		}

		const template = this.#view.setTemplate(this.#currentTemplate, data)
		this.#node.replaceChildren()
		this.#node.innerHTML = template
		this.#form = this.#node.querySelector('.form')
		this.#link = this.#node.querySelector('.form-link')
		this.#form.addEventListener('submit', this.setHandleSubmit)
		this.#link.addEventListener('click', this.setHandleChangeForm)
	}

	setHandleSubmit = async evt => {
		evt.preventDefault()
		const dto = this.#setFormDto()
		const data = await this.#state[this.#currentTemplate](dto)

		if (!data) {
			this.#onError()
			return
		}

		if (dto.remember) {
			setAccount(data.id)
		}

		this.#onSuccess(data)
	}

	#handleChangeForm(link) {
		if (link === FormEnum.LOGOUT) {
			deleteAccount()
		}
		this.init(link)
	}

	setHandleChangeForm = evt => {
		evt.preventDefault()

		if (evt.target.dataset.link) {
			const link = evt.target.dataset.link
			this.#handleChangeForm(link)
		}
	}

	#onSuccess = dto => {
		this.#form.reset()
		this.#form.querySelector('.button').removeAttribute('disabled')
		this.init(FormEnum.PROFILE, dto)
	}

	#setFormDto() {
		const button = this.#form.querySelector('.button')
		button.setAttribute('disabled', true)

		const dto = {}
		for (const [key, value] of new FormData(this.#form).entries()) {
			dto[key] = value.trim()
		}

		return dto
	}

	#onError() {
		const button = this.#form.querySelector('.button')
		this.#form.classList.add('error')
		setTimeout(() => {
			button.removeAttribute('disabled')
			this.#form.classList.remove('error')
		}, 2000)
	}
}
