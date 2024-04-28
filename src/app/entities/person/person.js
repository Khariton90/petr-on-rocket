import { PersonView } from './person.view.js'
import { PersonPositon } from '../../app.constants.js'
import { Rocket } from '../rocket/rocket.js'
import { Human } from '../human/human.js'

export default class Person {
	#GRAVITY_FORCE = 0.2
	#SPEED = 3
	#JUMP_FORCE = 5
	#MAX_VELOCITY = -6

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

	#view
	#rocket
	#human
	#prevPosition = {
		x: 0,
		y: 0,
	}

	constructor(stage, textureList) {
		this.#view = new PersonView(...textureList)
		this.#rocket = new Rocket(this.#view)
		this.#human = new Human(this.#view)

		stage.addChild(this.#view)
		stage.addChild(this.#rocket)
		stage.addChild(this.#human)
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

	get prevPosition() {
		return this.#prevPosition
	}

	setCompleted() {
		this.#movement.x = 2
		this.x += this.#movement.x * this.#SPEED
	}

	update() {
		this.#prevPosition.x = this.x
		this.#prevPosition.y = this.y

		this.#velocityX = this.#movement.x * this.#SPEED
		this.x += this.#velocityX
		this.#velocityY += this.#GRAVITY_FORCE
		this.y += this.#velocityY

		this.#rocket.update()
		this.#human.update()
	}

	setFly() {
		this.#view.setFly()
	}

	setInitial() {
		this.#directionContext.left = 0
		this.#directionContext.right = 0
		this.#movement.x = 0
		this.#movement.y = 0
	}

	setCrash() {
		this.#view.setCrash()

		this.#directionContext.left = 0
		this.#directionContext.right = 0
		this.#movement.x = 0
		this.#movement.y = 0
	}

	getBounds() {
		return this.#view.getBounds()
	}

	getRocket() {
		return this.#rocket
	}

	getHuman() {
		return this.#human
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
		if (this.#velocityY > this.#MAX_VELOCITY) {
			this.#view.setBoost()
			this.#velocityY -= this.#JUMP_FORCE
		}
	}
}
