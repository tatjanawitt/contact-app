'use strict'

import Vue from 'vue'
import { getData, deserializeContacts } from '@/utils/store-utils'

export const state = () => ({
  contacts: []
})

export const mutations = {
  SET (state, contacts) {
    state.contacts = contacts
  },
  ADD (state, contact) {
    const contacts = state.contacts.concat(contact)
    state.contacts = contacts
  },
  DELETE (state, contactId) {
    const contacts = state.contacts.filter(v => v.id !== contactId)
    state.contacts = contacts
  },
  EDIT (state, newContact) {
    const vIndex = state.contacts.findIndex(v => v.id === newContact.id)
    Vue.set(state.contacts, vIndex, newContact)
  },
  PATCH_RATING (state, newContact) {
    const vIndex = state.contacts.findIndex(v => v.id === newContact.id)
    Vue.set(state.contacts, vIndex, newContact)
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
  async patchRating ({ commit }, data) {
    const response = await this.$axios.patch(`/contacts/${data.id}/rating`, data.rating)
    console.log('response', response)
    const newContact = response.data.data
    deserializeContacts([newContact])
    commit('PATCH_RATING', newContact.attributes)
    return newContact.attribute
  }
}

export const getters = {
  get: state => (id) => {
    return state.contacts.find(v => v.id === id) || {}
  }
}
