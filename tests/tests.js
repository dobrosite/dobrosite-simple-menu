'use strict'

QUnit.module('Общие')

QUnit.test('Плагин подключается', function (assert) {
  assert.ok(
    typeof(jQuery.fn.dsSimpleMenu) === 'function',
    'Плагин должен быть зарегистрирован в jQuery.'
  )
})

QUnit.test('Плагин поддерживает цепочки вызовов', function (assert) {
  var $fixture = $('#qunit-fixture')
  var $menu = $('.nav-main', $fixture)

  assert.strictEqual(
    $menu.dsSimpleMenu(),
    $menu,
    'Плагин не зарегистрирован в jQuery.'
  )
})

QUnit.module('Взаимодействие с пользователем')

QUnit.test('При нажатии на кнопку видимость меню меняется', function (assert) {
  var $fixture = $('#qunit-fixture')
  var $menu = $('.nav-main-1', $fixture)
  var $button = $('#nav-main-button-1', $fixture)

  $menu.dsSimpleMenu()

  assert.notEqual(
    $menu.attr('aria-expanded'),
    'true',
    'Изначально меню должно быть скрыто.'
  )

  $button.trigger('click')

  assert.equal(
    $menu.attr('aria-expanded'),
    'true',
    'После нажатия на кнопку меню должно быть видимо.'
  )

  $button.trigger('click')

  assert.notEqual(
    $menu.attr('aria-expanded'),
    'true',
    'После повторного нажатия на кнопку меню должно быть скрыто.'
  )
})

QUnit.test('При показе меню, другие меню должны скрываться', function (assert) {
  var $fixture = $('#qunit-fixture')
  var $menu1 = $('.nav-main-1', $fixture)
  var $menu2 = $('.nav-main-2', $fixture)
  var $button1 = $('#nav-main-button-1', $fixture)
  var $button2 = $('#nav-main-button-2', $fixture)

  $menu1.dsSimpleMenu()
  $menu2.dsSimpleMenu()

  assert.notEqual(
    $menu1.attr('aria-expanded'),
    'true',
    'Изначально меню 1 должно быть скрыто.'
  )

  assert.notEqual(
    $menu2.attr('aria-expanded'),
    'true',
    'Изначально меню 2 должно быть скрыто.'
  )

  $button1.trigger('click')

  assert.equal(
    $menu1.attr('aria-expanded'),
    'true',
    'После нажатия на кнопку 1 меню 1 должно быть видимо.'
  )

  $button2.trigger('click')

  assert.notEqual(
    $menu1.attr('aria-expanded'),
    'true',
    'После нажатия на кнопку 2 меню 1 должно быть скрыто.'
  )
})

QUnit.module('API')

QUnit.test('При вызове метода .open() меню показывается', function (assert) {
  var $fixture = $('#qunit-fixture')
  var $menu = $('.nav-main-1', $fixture)

  $menu.dsSimpleMenu()
  $menu.dsSimpleMenu('open')

  assert.equal(
    $menu.attr('aria-expanded'),
    'true',
    'После вызова .open() меню должно быть видимо.'
  )
})

QUnit.test('При вызове метода .close() меню скрывается', function (assert) {
  var $fixture = $('#qunit-fixture')
  var $menu = $('.nav-main-1', $fixture)
  var $button = $('#nav-main-button-1', $fixture)

  $menu.dsSimpleMenu()
  $button.trigger('click')

  assert.equal(
    $menu.attr('aria-expanded'),
    'true',
    'Изначально меню должно быть видимо.'
  )

  $menu.dsSimpleMenu('close')

  assert.notEqual(
    $menu.attr('aria-expanded'),
    'true',
    'После вызова .close() меню должно быть скрыто.'
  )
})

QUnit.test('При вызове метода .toggle() видимость меню должна переключаться', function (assert) {
  var $fixture = $('#qunit-fixture')
  var $menu = $('.nav-main-1', $fixture)

  $menu.dsSimpleMenu()

  $menu.dsSimpleMenu('toggle')

  assert.equal(
    $menu.attr('aria-expanded'),
    'true',
    'После первого вызова .toggle() меню должно быть видимо.'
  )

  $menu.dsSimpleMenu('toggle')

  assert.notEqual(
    $menu.attr('aria-expanded'),
    'true',
    'После второго вызова .toggle() меню должно быть скрыто.'
  )
})
