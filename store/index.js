'use strict'

export const strict = true

export const state = () => ({
  isLoaded: false,
  locales: ['en', 'de'],
  locale: 'de'
})

export const mutations = {
  FINISH_LOADING (state) {
    state.isLoaded = true
  },
  RELOAD (state) {
    state.isLoaded = false
  },
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
