import { deleteAccount, getAccount, setAccount } from './local-storage'

const BASE_URL = 'http://localhost:3000/api'

const Method = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
}

const Headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
}

export class ApiServices {
	#baseUrl

	constructor(url) {
		this.#baseUrl = BASE_URL
	}

	#options(method, body) {
		const options = {
			method,
			headers: Headers,
			body: JSON.stringify(body),
		}

		return options
	}

	async createUser(dto) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/users`,
				this.#options(Method.POST, dto)
			)

			if (response.status !== 403) {
				const user = await response.json()
				setAccount(user.id)
				return user
			}

			return false
		} catch (error) {
			console.error(error.message)
		}
	}

	async authUser(dto) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/users/auth`,
				this.#options(Method.POST, dto)
			)

			if (response.ok) {
				return await response.json()
			}

			return false
		} catch (error) {
			console.error(error.message)
		}
	}

	async getUser(id) {
		try {
			const response = await fetch(`${this.#baseUrl}/users/find/${id}`)
			const user = await response.json()

			return user
		} catch (error) {
			console.error(error.message)
		}
	}

	async getStatictic() {
		try {
			const response = await fetch(`${this.#baseUrl}/users/statistic`)
			const data = await response.json()
			return data
		} catch (error) {
			console.error(error.message)
		}
	}
}
