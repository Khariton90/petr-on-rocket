import { testForAABB } from '../utils.js'
import Floor from './entities/floor.js'
import Person from './entities/person/person.js'
import {
	PersonPositon,
	GameStatus,
	obstacleCountList,
	DialogText,
} from './app.constants.js'
import { Dialog } from './entities/dialog/dialog.js'
import { ScoreBoard } from './entities/score-board/score-board.js'
import { GameLevel } from './entities/level/level.js'
import { Profile } from './entities/profile/profile.js'
import { Scene } from './entities/scene/scene.js'
import { PersonMenu } from './entities/person-menu/person-menu.js'

const dialogOptions = document.querySelector('.dialog-container')
const form = document.querySelector('.dialog-form')

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

	#personMenu = null

	constructor(app, state, api) {
		this.#app = app
		this.#app.width = this.#screenWidth
		this.#app.height = this.#screenHeight
		this.#state.user = state.user
		this.#api = api
		this.#profile = new Profile(this.#state.user)
		this.#personMenu = new PersonMenu(form, dialogOptions, this.#api)
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

	init = async (assets, state) => {
		this.#assets = assets
		this.#state = state

		this.#scoreBoard = new ScoreBoard(
			this.score,
			this.#assets,
			this.#state.user.level
		)

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

		this.#app.stage.addChild(this.#level)
		this.#person = new Person(this.#app.stage, this.#assets.person)
		this.#flour = new Floor(this.#assets)
		this.#roof = new Floor(this.#assets)
		this.#flour.x = 0
		this.#flour.y = this.#screenHeight - this.#flour.height
		this.#flour.width = this.#screenWidth
		this.#roof.x = 0
		this.#roof.y = 0
		this.#roof.height = 0
		this.#dialog = new Dialog(this.#assets)
		this.#scene.create()
		this.#dialog.on('pointerdown', event => {
			if (this.#status !== GameStatus.START) {
				this.assignGamePlay()
			}
		})

		this.#app.stage.addChild(this.#scene)
		this.#dialog.eventMode = 'static'
		this.#profile.init(this.#state.user)
		this.#app.stage.addChild(this.#flour)
		this.#app.stage.addChild(this.#roof)
		this.#app.stage.addChild(this.#scoreBoard)
		this.#app.stage.addChild(this.#dialog)
		this.#person.x = PersonPositon.x
		this.#person.y = PersonPositon.y
		this.#app.stage.addChild(this.#profile)

		this.#personMenu.init(this.#state.user, this.#profile)
	}

	update(ticker) {
		if (this.#completed) {
			this.#setLevelComplete(ticker.deltaTime)
			return
		}

		this.#setGameProcess(ticker.deltaTime)
	}

	assignGamePlay() {
		switch (this.#status) {
			case GameStatus.START:
				this.pause()
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

	async #setLevelComplete(delta) {
		this.#person.setCompleted()
		this.#scene.update(delta)

		if (this.#person.x >= this.#app.width) {
			this.#dialog.update(DialogText.START)
			this.#status = GameStatus.END
			this.#completed = false
			const points = this.#scoreBoard.getScore()
			const userPoints =
				points > this.#state.user.points ? points : this.#state.user.points
			this.#scoreBoard.setLevelCount(obstacleCountList[this.#state.user.level])
			this.#state.user.level += 1
			this.#scene.changeLevelSpeed(this.#state.user.level)
			const user = {
				id: this.#state.user.id,
				points: userPoints,
				level: this.#state.user.level,
			}
			this.#state.user = await this.#api.updateLevel(user)
			this.#profile.update(this.#state.user)
			this.#level.updateText(this.#state.user.level)
			this.#scene.setInitial()
		}
	}

	async #setGameProcess(delta) {
		if (this.#status !== GameStatus.START) {
			return
		}
		this.#person.update()
		this.#scene.deleteObstacle()
		this.#scene.update()
		this.#level.update(this.#speed)

		const obstacleList = this.#scene.obstacleList
		const sceneX = this.#scene.xPosition
		const rocket = this.#person.getRocket()
		const human = this.#person.getHuman()

		obstacleList.forEach(obstacle => {
			obstacle.update(human, sceneX)
			this.#setGameOver(rocket, human, obstacle.topBottom)
		})

		if (testForAABB(this.#person, this.#flour)) {
			this.#person.y = this.#person.prevPosition.y
			this.#person.jump()
		}

		if (testForAABB(this.#person, this.#roof)) {
			this.#person.y = this.#person.prevPosition.y
		}

		if (!obstacleList.length) {
			this.#completed = true
		}
	}

	async #setGameOver(rocket, human, topBottom) {
		const [top, bottom] = topBottom
		if (
			testForAABB(rocket, top) ||
			testForAABB(rocket, bottom) ||
			testForAABB(human, top) ||
			testForAABB(human, bottom)
		) {
			this.#person.setCrash()
			this.#status = GameStatus.END
			this.#dialog.update(DialogText.END)
			this.#changeLevel()
		}
	}

	async #changeLevel() {
		const points = this.#scoreBoard.getScore()
		if (points <= this.#state.user.points) {
			return
		}

		const user = {
			...this.#state.user,
			points: points,
			nickname: this.#personMenu.user.nickname,
		}

		this.#state.user = await this.#api.updateLevel(user)
		this.#profile.update(this.#state.user)
	}

	#play() {
		this.#status = GameStatus.START
		this.#dialog.startGame()
		this.#app.ticker.start()
	}

	pause() {
		if (this.#status === GameStatus.START && !this.#completed) {
			this.#dialog.update(DialogText.PAUSE)
			this.#status = GameStatus.PAUSE
			setTimeout(() => this.#app.ticker.stop(), 50)
		}
	}

	#start() {
		this.score = 0
		this.#scoreBoard.getScore(this.score)
		this.#person.y = PersonPositon.y
		this.#person.setFly()
		this.#dialog.startGame()
		this.#status = GameStatus.START
		this.#level.showLevelText()
	}

	#startAgain() {
		this.#setInitial()
		this.#start()
		this.#level.showLevelText()
	}
}
