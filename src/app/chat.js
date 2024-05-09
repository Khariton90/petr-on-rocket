import { io } from 'socket.io-client'

const messages = document.querySelector('#messages')
const chatForm = document.querySelector('.chat-form')
const messageTemplate = document.querySelector('.message-template')

export class Chat {
	#socket = null
	#state = null
	constructor(state) {
		this.#state = state
	}
	init() {
		this.#socket = io('http://localhost:3000')
		this.#socket.on('message', data => {
			this.#handleNewMessage(data)
		})

		this.#handleWelcomeMessage()
		chatForm.addEventListener('submit', this.#handleSubmitNewMessage)
	}

	#handleWelcomeMessage() {
		const message = {
			message: `Пользователь ${this.#state.user.nickname} вошел в игру`,
			user: this.#state.user.nickname,
		}
		this.#socket.emit('message', message)
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
		return element
	}
}
