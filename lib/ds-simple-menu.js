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
   * Меню, открытое в данный момент.
   */
  var activeMenu = null

  /**
   * Создаёт новое меню.
   *
   * @param {jQuery} $menu Блок меню.
   * @param {Object} options Опции.
   */
  var Menu = function ($menu, options) {
    /**
     * Объект меню.
     */
    var menu

    /**
     * Кнопки меню
     */
    var $buttons

    /**
     * Закрывает меню.
     */
    var close = function () {
      if (!isOpened()) {
        return
      }

      $menu.attr('aria-expanded', 'false')
      $buttons.attr('aria-pressed', 'false')

      if (options.disableBodyScroll) {
        $('body').css('overflow', '')
      }

      activeMenu = null

      options.onClose($menu)
    }

    /**
     * Готовит меню к работе.
     */
    var init = function () {
      $buttons = options.toggleButton instanceof $
        ? options.toggleButton
        : $('#' + $menu.attr('aria-labelledby'))
      $buttons.attr('aria-haspopup', 'true')
      $buttons.click(function (event) {
        event.preventDefault()
        toggle()
      })
    }

    /**
     * Возвращает true если меню открыто.
     *
     * @returns {Boolean}
     */
    var isOpened = function () {
      return $menu.attr('aria-expanded') === 'true'
    }

    /**
     * Открывает меню.
     */
    var open = function () {
      if (isOpened()) {
        return
      }

      if (activeMenu && activeMenu.isOpened()) {
        activeMenu.close()
      }

      if (options.scrollToTop) {
        $(document).scrollTop(0)
      }

      $buttons.attr('aria-pressed', 'true')
      $menu.attr('aria-expanded', 'true')

      activeMenu = menu

      if (options.disableBodyScroll) {
        $('body').css('overflow', 'hidden')
      }

      options.onOpen($menu)
    }

    /**
     * Переключает состояние меню.
     */
    var toggle = function () {
      if (isOpened()) {
        close()
      } else {
        open()
      }
    }

    menu = {
      close: close,
      isOpened: isOpened,
      init: init,
      open: open,
      toggle: toggle
    }

    return menu
  }

  /*
   * Закрываем открытые меню, если нажата клавиша Escape.
   */
  $(document).on('keypress', function (event) {
    if (activeMenu) {
      var escape = (event.key === 'Escape' || event.keyCode === 27)
      if (escape) {
        activeMenu.close()
      }
    }
  })

  /**
   * Регистрация в jQuery.
   */
  $.fn.dsSimpleMenu = function (options) {
    return this.each(function () {
      var $this = $(this)
      var menu = $this.data('ds-simple-menu')
      if (!menu) {
        menu = new Menu(
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
      } else if (typeof options === 'string') {
        menu[options].apply(menu, Array.prototype.slice.call(arguments, 1))
      }
    })
  }

  /**
   * Глобальные настройки.
   */
  $.fn.dsSimpleMenu.defaultSettings = {
    disableBodyScroll: false,
    onClose: function () {
    },
    onOpen: function () {
    },
    scrollToTop: false,
    toggleButton: null
  }
}))
