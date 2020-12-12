### Launching
development mode: `npm run start`

production mode: `npm run build`

File to run: `index.html/main.html`

Runs on: `http://localhost:3000/`

### Project description
_Implementation of operations to work with the database, but without writing a backend, CRUD - operations, as a backend used
`firebase` services. The essence is to record the login, password and resource where the registration took place for further storage.
Implemented creation of a new record, its editing and deletion._

##### Resources used
* _Pure JS_
* _Firebase_
* _SCSS_
* _Webpack_

### File description
File name         | Contents
------------------|----------------------
`index.scss `     | The main style file, where the rest are collected, also records the main styles
`modal.scss`      | Styles for a modal window
`vars.scss `      | Vars for scss
`mixin.scss`      | Additional functionality
`app.js`          | The main JS in which additional modules gather
`content.js`      | Functionality for working with mapping and certain manipulations
`modal.js`        | To work with modal windows
`firebase.module.js` | Operations with `firebase/database` 
`utils.js` | Auxiliary functionality
`password.js`| 
`auth.js`| authorization and authentication
`index.html`| Page for the main content of the logged in user
`main.html`| Home page for login and review

### Запуск 
development mode: `npm run start`

production mode: `npm run build`

Файл для запуску `index.html/main.html`

Працює: `http://localhost:3000/`

### Опис проекту
_Реалізація операцій для роботи з базою даних, але без написання бекенду, CRUD - операції, в якості бекенду використано 
сервіси `firebase`. Суть полягає у записі логіна, паролю та ресурса, де відбулась реєстрація для подальшого зберігання.
Реалізовано створення нового запису, його редагування та видалення._ 

##### Використані ресурси 
* _Pure JS_
* _Firebase_
* _SCSS_
* _Webpack_

### Опис файлів
Назва файлу     | Вміст
----------------|----------------------
`index.scss `     | Головний файл стилів, куди збираються решта, також записані основні стилі 
`modal.scss`      | Стилі для модального вікна
`vars.scss `      | Змінні 
`mixin.scss`      | Додатковий функціонал
`fonts.scss`      | Шрифти
`app.js`          | Головний JS в який збираються додаткові модулі
`content.js`      | Функціонал для роботи з відображенням та певними маніпуляціями
`modal.js`        | Для роботи з модальними вікнами
`firebase.module.js` | Операції з `firebase/database` 
`utils.js` | Допоміний функціонал
`password.js`| 
`auth.js`| Для обробки авторизації та аутентифікації
`index.html`| Сторінка для основного контенту залогіненого користувача
`main.html`| Головна сторінка для входу та ознайомлення

