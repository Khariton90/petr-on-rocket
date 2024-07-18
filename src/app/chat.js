import { io } from 'socket.io-client'
import { BASE_URL } from './app.constants'

const messages = document.querySelector('#messages')
const chatForm = document.querySelector('.chat-form')
const messageTemplate = document.querySelector('.message-template')

export class Chat {
	#socket = null
	#state = null

	#count = 0

	constructor(state) {
		this.#state = state
	}
	init() {
		this.#socket = io(BASE_URL)
		this.#socket.on('message', data => {
			this.#handleNewMessage(data)
		})

		this.#handleWelcomeMessage()
		chatForm.addEventListener('submit', this.#handleSubmitNewMessage)

		messages.addEventListener('scroll', evt => {
			if (evt.target.scrollTop === 0) {
				this.#resetCount()
			}
		})
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

		const burger = document.querySelector('.burger')
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
		const dialog = document.querySelector('.dialog')

		if (messages.scrollTop >= 0) {
			messages.scrollTo(0, 0)

			if (dialog.open) {
				this.#resetCount()
			}
		}

		if (message.user === this.#state.user.nickname) {
			chatForm.reset()
		}
	}

	#createNewMessage = message => {
		const element = messageTemplate.content.cloneNode(true)
		if (message.user === this.#state.user.nickname) {
			element.querySelector('.chat-message').classList.add('active')
		}

		element.querySelector('.chat-message-body-text').textContent =
			message.message
		element.querySelector('.chat-message-body-time').textContent =
			new Date().toLocaleTimeString()
		element.querySelector('.chat-message-user').textContent = message.user

		this.#count += 1
		const burger = document.querySelector('.burger')
		burger.classList.add('active')
		burger.dataset.count = this.#count
		return element
	}

	#resetCount() {
		const burger = document.querySelector('.burger')
		burger.classList.remove('active')
		this.#count = 0
		burger.dataset.count = this.#count
	}
}
