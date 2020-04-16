'use strict'

// import Vue from 'vue'
import { getData, deserializeUsers } from '@/utils/store-utils'

export const state = () => ({
  users: []
})

export const mutations = {
  SET (state, users) {
    state.users = users
  },
  ADD_CONTACT_TO_USER (state, { contactId, user }) {
    const userContacts = user.contactIds.concat(contactId)
    user.contactIds = userContacts
  }
}

export const actions = {
  async loadAll ({ commit, dispatch }) {
    const { data: users } = await getData('/users', this.$axios)
    deserializeUsers(users)
    commit('SET', users.map(u => u.attributes))
  },
  addContactToUser ({ commit, rootState }, contactId) {
    if (rootState.auth.loggedIn) {
      commit('ADD_CONTACT_TO_USER', { contactId, user: rootState.auth.user })
      this.$axios.post('/contacts', { contactId })
    }
  }
}

export const getters = {
  usersContacts: (state, getters, rootState, rootGetters) => {
    const user = rootState.auth.user
    return user ? user.contactIds : []
  },
  contactToUser: (state, getters) => (contactId) => {
    return getters.usersContacts.includes(contactId)
  }
}
