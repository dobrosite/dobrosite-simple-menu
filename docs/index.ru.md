# Установка

	npm install dobrosite-simple-menu

После чего подключите файл `node_modules/dobrosite-simple-menu/lib/ds-simple-menu.js` к своим
страницам.

# Использование

Разметка может быть любой, но должна включать в себя два блока:

1. само меню;
2. кнопку показа/скрытия меню.

Пример:

```html
<button id="nav-main-button">Меню</button>
<nav class="nav-main" aria-labelledby="nav-main-button">...</nav>
<script>
  $('.nav-main').dsSimpleMenu()
</script>
```
Обратите внимание на атрибут [aria-labelledby](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)
— он должен содержать идентификатор кнопки меню.

Если нет возможности задать атрибут `aria-labelledby`, можно указать кнопку в настройках:

```html
<button class="nav-button">Меню</button>
<nav class="nav-main">...</nav>
<script>
  $('.nav-main').dsSimpleMenu({toggleButton: $(',nav-button')})
</script>
```

# Что делает сценарий

При открытии меню:

1. элементу меню добавляется атрибут `aria-expanded="true"`;
2. кнопке меню добавляется атрибут `aria-pressed="true"`.

При закрытии меню эти атрибуты устанавливаются в `false`.
