import { Assets, Container, Loader, Sprite } from 'pixi.js'
import { PersonView } from './person.view'
import { PersonPositon } from '../../constants'

export default class Person {
	#GRAVITY_FORCE = 0.2
	#SPEED = 3
	#JUMP_FORCE = 5

	#velocityY = 0
	#velocityX = 0

	#movement = {
		x: 0,
		y: 0,
	}

	#directionContext = {
		left: 0,
		right: 0,
	}

	#texture
	#view

	constructor(stage, textureList) {
		this.#view = new PersonView(...textureList)
		stage.addChild(this.#view)
		this.#view.setFly()
	}

	get x() {
		return this.#view.x
	}

	set x(value) {
		this.#view.x = value
	}

	get y() {
		return this.#view.y
	}

	set y(value) {
		this.#view.y = value
	}

	update() {
		this.#velocityX = this.#movement.x * this.#SPEED
		this.x += this.#velocityX
		this.#velocityY += this.#GRAVITY_FORCE
		this.y += this.#velocityY
	}

	setFly() {
		this.#view.setFly()
	}

	setCrash() {
		this.#view.setCrash()
	}

	getBounds() {
		return this.#view.getBounds()
	}

	stay() {
		this.#velocityY = 0
		this.setCrash()
	}

	startLeftMove() {
		if (this.x > PersonPositon.x) {
			this.#directionContext.left = -1

			if (this.#directionContext.right > 0) {
				this.#movement.x = 0
				return
			}
			this.#movement.x = -1
		}
	}

	startRightMove() {
		this.#directionContext.right = 1
		if (this.#directionContext.left < 0) {
			this.#movement.x = 0
			return
		}
		this.#movement.x = 1
	}

	stopLeftMove() {
		this.#directionContext.left = 0
		this.#movement.x = this.#directionContext.right
	}

	stopRightMove() {
		this.#directionContext.right = 0
		this.#movement.x = this.#directionContext.left
	}

	jump() {
		this.#view.setBoost()
		this.#velocityY -= this.#JUMP_FORCE
	}
}
