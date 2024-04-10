import { getPipeSizePair } from '../utils.js'
import Floor from './floor.js'
import ObstacleFactory from './obstacles/obstacle.factory.js'
import Person from './person/person.js'
import { INTERVAL, PersonPositon } from '../constants.js'
import { ControlKeys } from '../constants.js'
import { LoginDialog } from './dialogs/login-dialog.js'
import { ScoreBoard } from './score-board/score-board.js'
import { Coin } from './coin.js'
import { Assets, Sprite, TilingSprite } from 'pixi.js'

const GameStatus = {
	UNKNOWN: 'UNKNOWN',
	START: 'START',
	PAUSE: 'PAUSE',
	END: 'END',
}

const obstaclePosition = [
	[window.innerWidth + 200, getPipeSizePair()],
	[window.innerWidth + 900, getPipeSizePair()],
	[window.innerWidth + 1400, getPipeSizePair()],
	[window.innerWidth + 2000, getPipeSizePair()],
]

const background = await Assets.load('../black-forest-1440.png')

export default class GameBoard {
	#app = null
	#person = null
	#flour = null
	#obstacles = []
	#loginDialog = null
	#scoreBoard = null
	#roof = null

	#screenHeight = window.innerHeight
	#screenWidth = window.innerWidth

	#status = GameStatus.UNKNOWN
	score = 0
	#background = null
	#background2 = null
	#coin = null
	constructor(app, texture, textureList) {
		this.#app = app
		this.#app.width = window.innerWidth
		this.#app.height = window.innerHeight
		this.#background = new TilingSprite({
			texture: background,
			width: this.#app.screen.width,
			height: this.#app.screen.height,
		})

		this.#background.tilePosition.set(0, 0)
		this.#background.tileScale.y = 2

		this.#flour = new Floor()
		this.#roof = new Floor()
		this.#loginDialog = new LoginDialog()
		this.#scoreBoard = new ScoreBoard(this.score)
		// this.#coin = new Coin()

		this.#flour.x = 0
		this.#flour.y = window.innerHeight - this.#flour.height

		this.#roof.x = 0
		this.#roof.y = 0
		this.#roof.height = 0

		this.#app.stage.addChild(this.#background)

		const obstacleFactory = new ObstacleFactory(this.#app)

		this.#obstacles.push(...obstacleFactory.create(...obstaclePosition[0]))

		this.#obstacles.push(...obstacleFactory.create(...obstaclePosition[1]))

		this.#obstacles.push(...obstacleFactory.create(...obstaclePosition[2]))

		this.#obstacles.push(...obstacleFactory.create(...obstaclePosition[3]))

		this.#app.stage.addChild(this.#flour)
		this.#app.stage.addChild(this.#roof)
		this.#app.stage.addChild(this.#loginDialog)
		this.#app.stage.addChild(this.#scoreBoard)

		this.#person = new Person(this.#app.stage, textureList)
		this.#person.x = PersonPositon.x
		this.#person.y = PersonPositon.y
	}

	update() {
		this.#background.tilePosition.x -= 2
		if (this.#status === GameStatus.START) {
			this.startGame()
		}
	}

	onClick(evt) {
		if (this.#status === GameStatus.START) {
			return
		}

		if (this.#status === GameStatus.END) {
			this.score = 0
			this.#scoreBoard.getScore(this.score)
			this.#person.y = PersonPositon.y
			this.#person.setFly()
			this.#obstacles.map(el => (el.x += window.innerWidth))
		}

		this.#loginDialog.startGame()
		const appNode = document.querySelector('.app')
		appNode.classList.add('active')
		appNode.classList.remove('stop')
		this.#status = GameStatus.START
	}

	startGame() {
		const prevPosition = {
			x: this.#person.x,
			y: this.#person.y,
		}

		this.#person.update()

		if (this.testForAABB(this.#person, this.#flour)) {
			this.#person.y = prevPosition.y
			this.#person.jump()
		}

		if (this.testForAABB(this.#person, this.#roof)) {
			this.#person.y = prevPosition.y
		}

		for (let i = 0; i < this.#obstacles.length; i++) {
			if (this.testForAABB(this.#person, this.#obstacles[i])) {
				this.#person.setCrash()

				const appNode = document.querySelector('.app')
				appNode.classList.add('stop')
				this.#status = GameStatus.END
				this.#loginDialog.endGame()
			}

			if (i % 2 === 0) {
				this.#obstacles[i].update()
				this.#obstacles[i + 1].update()

				if (this.#obstacles[i].x < -this.#obstacles[i].width) {
					this.score += 1
					this.#scoreBoard.getScore(this.score)
					const posY = getPipeSizePair()
					this.#obstacles[i].x = this.#screenWidth + this.#obstacles[i].width
					this.#obstacles[i + 1].x =
						this.#screenWidth + this.#obstacles[i + 1].width

					this.#obstacles[i].y = posY
					this.#obstacles[i + 1].y =
						-this.#screenHeight + this.#obstacles[i].y - INTERVAL
				}
			}
		}
	}

	testForAABB(object1, object2) {
		const bounds1 = object1.getBounds()
		const bounds2 = object2.getBounds()

		return (
			bounds1.x < bounds2.x + bounds2.width &&
			bounds1.x + bounds1.width > bounds2.x &&
			bounds1.y < bounds2.y + bounds2.height &&
			bounds1.y + bounds1.height > bounds2.y
		)
	}

	onKeyDown(evt) {
		if (this.#status === GameStatus.END) {
			return
		}

		if (evt.code === ControlKeys.LEFT) {
			this.#person.startLeftMove()
		}

		if (evt.code === ControlKeys.RIGHT) {
			this.#person.startRightMove()
		}

		if (evt.code === ControlKeys.UP) {
			this.#person.jump()
		}
	}

	onKeyUp(evt) {
		if (this.#status === GameStatus.END) {
			return
		}

		this.#person.setFly()

		if (evt.code === ControlKeys.LEFT) {
			this.#person.stopLeftMove()
		}
		if (evt.code === ControlKeys.RIGHT) {
			this.#person.stopRightMove()
			this.play()
		}
	}

	play() {
		this.#app.start()
	}
}
