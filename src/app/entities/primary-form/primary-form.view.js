import { FormEnum } from '../../app.constants'

const createLoginFormTemplate = () => `<form class="form"  autocomplete="off">
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
					<label for="login-remember">
						<input type="checkbox" name="remember" id="login-remember" />
						Запомнить меня
					</label>
				</fieldset>

				<a href="/sign-up" data-link="register" class="register-link form-link">Создать аккаунт</a>
			</form>`

const createRegisterFormTemplate = () => `
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
			</form>`

const createProfileForm = (data, statistic) => {
	const list = statistic.length
		? `${statistic
				.map(
					item => `<li class="list-item">
								<div class="list-item__body">
									<span class="list-item__username">${item.nickname}</span>
									<span class="list-item__level">${item.level}</span>
									<span class="list-item__score">${item.points}</span>
								</div>
							</li>`
				)
				.join(' ')}`
		: []

	return `
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
							<h2 class="">${data.nickname}</h2>
							<h2 class="form-id">ID: ${data.id}</h2>
						</div>
						<label>
							Уровень
							<input
								class="field username-field"
								type="text"
								name="nickname"
								placeholder=""
								readonly
                                disabled="${!data.level}"
								value="${data.level ? data.level : ''}"
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
                                 disabled="${!data.points}"
								value="${data.points ? data.points : ''}"
							/>
						</label>
						<button class="button">${
							data.points ? 'Продолжить игру!' : 'Начать игру!'
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
			</form>`
}

export class PrimaryFormView {
	#statistic = []
	#state = {
		[FormEnum.LOGIN]: data => createLoginFormTemplate(data),
		[FormEnum.PROFILE]: data => createProfileForm(data, this.#statistic),
		[FormEnum.REGISTER]: data => createRegisterFormTemplate(data),
		[FormEnum.LOGOUT]: data => createLoginFormTemplate(data),
	}
	constructor() {}

	setTemplate(value, data, statistic) {
		this.#statistic = statistic
		return this.#state[value](data)
	}
}
