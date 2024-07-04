import { BASE_URL } from '../app/app.constants'
import { deleteAccount, getAccount, setAccount } from './local-storage'

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
		this.#baseUrl = `${BASE_URL}/api`
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
				const user = await response.json()
				setAccount(user.id)
				return user
			}
		} catch (error) {
			console.error(error.message)
		}
	}

	async getUser() {
		const id = getAccount()

		if (!id) {
			throw new Error()
		}
		try {
			const response = await fetch(`${this.#baseUrl}/users/find/${id}`)
			if (!response.ok) {
				deleteAccount()
			}
			const user = await response.json()
			return user
		} catch (error) {
			deleteAccount()
			console.error(error.message)
		}
	}

	async getStatistic() {
		try {
			const response = await fetch(`${this.#baseUrl}/users/statistic`)
			const data = await response.json()
			return data
		} catch (error) {
			console.error(error.message)
		}
	}

	async updateUser(dto) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/users/update`,
				this.#options(Method.POST, dto)
			)
			const updatedUser = await response.json()
			return updatedUser
		} catch (error) {
			console.error(error.message)
		}
	}

	async getTotalCount() {
		try {
			const response = await fetch(`${this.#baseUrl}/users/total`)
			const total = await response.json()
			return total
		} catch (error) {
			return 0
		}
	}

	#options(method, body) {
		const options = {
			method,
			headers: Headers,
			body: JSON.stringify(body),
		}

		return options
	}
}
