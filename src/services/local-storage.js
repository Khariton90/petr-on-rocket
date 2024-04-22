export const accounts = 'accounts'

export const setLocalAccount = accountList => {
	localStorage.setItem(accounts, accountList)
}

export const getLocalAccount = () => {
	return localStorage.getItem(accounts) || []
}
