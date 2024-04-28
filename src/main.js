import '../style.css'
import { ApiServices } from './services/api-services.js'
import { App } from './app/app.js'
import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
gsap.registerPlugin(PixiPlugin)

const api = new ApiServices()
const app = new App(document.querySelector('.app'), api)
app.init()
