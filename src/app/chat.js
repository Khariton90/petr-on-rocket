import { io } from 'socket.io-client'
import { BASE_URL } from './app.constants'

const messages = document.querySelector('#messages')
const chatForm = document.querySelector('.chat-form')
const messageTemplate = document.querySelector('.message-template')
const dialog = document.querySelector('.dialog')
const burger = document.querySelector('.burger')

export class Chat {
	#socket = null
	#state = null
	#count = 0
	#api = null
	#page = 0
	#isLoading = false
	isNothing = false
	#messages = []

	constructor(state, api) {
		this.#state = state
		this.#api = api
	}

	async init() {
		this.#socket = io(BASE_URL)
		this.#socket.on('message', data => {
			this.#handleNewMessage(data)
		})
		await this.getMessages()
		this.#handleWelcomeMessage()

		chatForm.addEventListener('submit', this.#handleSubmitNewMessage)

		messages.addEventListener('scroll', evt =>
			this.#findMessagesByScrollUp(evt)
		)
	}

	#findMessagesByScrollUp(evt) {
		if (evt.target.scrollTop >= 0) {
			this.#resetCount()
		}
		const posTop = evt.target.scrollHeight - evt.target.clientHeight
		if (posTop + evt.target.scrollTop <= 1 && !this.#isLoading) {
			this.#isLoading = true
			this.getMessages()
			this.#resetCount()
		}
	}

	async getMessages() {
		const messagesList = await this.#api.getMessages(this.#page)
		if (messagesList.length) {
			messagesList.forEach(message =>
				messages.append(this.#createNewMessage(message))
			)

			this.#page += 1
		}
		this.#isLoading = false
	}

	createUnloadMessage() {
		const message = {
			message: `Пользователь ${this.#state.user.nickname} вышел из игры`,
			user: this.#state.user.nickname,
		}

		this.#socket.emit('message', message)
	}

	resetCount() {
		this.#resetCount()
	}

	#handleWelcomeMessage() {
		const message = {
			message: `Пользователь ${this.#state.user.nickname} вошел в игру`,
			user: this.#state.user.nickname,
		}
		this.#socket.emit('message', message)
		burger.classList.add('active')
	}

	#handleSubmitNewMessage = evt => {
		evt.preventDefault()
		const data = new FormData(chatForm)
		const message = data.get('message')
		if (message) {
			this.#socket.emit('message', {
				message: message,
				user: this.#state.user.nickname,
			})
		}
	}

	#handleNewMessage = message => {
		messages.prepend(this.#createNewMessage(message))

		if (messages.scrollTop >= 0) {
			messages.scrollTo(0, 0)
			this.#resetCount()
		}

		if (message.user === this.#state.user.nickname) {
			chatForm.reset()
		}
	}

	#createNewMessage = message => {
		this.#messages
			.filter(item => item.id === message.id)
			.sort((a, b) => a.createdAt < b.createdAt)
		this.#messages.push(message)
		this.#incCount(message)

		const element = messageTemplate.content.cloneNode(true)
		if (message.user === this.#state.user.nickname) {
			element.querySelector('.chat-message').classList.add('active')
		}

		element.querySelector('.chat-message-body-text').textContent =
			message.message
		//TODO
		element.querySelector('.chat-message-body-time').textContent = `${new Date(
			message.createdAt
		).toLocaleDateString()}, ${new Date(
			message.createdAt
		).toLocaleTimeString()}`

		element.querySelector('.chat-message-user').textContent = message.user

		return element
	}

	#incCount(message) {
		if (message.user === this.#state.user.nickname) {
			return
		}
		this.#count += 1
		const burger = document.querySelector('.burger')
		burger.classList.add('active')
		burger.dataset.count = this.#count
	}

	#resetCount() {
		if (!dialog.open) {
			return
		}

		burger.classList.remove('active')
		this.#count = 0
		burger.dataset.count = this.#count
	}
}
