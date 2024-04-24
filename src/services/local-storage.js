export const APP_KEY = 'account'

export const setAccount = user => {
	localStorage.setItem(APP_KEY, user)
}

export const getAccount = () => {
	const user = localStorage.getItem(APP_KEY)
	return user ?? ''
}

export const deleteAccount = () => {
	localStorage.removeItem(APP_KEY)
}
