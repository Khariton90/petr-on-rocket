import '../style.css'
import { ApiServices } from './services/api-services.js'
import { App } from './app/app.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
gsap.registerPlugin(PixiPlugin)

const api = new ApiServices()
const app = new App(document.querySelector('.app'), api)

const count = await api.getTotalCount()
const countText = document.querySelector('.count-text')
const preloader = document.querySelector('.preloader')
const footer = document.querySelector('.footer')
const burger = document.querySelector('.burger')
const dialog = document.querySelector('.dialog')

if (count) {
	countText.classList.add('visible')
	countText.textContent = `Кол-во пользователей: ${count} `
}

gsap.to(preloader, {
	display: 'none',
	duration: 3.5,
	onComplete: () => {
		app.init()
		footer.style.display = 'flex'
	},
})

const handleOpen = () => {
	dialog.showModal()
}

burger.addEventListener('click', handleOpen)
