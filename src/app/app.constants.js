export const INTERVAL = 300

export const ViewStatus = {
	DEFAULT: 'DEFAULT',
	FLY: 'FLY',
	BOOST: 'BOOST',
	CRASH: 'CRASH',
}

export const ControlKeys = {
	LEFT: 'KeyA',
	RIGHT: 'KeyD',
	UP: 'Space',
	ARROW_UP: 'ArrowUp',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
	ENTER: 'Enter',
}

export const PersonPositon = {
	x: 100,
	y: window.innerHeight / 2,
}

export const SPEED = 7

export const GameStatus = {
	UNKNOWN: 'UNKNOWN',
	START: 'START',
	PAUSE: 'PAUSE',
	END: 'END',
}

export const obstaclesPosX = () => {
	const list = []

	for (let i = 0; i < 5; i++) {
		if (!list.length) {
			list.push(0)
		} else {
			const value = list[i - 1] + 500

			list.push(value)
		}
	}

	return list
}

export const FormEnum = {
	LOGIN: 'login',
	REGISTER: 'register',
	PROFILE: 'profile',
	LOGOUT: 'logout',
}
