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
     * Готовит меню к работе.
     */
    var init = function () {
      if (!(settings.toggleButton instanceof $)) {
        settings.toggleButton = $('#' + $menu.attr('aria-labelledby'))
      }
      settings.toggleButton.attr('aria-haspopup', 'true')
    }

    /**
     * Открывает меню.
     */
    var open = function () {
      if (isOpened()) {
        return
      }

      if (settings.scrollToTop) {
        $(document).scrollTop(0)
      }

      settings.toggleButton.attr('aria-pressed', 'true')
      $menu.attr('aria-expanded', 'true')

      if (settings.disableBodyScroll) {
        $('body').css('overflow', '')
      }
    }

    /**
     * Закрывает меню.
     */
    var close = function () {
      if (!isOpened()) {
        return
      }

      $menu.attr('aria-expanded', 'false')
      settings.toggleButton.attr('aria-pressed', 'false')

      if (settings.disableBodyScroll) {
        $('body').css('overflow', 'hidden')
      }
    }

    /**
     * Возвращает true если меню открыто.
     *
     * @returns {Boolean}
     */
    var isOpened = function () {
      return $menu.attr('aria-expanded') === 'true'
    }

    /*
     * Открытие/скрытие меню по нажатию на кнопку.
     */
    settings.toggleButton.click(
      /**
       * Открывает или закрывает меню.
       *
       * @param {MouseEvent} event
       */
      function (event) {
        event.preventDefault()
        if (isOpened()) {
          close()
        } else {
          open()
        }
      }
    )

    return {
      init: init,
      open: open,
      close: close,
      isOpened: isOpened
    }
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
    scrollToTop: true,
    toggleButton: null
  }
// eslint-disable-next-line no-undef
}))
