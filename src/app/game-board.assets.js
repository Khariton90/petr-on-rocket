import { Assets, Spritesheet } from 'pixi.js'
// import first_1 from '../../assets/tilingsprites/second_1-1920.webp'
import first_2 from '../../assets/tilingsprites/second_2-1920.webp'
// import first_3 from '../../assets/tilingsprites/second_3-1920.webp'
// import first_4 from '../../assets/tilingsprites/second_4-1920.webp'
// import first_7 from '../../assets/tilingsprites/second_7-1920.webp'
import person from '../../assets/person/person-234.webp'
import boost from '../../assets/person/boost-234.webp'
import boom from '../../assets/person/boom-234.webp'
import obstacle from '../../assets/tilingsprites/obstacle-110.webp'
import coinJson from '../../assets/coins.json'
import image from '../../assets/coins.png'
import floorImage from '../../assets/tilingsprites/floor-40.webp'

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
		this.#level = await this.#loadAssets(
			first_2
			// first_3
			// first_4
			// first_7
		)
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
