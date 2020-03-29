'use strict'

import Vue from 'vue'
import { getData, deserializeContacts } from '@/utils/store-utils'

export const state = () => ({
  contacts: []
})

export const mutations = {
  SET (state, contacts) {
    contacts.sort((a, b) => b.rating - a.rating)
    state.contacts = contacts
  },
  ADD (state, contact) {
    const contacts = state.contacts.concat(contact)
    state.contacts = contacts
  },
  DELETE (state, contactId) {
    const contacts = state.contacts.filter(c => c.id !== contactId)
    state.contacts = contacts
  },
  EDIT (state, newContact) {
    const cIndex = state.contacts.findIndex(c => c.id === newContact.id)
    Vue.set(state.contacts, cIndex, newContact)
  },
  PATCH_RATING (state, { id, rating }) {
    const cIndex = state.contacts.findIndex(c => c.id === id)
    const cToUpdate = state.contacts[cIndex]
    cToUpdate.rating = rating
    Vue.set(state.contacts, cIndex, cToUpdate)
  }
}

export const actions = {
  async loadAll ({ commit, dispatch }) {
    const { data: contacts } = await getData('/contacts', this.$axios)
    deserializeContacts(contacts)
    commit('SET', contacts.map(v => v.attributes))
  },
  async create ({ commit }, contact) {
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
  }
}
