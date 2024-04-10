export const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getPipeSizePair = (addToPosX = 0) => {
	let yPos = getRandom(window.innerHeight - 100, window.innerHeight - 400)
	return yPos
}
