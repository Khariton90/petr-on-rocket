import { getCutName } from '../../../utils'
import { FormEnum } from '../../app.constants'
import image from '../../../../assets/person/person-234.avif'

const createLoginFormTemplate = () => `<div class="content">
	<div class="content-block">
	<h1 class="content__title">Петя на ракете</h1>
	<form class="form"  autocomplete="off">
				<h2 class="form-title">Вход</h2>
				<fieldset>
					<label for="login-nickname">
						Имя игрока
						<input
							class="field username-field"
							type="text"
							name="nickname"
							required
							placeholder="Player"
                            id="login-nickname"
						/>
					</label>

					<label for="login-id">
						ID
						<input
							class="field username-field"
							type="text"
							name="id"
							required
							placeholder="#ID"
                            id="login-id"
						/>
					</label>

					<button class="button">Поехали!</button>

				</fieldset>

				<a href="/sign-up" data-link="register" class="register-link form-link">Создать аккаунт</a>
			</form>
			<h3 class="player-count"></h3>
	</div>
			<div class="primary-view">
				<div class="primary-view__image">
					<img src="${image}">
				</div>

					<p class="content__description">
					Игра «Петя на ракете» — это захватывающее приключение, где ваша цель — собирать монетки (Петкоины) и набирать очки. 
					Повышая уровень, вы будете открывать новые возможности и становиться сильнее.
					При этом состязаясь с другими игроками по количеству набранных очков.
				</p>
				<p class="content__description">
					В игре вас ждут разнообразные уровни, каждый из которых представляет собой уникальную головоломку или испытание. Вам придётся использовать логику, реакцию и умение быстро принимать решения, чтобы успешно пройти все уровни и собрать максимальное количество монеток.
				</p>
				<p class="content__description">
					По мере прохождения игры вы сможете улучшать своего персонажа, увеличивая его силу, ловкость и выносливость. Это позволит вам справляться с более сложными испытаниями и быстрее достигать новых уровней. 
					Также вы можете общаться с другими игроками в игровом чате.
				</p>
				<p class="content__description">
					«Петя на ракете» — это отличный способ провести время, развить свои навыки и просто насладиться увлекательным игровым процессом. Присоединяйтесь к десяткам игроков и начните своё путешествие по сбору монеток уже сегодня!
				</p>
			</div>
</div>`

const createRegisterFormTemplate = () => `
<div class="content">
		<div class="content-block">
			<h1 class="content__title">Петя на ракете</h1>
			<form class="form" autocomplete="off">
				<h2 class="form-title">Новый игрок</h2>
				<fieldset>
					<label for="signup-nickname">
						Имя игрока
						<input
							class="field username-field"
							type="text"
							name="nickname"
							required
							placeholder="Player"
                            id="signup-nickname"
						/>
					</label>
					<button class="button">Создать</button>
				</fieldset>
				<a href="/sign-in" data-link="login" class="login-link form-link">Перейти к логину</a>
			</form>
			<h3 class="player-count"></h3>
		</div>
		<div class="primary-view">
				<div class="primary-view__image">
						<img src="${image}">
				</div>
					<p class="content__description">
						Регистрация в игре позволит вам создать свой профиль и получить уникальный идентификатор. 
						Он понадобится для авторизации на других устройствах, чтобы вы могли продолжать играть, даже если смените компьютер.
				</p>
				<p class="content__description">
					При регистрации укажите ваше имя, которое станет вашим игровым никнеймом. Также вы можете настроить дополнительные параметры вашего профиля.
				</p>
				<p class="content__description">
					После завершения регистрации вы автоматически попадаете в меню профиля в котором отображается ваш никнейм и уникальный идентификатор. 
				</p>

				<p class="content__description">
					Вам откроется доступ к статистике десяти лучших пользователей. 
					Также вы получаете доступ к игровому чату для общения с другими игроками.
				</p>
			</div>
			</div>
			`

const createProfileForm = ({ user, stats }) => {
	const list = stats.length
		? `${stats
				.map(
					item => `<li class="list-item">
								<div class="list-item__body">
									<span class="list-item__username">${getCutName(item.nickname)}</span>
									<span class="list-item__level">${item.level}</span>
									<span class="list-item__score">${item.points}</span>
								</div>
							</li>`
				)
				.join(' ')}`
		: []

	return `
			<div class="content">
			<div class="content-block">
				<h1 class="content__title">Петя на ракете</h1>
				<form class="form profile-form" autocomplete="off">
					<fieldset class="form-tabs">
						<label for="profile">
							ПРОФИЛЬ
						<input
							type="radio"
							class="profile"
							name="form-tabs"
							id="profile"
							checked
						/>
					</label>
					<label for="stat">
						СТАТИСТИКА
						<input type="radio" class="stat" name="form-tabs" id="stat" />
					</label>
				</fieldset>

				<fieldset class="form-body">
					<div class="form-body__tab form-body__profile tab">
						<div class="tab-title form-profile">
							<h2 class="">${getCutName(user.nickname)}</h2>
							<h2 class="form-id">ID: ${user.id}</h2>
						</div>
						<label>
							Уровень
							<input
								class="field username-field"
								type="text"
								name="nickname"
								placeholder=""
								readonly
                                disabled="${!user.level}"
								value="${user.level ? user.level : ''}"
							/>
						</label>

						<label>
							Максимальное кол-во очков
							<input
								class="field username-field"
								type="text"
								name="nickname"
								placeholder=""
								readonly
                                 disabled="${!user.points}"
								value="${user.points ? user.points : ''}"
							/>
						</label>
						<button class="button">${
							user.points ? 'Продолжить игру!' : 'Начать игру!'
						}</button>
					</div>
					<div class="form-body__tab form-body__stat">
						<h2 class="tab-title form-title">10 Лучших</h2>
						<div class="form-body__title">
							<span>Уровень</span>
							<span>Очки</span>
						</div>

						<ol class="form-body__list list">
							${list}
						</ol>
					</div>
				</fieldset>

				<a href="/logout" data-link="logout" class="form-link">Выход</a>
			</form>
			<h3 class="player-count"></h3>
			</div>
		<div class="primary-view">
				<div class="primary-view__image">
						<img src="${image}">
				</div>

					<p class="content__description">
					Игра «Петя на ракете» — это захватывающее приключение, где ваша цель — собирать монетки (Петкоины) и набирать очки. 
					Повышая уровень, вы будете открывать новые возможности и становиться сильнее.
					При этом состязаясь с другими игроками по количеству набранных очков.
				</p>
				<p class="content__description">
					В игре вас ждут разнообразные уровни, каждый из которых представляет собой уникальную головоломку или испытание. Вам придётся использовать логику, реакцию и умение быстро принимать решения, чтобы успешно пройти все уровни и собрать максимальное количество монеток.
				</p>
				<p class="content__description">
					По мере прохождения игры вы сможете улучшать своего персонажа, увеличивая его силу, ловкость и выносливость. Это позволит вам справляться с более сложными испытаниями и быстрее достигать новых уровней. 
					Также вы можете общаться с другими игроками в игровом чате.
				</p>
				<p class="content__description">
					«Петя на ракете» — это отличный способ провести время, развить свои навыки и просто насладиться увлекательным игровым процессом. Присоединяйтесь к десяткам игроков и начните своё путешествие по сбору монеток уже сегодня!
				</p>
			</div>
			</div>
	`
}

export class PrimaryFormView {
	#state = {
		[FormEnum.LOGIN]: () => createLoginFormTemplate(),
		[FormEnum.PROFILE]: data => createProfileForm(data),
		[FormEnum.REGISTER]: () => createRegisterFormTemplate(),
		[FormEnum.LOGOUT]: () => createLoginFormTemplate(),
	}

	setTemplate(template, data) {
		return this.#state[template](data)
	}

	setCountText(count) {
		const footer = document.querySelector('.footer')
		const countText = document.querySelector('.count-text')
		const copyright = document.querySelector('.copyright')
		footer.classList.add('visible')
		countText.textContent = `Всего пользователей: ${count}`
		copyright.innerHTML =
			'<a href="https://github.com/Khariton90" target="_blank">© Разработал Харитонов Евгений</a>'
	}

	onOpenModal() {
		const dialog = document.querySelector('.dialog')
		dialog.showModal()
	}
}
