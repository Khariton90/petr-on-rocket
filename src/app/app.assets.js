import { Assets, Spritesheet, Texture } from 'pixi.js'
import first_1 from '../../PNG/tilingsprites/second_1.png'
import first_2 from '../../PNG/tilingsprites/second_2.png'
import first_3 from '../../PNG/tilingsprites/second_3.png'
import first_4 from '../../PNG/tilingsprites/second_4.png'
import first_5 from '../../PNG/tilingsprites/second_5.png'
import first_6 from '../../PNG/tilingsprites/second_6.png'
import first_7 from '../../PNG/tilingsprites/second_7.png'
import preview from '../../images/petr_1.png'

import petr from '../../images/petr_1.png'
import boost from '../../images/petr.png'
import boom from '../../images/boom-250.png'

import obstacle from '../../PNG/zortch_unused2/tile233-110.png'
import coinJson from '../../assets/coins.json'
import image from '../../assets/coins.png'
import floorImage from '../../PNG/zortch_unused2/tile195-40.png'

export class AppAssets {
	#dialog = []
	#person = []
	#obstacle = []
	#level1 = []
	floor = []

	#spritesheet

	constructor() {}

	async init() {
		this.#spritesheet = new Spritesheet(await Assets.load(image), coinJson)

		await this.spritesheet.parse()

		this.#level1 = await this.#loadAssets(
			first_1,
			first_2,
			first_3,
			first_4,
			first_5,
			first_6,
			first_7
		)
		this.floor = await this.#loadAssets(floorImage)
		this.#person = await this.#loadAssets(petr, boom, boost, obstacle)
		this.#dialog = await this.#loadAssets(preview)
		this.#obstacle = await this.#loadAssets(obstacle)
	}

	// get floor() {
	// 	return this.#floor
	// }

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
		return this.#level1
	}

	async #loadAssets(...images) {
		return await Promise.all(
			images.map(async image => await Assets.load(image))
		)
	}
}
