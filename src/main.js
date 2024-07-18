import '../style.css'
import { ApiServices } from './services/api-services.js'
import { App } from './app/app.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import { PersonMenu } from './app/entities/person-menu/person-menu.js'
gsap.registerPlugin(PixiPlugin)

const dialogOptions = document.querySelector('.dialog-container')
const form = document.querySelector('.dialog-form')

const api = new ApiServices()
const root = document.querySelector('.app')
const app = new App(root, api)
const preloader = document.querySelector('.preloader')

const personMenu = new PersonMenu(form, dialogOptions, api)
personMenu.init()

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

// form.addEventListener('change', function (e) {
// 	dialogOptions.querySelector('.dialog-title').textContent =
// 		text[e.target.value]
// })
