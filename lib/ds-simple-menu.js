/**
 * Простой скрипт раскрытия и скрытия меню.
 *
 * @copyright 2017, Добро.сайт, http://добро.сайт/
 * @author Михаил Красильников <m.krasilnikov@dobro.site>
 *
 * @license http://opensource.org/licenses/MIT MIT
 */
;(function (factory) {
  // eslint-disable-next-line no-undef
  if (typeof define === 'function' && define.amd) {
    // AMD
    // eslint-disable-next-line no-undef
    define(['jquery'], factory)
  } else if (typeof exports === 'object') {
    // Node/CommonJS для Browserify
    module.exports = factory
  } else {
    // Используя глобальные переменные браузера
    // eslint-disable-next-line no-undef
    factory(jQuery)
  }
}(function ($) {
  'use strict'

  /**
   * Все созданные меню.
   */
  var menus = []

  /**
   * Создаёт новое меню.
   *
   * @param {jQuery} $menu Блок меню.
   * @param {Object} settings Настройки.
   */
  var Menu = function ($menu, settings) {
    /**
     * Объект меню.
     */
    var menu = {}

    /**
     * Кнопки меню
     */
    var $buttons

    /**
     * Закрывает меню.
     */
    menu.close = function () {
      if (!menu.isOpened()) {
        return
      }

      $menu.attr('aria-expanded', 'false')
      menu.$buttons.attr('aria-pressed', 'false')

      if (settings.disableBodyScroll) {
        $('body').css('overflow', '')
      }

      if (settings.onClose) {
        settings.onClose(menu)
      }
    }

    /**
     * Готовит меню к работе.
     */
    menu.init = function () {
      $buttons = settings.toggleButton instanceof $
        ? settings.toggleButton
        : $('#' + $menu.attr('aria-labelledby'))
      $buttons.attr('aria-haspopup', 'true')
      $buttons.click(function (event) {
        event.preventDefault()
        menu.toggle()
      })
    }

    /**
     * Возвращает true если меню открыто.
     *
     * @returns {Boolean}
     */
    menu.isOpened = function () {
      return $menu.attr('aria-expanded') === 'true'
    }

    /**
     * Открывает меню.
     */
    menu.open = function () {
      if (menu.isOpened()) {
        return
      }

      if (settings.scrollToTop) {
        $(document).scrollTop(0)
      }

      $buttons.attr('aria-pressed', 'true')
      $menu.attr('aria-expanded', 'true')

      if (settings.disableBodyScroll) {
        $('body').css('overflow', 'hidden')
      }

      if (settings.onOpen) {
        settings.onOpen(menu)
      }
    }

    /**
     * Переключает состояние меню.
     */
    menu.toggle = function () {
      if (menu.isOpened()) {
        menu.close()
      } else {
        menu.open()
      }

      if (settings.onToggle) {
        settings.onToggle(menu)
      }
    }

    return menu
  }

  /*
   * Закрываем открытые меню, если нажата клавиша Escape.
   */
  $(document).on('keypress', function (event) {
    var escape = (event.key === 'Escape' || event.keyCode === 27)

    if (escape) {
      menus.every(function (menu) {
        if (menu.isOpened()) {
          event.preventDefault()
          menu.close()
        }
      })
    }
  })

  $.fn.dsSimpleMenu = function (options) {
    return this.each(function () {
      var $this = $(this)
      if (!$this.data('ds-simple-menu')) {
        var menu = new Menu(
          $this,
          $.extend(
            [],
            $.fn.dsSimpleMenu.defaultSettings,
            options
          )
        )
        menu.init()
        $this.data('ds-simple-menu', menu)
        menus.push(menu)
      }
    })
  }

  $.fn.dsSimpleMenu.defaultSettings = {
    disableBodyScroll: false,
    onClose: null,
    onOpen: null,
    onToggle: null,
    scrollToTop: false,
    toggleButton: null
  }
  // eslint-disable-next-line no-undef
}))
