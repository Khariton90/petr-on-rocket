import { testForAABB } from '../utils.js'
import Floor from './entities/floor.js'
import Person from './entities/person/person.js'
import {
	PersonPositon,
	GameStatus,
	obstacleCountList,
} from './app.constants.js'
import { Dialog } from './entities/dialog/dialog.js'
import { ScoreBoard } from './entities/score-board/score-board.js'
import { GameLevel } from './entities/level/level.js'
import { Profile } from './entities/profile/profile.js'
import { Scene } from './entities/scene/scene.js'

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
	#assets
	#profile = null
	#api
	#completed = false
	#scene = null
	#state = {
		user: null,
	}

	constructor(app, state, api) {
		this.#app = app
		this.#app.width = this.#screenWidth
		this.#app.height = this.#screenHeight
		this.#state.user = state.user
		this.#api = api
		this.#profile = new Profile(this.#state.user)
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

	init = async (assets, user) => {
		this.#assets = assets
		this.#flour = new Floor(this.#assets)
		this.#roof = new Floor(this.#assets)
		this.#scoreBoard = new ScoreBoard(
			this.score,
			this.#assets,
			this.#state.user.level
		)
		this.#flour.x = 0
		this.#flour.y = this.#screenHeight - this.#flour.height
		this.#flour.width = this.#screenWidth
		this.#roof.x = 0
		this.#roof.y = 0
		this.#roof.height = 0
		this.#level = new GameLevel(
			{
				width: this.#app.width,
				height: this.#app.height,
			},
			this.#assets,
			this.state
		)

		this.#scene = new Scene(
			{
				width: this.#screenWidth,
				height: this.#screenHeight,
			},
			this.#app,
			this.#assets,
			this.#scoreBoard,
			this.#state
		)
		this.#scene.create()
		this.#app.stage.addChild(this.#level)
		this.#person = new Person(this.#app.stage, this.#assets.person)
		this.#dialog = new Dialog(this.#assets)

		this.#dialog.on('pointerdown', event => {
			if (this.#status !== GameStatus.START) {
				this.assignGamePlay()
			}
		})

		this.#app.stage.addChild(this.#scene)
		this.#dialog.eventMode = 'static'
		this.#profile.init(user)
		this.#app.stage.addChild(this.#flour)
		this.#app.stage.addChild(this.#roof)
		this.#app.stage.addChild(this.#scoreBoard)
		this.#app.stage.addChild(this.#dialog)
		this.#person.x = PersonPositon.x
		this.#person.y = PersonPositon.y
		this.#app.stage.addChild(this.#profile)
	}

	update() {
		this.#setGameProcess()
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
		this.#person.y = PersonPositon.y
		this.#scoreBoard.setScore(0)
		this.#scoreBoard.update()
		this.#scene.setInitial()
		this.#person.setInitial()
	}

	async #setLevelComplete() {
		this.#level.update(this.#speed)
		this.#person.setCompleted()
		this.#scene.update(this.#person)

		if (this.#person.x >= this.#app.width) {
			this.#dialog.endGame()
			this.#status = GameStatus.END
			this.#completed = false
			const points = this.#scoreBoard.getScore()

			const userPoints =
				points > this.#state.user.points ? points : this.#state.user.points

			this.#scoreBoard.setLevelCount(obstacleCountList[this.#state.user.level])
			this.#scoreBoard.setLevelCount(obstacleCountList[this.#state.user.level])

			this.#state.user.level += 1
			const user = {
				...this.#state.user,
				points: userPoints,
				level: this.#state.user.level,
			}
			this.#state.user = await this.#api.updateUser(user)
			this.#profile.update(this.#state.user)
			this.#level.updateText(this.#state.user.level)
			this.#scene.setInitial()
		}
	}

	#setGameProcess() {
		if (this.#status !== GameStatus.START) {
			return
		}

		if (this.#completed) {
			this.#setLevelComplete()
			return
		}

		const obstacleList = this.#scene.obstacleList

		this.#level.update(this.#speed)
		this.#flour.update()
		this.#person.update()

		this.#scene.update(this.#person)

		if (testForAABB(this.#person, this.#flour)) {
			this.#person.y = this.#person.prevPosition.y
			this.#person.jump()
		}

		if (testForAABB(this.#person, this.#roof)) {
			this.#person.y = this.#person.prevPosition.y
		}

		obstacleList.forEach(obstacle => {
			this.#setGameOver(this.#person.getRocket(), obstacle.getTop())
			this.#setGameOver(this.#person.getRocket(), obstacle.getBottom())
			this.#setGameOver(this.#person.getHuman(), obstacle.getTop())
			this.#setGameOver(this.#person.getHuman(), obstacle.getBottom())
		})

		this.#score = this.#scoreBoard.getScore()
		if (!obstacleList.length) {
			this.#completed = true
		}
	}

	async #setGameOver(person, obstacle) {
		if (testForAABB(person, obstacle)) {
			this.#person.setCrash()
			this.#status = GameStatus.END
			this.#dialog.endGame()
			const points = this.#scoreBoard.getScore()
			const user = {
				...this.#state.user,
				points,
			}

			if (points > this.#state.user.points) {
				this.#state.user = await this.#api.updateUser(user)
				this.#profile.update(this.#state.user)
			}
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
		this.#level.showLevelText()
	}

	#startAgain() {
		this.#setInitial()
		this.#start()
		this.#level.showLevelText()
	}
}
