import '../style.css'
import { ApiServices } from './services/api-services.js'
import { App } from './app/app.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
gsap.registerPlugin(PixiPlugin)

const dialogOptions = document.querySelector('.dialog-options')
const form = document.querySelector('.dialog-form')

const api = new ApiServices()
const root = document.querySelector('.app')
const app = new App(root, api)
const preloader = document.querySelector('.preloader')

gsap.to(preloader, {
	display: 'none',
	duration: 3.5,
	onComplete: () => {
		app.init()
	},
})

window.addEventListener(
	'wheel',
	e => {
		if (e.ctrlKey) {
			e.preventDefault()
		}
	},
	{ passive: false }
)

const text = {
	1: 'Управление',
	2: 'Статистика',
	3: 'Магазин',
	4: 'Онлайн',
}

form.addEventListener('change', function (e) {
	dialogOptions.querySelector('.dialog-title').textContent =
		text[e.target.value]
})
