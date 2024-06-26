export const getRandom = (min, max) =>
	Math.floor(Math.random() * (max - min) + min)

export const getPipeSizePair = height =>
	-getRandom(height - 100, height - height / 1.7)

export const testForAABB = (object1, object2) => {
	const bounds1 = object1.getBounds()
	const bounds2 = object2.getBounds()

	return (
		bounds1.x < bounds2.x + bounds2.width &&
		bounds1.x + bounds1.width > bounds2.x &&
		bounds1.y < bounds2.y + bounds2.height &&
		bounds1.y + bounds1.height > bounds2.y
	)
}

export const debounce = (callback, timeoutDelay = 100) => {
	let timeoutId

	return (...rest) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay)
	}
}

export const getCutName = (nickname = '') => {
	const length = 18

	return nickname.length <= length
		? nickname
		: `${nickname.substring(0, length)}...`
}
