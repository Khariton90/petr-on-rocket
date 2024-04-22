import { testForAABB } from '../utils.js'
import Floor from './entities/floor.js'
import ObstacleFactory from './entities/obstacles/obstacle.factory.js'
import Person from './entities/person/person.js'
import { PersonPositon, GameStatus, obstaclesPosX } from './app.constants.js'
import { Dialog } from './entities/dialog/dialog.js'
import { ScoreBoard } from './entities/score-board/score-board.js'
import { GameLevel } from './entities/level/level.js'

export default class GameBoard {
	#app = null
	#person = null
	#flour = null
	#dialog = null
	#scoreBoard = null
	#roof = null

	#screenWidth = window.innerWidth
	#screenHeight = window.innerHeight

	#status = GameStatus.UNKNOWN
	#score = 0
	#level = null
	#speed = 0.5
	#obstacleList = []
	#assets

	#state = {
		levels: [
			{
				count: 1,
				speed: 7,
			},
			{
				count: 2,
				speed: 7.5,
			},
			{
				count: 3,
				speed: 8,
			},
		],
		defaultLevel: 0,
	}

	constructor(app) {
		this.#app = app
		this.#app.width = this.#screenWidth
		this.#app.height = this.#screenHeight
	}

	get state() {
		return this.#state
	}

	get status() {
		return this.#status
	}

	get person() {
		return this.#person
	}

	get score() {
		return this.#score
	}

	set score(value) {
		this.#score = value
	}

	init = async assets => {
		this.#assets = assets

		this.#flour = new Floor(this.#assets)
		this.#roof = new Floor(this.#assets)

		this.#scoreBoard = new ScoreBoard(this.score, this.#assets)

		this.#flour.x = 0
		this.#flour.y = this.#screenHeight - this.#flour.height

		this.#roof.x = 0
		this.#roof.y = 0
		this.#roof.height = 0

		this.#level = new GameLevel(
			{
				width: this.#screenWidth,
				height: this.#screenHeight,
			},
			this.#assets,
			this.state
		)

		const obstacleFactory = new ObstacleFactory(
			this.#app,
			this.#assets,
			this.#scoreBoard
		)

		this.#app.stage.addChild(this.#level)

		this.#obstacleList = obstaclesPosX.map(position =>
			obstacleFactory.createObstacle(position)
		)

		this.#person = new Person(this.#app.stage, this.#assets.person)
		this.#dialog = new Dialog(this.#assets)
		this.#app.stage.addChild(this.#flour)
		this.#app.stage.addChild(this.#roof)
		this.#app.stage.addChild(this.#scoreBoard)
		this.#app.stage.addChild(this.#dialog)
		this.#person.x = PersonPositon.x
		this.#person.y = PersonPositon.y
	}

	update() {
		if (this.#assets) {
			if (this.#status !== GameStatus.START) {
				return
			}

			this.#setGameProcess()
		}
	}

	assignGamePlay() {
		switch (this.#status) {
			case GameStatus.START:
				this.#pause()
				break
			case GameStatus.PAUSE:
				this.#play()
				break
			case GameStatus.END:
				this.#startAgain()
				break
			default:
				this.#start()
		}

		return
	}

	#setInitial() {
		this.#person.x = PersonPositon.x
		this.#scoreBoard.setScore(0)
		this.#scoreBoard.update()
		this.#obstacleList.forEach(container => container.setInitial())
	}

	#setGameProcess() {
		const prevPosition = {
			x: this.#person.x,
			y: this.#person.y,
		}

		this.#level.update(this.#speed)
		this.#flour.update()
		this.#person.update()

		this.#obstacleList.forEach(container => container.update(this.#person.x))

		if (testForAABB(this.#person, this.#flour)) {
			this.#person.y = prevPosition.y
			this.#person.jump()
		}

		if (testForAABB(this.#person, this.#roof)) {
			this.#person.y = prevPosition.y
		}

		this.#obstacleList.forEach(obstacle => {
			this.#setGameOver(this.#person.getRocket(), obstacle.getTop())
			this.#setGameOver(this.#person.getRocket(), obstacle.getBottom())
			this.#setGameOver(this.#person.getHuman(), obstacle.getTop())
			this.#setGameOver(this.#person.getHuman(), obstacle.getBottom())
		})
	}

	#setGameOver(person, obstacle) {
		if (testForAABB(person, obstacle)) {
			this.#person.setCrash()
			this.#status = GameStatus.END
			this.#dialog.endGame()
		}
	}

	#play() {
		this.#status = GameStatus.START
		this.#dialog.startGame()
	}

	#pause() {
		if (this.#status === GameStatus.START) {
			this.#status = GameStatus.PAUSE
			this.#dialog.pause()
		}
	}

	#start() {
		this.score = 0
		this.#scoreBoard.getScore(this.score)
		this.#person.y = PersonPositon.y
		this.#person.setFly()
		this.#dialog.startGame(this.#status)
		this.#status = GameStatus.START
		this.#level.setVisible(this.#state.defaultLevel)
	}

	#startAgain() {
		this.#setInitial()
		this.#start()
		this.#level.setVisible()
	}
}
