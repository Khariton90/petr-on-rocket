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
	COMPLETED: 'COMPLETED',
}

export const obstaclesPosX = count => {
	const list = []

	for (let i = 0; i < count; i++) {
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

export const obstacleCountList = [
	10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 400, 450, 500,
	600, 700, 800, 900, 1000,
]

export const DialogText = {
	START: 'ПЕТЯ НА РАКЕТЕ',
	PAUSE: 'ПЕТЯ НА ПАУЗЕ',
	END: 'ПЕТЯ В ПРОЛЁТЕ',
}

export const BASE_URL = import.meta.env.VITE_BASE_URL
export const ADMIN = import.meta.env.VITE_ADMIN
