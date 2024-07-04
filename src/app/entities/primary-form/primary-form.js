import { deleteAccount, setAccount } from '../../../services/local-storage'
import { FormEnum } from '../../app.constants'
import { PrimaryFormView } from './primary-form.view'
import { Application } from 'pixi.js'
import { GameBoardAssets } from '../../game-board.assets'
import GameBoard from '../../game-board'
import { Controller } from '../../controller/controller'
import { Chat } from '../../chat'

const burger = document.querySelector('.burger')

export class PrimaryForm {
	#node = null
	#view = null
	#api
	#currentTemplate = FormEnum.LOGIN
	#form = null
	#link = null
	#state = {
		statistic: [],
		user: null,
		count: 0,
	}

	#app = null

	constructor(node, api) {
		this.#node = node
		this.#api = api
		this.#view = new PrimaryFormView()
		this.#app = new Application()

		this.#state = {
			[FormEnum.LOGIN]: async dto => await this.#api.authUser(dto),
			[FormEnum.PROFILE]: () => this.start(),
			[FormEnum.REGISTER]: async dto => await this.#api.createUser(dto),
			statistic: [],
		}
	}

	setHandleChangeForm = evt => {
		evt.preventDefault()

		if (!evt.target.dataset.link) {
			return
		}

		const link = evt.target.dataset.link
		this.#handleChangeForm(link)
	}

	start() {
		this.#node.replaceChildren()
		this.#render()
	}

	init(data) {
		this.#profile(data)
	}

	login() {
		this.#currentTemplate = FormEnum.LOGIN
		this.#replace()
		const template = this.#view.setTemplate(this.#currentTemplate)
		this.#createTemplate(template)
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

	#register() {
		this.#currentTemplate = FormEnum.REGISTER
		this.#replace()
		const template = this.#view.setTemplate(this.#currentTemplate)
		this.#createTemplate(template)
	}

	#logout() {
		deleteAccount()
		this.login()
	}

	#profile = async data => {
		const stats = await this.#api.getStatistic()
		this.#state.count = await this.#api.getTotalCount()
		const profileData = {
			user: { ...data },
			stats,
		}
		this.#state.user = profileData.user
		this.#state.statistic = [...stats]
		this.#currentTemplate = FormEnum.PROFILE
		this.#replace()
		const template = this.#view.setTemplate(this.#currentTemplate, profileData)
		this.#createTemplate(template)
	}

	#handleChangeForm(link) {
		switch (link) {
			case FormEnum.REGISTER:
				this.#register()
				break
			case FormEnum.LOGIN:
				this.login()
				break
			case FormEnum.LOGOUT:
				this.#logout()
		}
	}

	#onSuccess = data => {
		this.#profile(data)
		this.#form.reset()
		this.#form.querySelector('.button').removeAttribute('disabled')
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

	#replace() {
		this.#node.replaceChildren()
	}

	async #createTemplate(template) {
		this.#node.innerHTML = template
		this.#form = this.#node.querySelector('.form')
		this.#link = this.#node.querySelector('.form-link')
		this.#form.addEventListener('submit', this.setHandleSubmit)
		this.#link.addEventListener('click', this.setHandleChangeForm)

		if (!this.#state.count) {
			this.#state.count = await this.#api.getTotalCount()
		}

		this.#node.querySelector(
			'.player-count'
		).textContent = `Зарегистрировано: ${this.#state.count}`
	}

	#render = async () => {
		const assets = new GameBoardAssets()
		await this.#app.init({ backgroundAlpha: 0, resizeTo: window })
		const gameBoard = new GameBoard(this.#app, this.#state, this.#api)
		await assets.init()
		await gameBoard.init(assets, this.#state)
		this.#app.ticker.speed = 1
		const rootController = new Controller(gameBoard)
		this.#app.ticker.add(gameBoard.update, gameBoard)
		this.#node.appendChild(this.#app.canvas)
		document.addEventListener('keydown', evt => rootController.onKeyDown(evt))
		document.addEventListener('keyup', evt => rootController.onKeyUp(evt))

		const count = await this.#api.getTotalCount()
		this.#view.setCountText(count)
		const chat = new Chat(this.#state)
		chat.init()

		burger.classList.add('visible')
		burger.addEventListener('click', () => {
			gameBoard.pause()
			this.#view.onOpenModal()
			chat.resetCount()
		})
		document.addEventListener('visibilitychange', () => {
			if (document.hidden) {
				gameBoard.pause()
			}
		})
	}
}
