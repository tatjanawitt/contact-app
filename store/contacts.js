'use strict'

import Vue from 'vue'
import { getData, deserializeContacts, sortByRatingDesk } from '@/utils/store-utils'

export const state = () => ({
  contacts: []
})

export const mutations = {
  SET (state, contacts) {
    if (this.$auth.login && this.$auth.user) {
      this.$auth.user.admin
        ? state.contacts = contacts
        : state.contacts = contacts.filter(c => c.user_id === this.$auth.user.id)
      sortByRatingDesk(state.contacts)
    }
  },
  ADD (state, contact) {
    state.contacts.push(contact)
    sortByRatingDesk(state.contacts)
  },
  DELETE (state, contactId) {
    state.contacts = state.contacts.filter(c => c.id !== contactId)
    sortByRatingDesk(state.contacts)
  },
  EDIT (state, newContact) {
    const cIndex = state.contacts.findIndex(c => c.id === newContact.id)
    Vue.set(state.contacts, cIndex, newContact)
    sortByRatingDesk(state.contacts)
  },
  PATCH_RATING (state, { id, rating }) {
    const cIndex = state.contacts.findIndex(c => c.id === id)
    const cToUpdate = state.contacts[cIndex]
    cToUpdate.rating = rating
    Vue.set(state.contacts, cIndex, cToUpdate)
    sortByRatingDesk(state.contacts)
  }
}

export const actions = {
  async loadAll ({ commit, dispatch }) {
    const { data: contacts } = await getData('/contacts', this.$axios)
    deserializeContacts(contacts)
    commit('SET', contacts.map(c => c.attributes))
  },
  async create ({ commit }, contact) {
    contact.user_id = this.$auth.user.id
    const response = await this.$axios.post('/contacts', contact)
    let savedContact = response.data.data
    savedContact = { id: savedContact.id, ...savedContact }
    deserializeContacts([savedContact])
    commit('ADD', savedContact.attributes)
    return savedContact.attributes
  },
  async delete ({ commit }, contact) {
    const response = await this.$axios.delete(`/contacts/${contact.id}`)
    if (response.status === 200 || response.status === 204) {
      commit('DELETE', contact.id)
    }
  },
  async edit ({ commit }, contact) {
    const response = await this.$axios.put(`/contacts/${contact.id}`, contact)
    const newContact = response.data.data
    deserializeContacts([newContact])
    commit('EDIT', newContact.attributes)
    return newContact.attributes
  },
  async patchNewRating ({ commit }, { id, rating }) {
    const response = await this.$axios.patch(`/contacts/${id}/rating`, { rating })
    if (response.status === 200 || response.status === 201) {
      commit('PATCH_RATING', { id, rating })
    }
  }
}

export const getters = {
  get: state => (id) => {
    return state.contacts.find(c => c.id === id) || {}
  },
  getAge: (state, getters) => (id) => {
    const c = getters.get(id)
    let age = null
    if (c.born) {
      const ageDifMs = Date.now() - c.born.getTime()
      const ageDate = new Date(ageDifMs)
      age = Math.abs(ageDate.getUTCFullYear() - 1970)
    }
    return age
  },
  getBirthdayToday: (state, getters) => (id) => {
    const c = getters.get(id)
    return !c.born ? false : (
      c.born.getDate() === new Date().getDate() &&
      c.born.getMonth() === new Date().getMonth()
    )
  },
  getFullName: (state, getters) => (id) => {
    const c = getters.get(id)
    return `${c.fName} ${c.lName}`
  },
  getAddress: (state, getters) => (id) => {
    const c = getters.get(id)
    return `${c.street || ''} ${c.street ? ',' : ''} ${c.zip || ''} ${c.place || ''}` || ''
  },
  getDateFormat: (state, getters) => (id, lang = 'de') => {
    const c = getters.get(id)
    const format = lang === 'en' ? 'en-EN' : 'de-DE'
    return !c.born ? '' : (
      c.born.toLocaleDateString(format, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    )
  },
  getImgagePlaceholder: state => () => {
    return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461__340.png'
  }
}
