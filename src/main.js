import '../style.css'
import { ApiServices } from './services/api-services.js'
import { App } from './app/app.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
gsap.registerPlugin(PixiPlugin)

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
