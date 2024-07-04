import { Assets, Spritesheet } from 'pixi.js'
import first_2 from '../../assets/tilingsprites/spb-neva-1920.avif'
// import first_7 from '../../assets/tilingsprites/second_7-1440.webp'
import person from '../../assets/person/person-234.avif'
import boost from '../../assets/person/boost-234.avif'
import boom from '../../assets/person/boom-234.avif'
import obstacle from '../../assets/tilingsprites/obstacle-55.avif'
import coinJson from '../../assets/coins.json'
import image from '../../assets/coins.png'
import floorImage from '../../assets/tilingsprites/floor-40.avif'

export class GameBoardAssets {
	#dialog = []
	#person = []
	#obstacle = []
	#level = []
	floor = []
	#spritesheet

	async init() {
		this.#spritesheet = new Spritesheet(await Assets.load(image), coinJson)
		await this.spritesheet.parse()
		this.#level = await this.#loadAssets(first_2)
		this.floor = await this.#loadAssets(floorImage)
		this.#person = await this.#loadAssets(person, boom, boost, obstacle)
		this.#dialog = await this.#loadAssets(person)
		this.#obstacle = await this.#loadAssets(obstacle)
	}

	get spritesheet() {
		return this.#spritesheet
	}

	get dialog() {
		return this.#dialog
	}

	get person() {
		return this.#person
	}

	get obstacle() {
		return this.#obstacle
	}

	get level1() {
		return this.#level
	}

	async #loadAssets(...images) {
		return await Promise.all(
			images.map(async image => await Assets.load(image))
		)
	}
}
