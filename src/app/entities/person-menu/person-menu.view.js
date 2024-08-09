import { getCutName } from '../../../utils'
import coin from '../../../../assets/p-coin.png'
import petrImage from '../../../../assets/person/person-234.avif'

const createOptionsTemplate = () => `
                <div class="dialog-options options">
					<h2 class="dialog-title">Управление</h2>
					<div class="options-keyboard">
						<div class="key">
							<div class="key-btn">A</div>
							<p class="key-title">Влево</p>
						</div>
						<div class="key">
							<div class="key-btn">D</div>
							<p class="key-title">Вправо</p>
						</div>
						<div class="key">
							<div class="key-btn">Пробел</div>
							<p class="key-title">Вверх</p>
						</div>

						<div class="key">
							<div class="key-btn enter">Enter</div>
							<p class="key-title">старт/пауза</p>
						</div>
					</div>
					<div class="options-keyboard">
						<div class="key">
							<div class="key-btn">&#9668;</div>
							<p class="key-title">Влево</p>
						</div>
						<div class="key">
							<div class="key-btn">&#9658;</div>
							<p class="key-title">Вправо</p>
						</div>
						<div class="key">
							<div class="key-btn">&#9650;</div>
							<p class="key-title">Вверх</p>
						</div>
					</div>
                </div>
`

const createStatisticTemplate = data => {
	const list = data.length
		? `${data
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

	const paginationCount = data.length > 4 ? Math.ceil(data.length / 4) : 0

	const pagination = () => {
		if (!paginationCount) {
			return ''
		}

		const items = []

		for (let i = 1; i < paginationCount; i++) {
			items.push(i)
		}

		return items
			.map(
				el => `<li class="pagination-item">
								<button type="button" class="pagination-btn">${el}</button>
							</li>`
			)
			.join(' ')
	}

	return `
					<h2 class="dialog-title">Статистика</h2>
                        <ol class="form-body__list list">
							${list}
						</ol>
`
}
// <div class='pagination'>
// 	<ul class='pagination-list'>${pagination()}</ul>
// </div>

const createStoreTemplate = data => {
	return `<h2 class="dialog-title">Магазин</h2>
					<div class="dialog-store store">
						<div class="store-list">
							<div class="store-item disabled">
								<svg
									class="store-card__lock"
									focusable="false"
									aria-hidden="true"
									viewBox="0 0 24 24"
									data-testid="LockResetIcon"
									tabindex="-1"
									title="LockReset"
								>
									<path
										d="M13 3c-4.97 0-9 4.03-9 9H1l4 4 4-4H6c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99L6.7 18.42C8.32 20.01 10.55 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m2 8v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1z"
									></path>
								</svg>
								<div class="store-card">
									<img
										class="store-card__image"
										src=${petrImage}
										alt="rocket"
									/>
								</div>
								<button type="button" disabled class="store-btn">
									<img src=${coin} alt="coin" />
									<span>~</span>
								</button>
							</div>
							<div class="store-item disabled">
								<svg
									class="store-card__lock"
									focusable="false"
									aria-hidden="true"
									viewBox="0 0 24 24"
									data-testid="LockResetIcon"
									tabindex="-1"
									title="LockReset"
								>
									<path
										d="M13 3c-4.97 0-9 4.03-9 9H1l4 4 4-4H6c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99L6.7 18.42C8.32 20.01 10.55 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m2 8v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1z"
									></path>
								</svg>
								<div class="store-card">
									<img
										class="store-card__image"
										src=${petrImage}
										alt="rocket"
									/>
								</div>
								<button type="button" disabled class="store-btn">
									<img
										class="store-card__image"
										src=${coin}
										alt="coin"
									/>
									<span>~</span>
								</button>
							</div>
							<div class="store-item disabled">
								<svg
									class="store-card__lock"
									focusable="false"
									aria-hidden="true"
									viewBox="0 0 24 24"
									data-testid="LockResetIcon"
									tabindex="-1"
									title="LockReset"
								>
									<path
										d="M13 3c-4.97 0-9 4.03-9 9H1l4 4 4-4H6c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99L6.7 18.42C8.32 20.01 10.55 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m2 8v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1z"
									></path>
								</svg>
								<div class="store-card">
									<img
										class="store-card__image"
										src=${petrImage}
										alt="rocket"
									/>
								</div>
								<button type="button" disabled class="store-btn">
									<img
										class="store-card__image"
										src=${coin}
										alt="coin"
									/>
									<span>~</span>
								</button>
							</div>
							<div class="store-item disabled">
								<svg
									class="store-card__lock"
									focusable="false"
									aria-hidden="true"
									viewBox="0 0 24 24"
									data-testid="LockResetIcon"
									tabindex="-1"
									title="LockReset"
								>
									<path
										d="M13 3c-4.97 0-9 4.03-9 9H1l4 4 4-4H6c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99L6.7 18.42C8.32 20.01 10.55 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m2 8v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1z"
									></path>
								</svg>
								<div class="store-card">
									<img
										class="store-card__image"
										src=${petrImage}
										alt="rocket"
									/>
								</div>
								<button type="button" disabled class="store-btn">
									<img src=${coin} alt="coin" />
									<span>~</span>
								</button>
							</div>
						</div>

						<div class="store-balance">
							<img src=${coin} alt="coin" />
							<span>~</span>
						</div>
					</div>`
}

const createProfileTemplate = data => {
	return `<h2 class="dialog-title">Профиль</h2>
				<ul class="profile-list">
					<li class="profile-item">
						<b>ID:</b> <span>${data.id}</span>
					</li>
					<li class="profile-item">
						<label for="profile-username-field">
							<b>Имя игрока:</b>
							<span title="Изменить" class="profile-username">${data.nickname}</span>
							<input
								autocomplete="off"
								id="profile-username-field"
								class="visually-hidden profile-username-field"
								type="text"
							/>
						</label>
						<button
							class="visually-hidden profile-username-btn"
							type="button"
						>
						Сохранить
					</button>
				</li>
				<li class="profile-item profile__level"><b>Уровень:</b>${data.level}</li>
				<li class="profile-item profile__points"><b>Очков:</b>${data.points}</li>
			</ul>
`
}

export class PersonMenuView {
	#content = null

	#state = {
		1: createOptionsTemplate(),
		2: data => createStatisticTemplate(data),
		3: createStoreTemplate(),
		4: data => createProfileTemplate(data),
	}

	constructor(content) {
		this.#content = content
	}

	createTemplate(key, data) {
		if (this.#state.hasOwnProperty(key)) {
			this.#content.replaceChildren()
			if (!data) {
				this.#content.insertAdjacentHTML('afterbegin', this.#state[key])
				return
			}

			this.#content.insertAdjacentHTML('afterbegin', this.#state[key](data))
		}
	}
}
