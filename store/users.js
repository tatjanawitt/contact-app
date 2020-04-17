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
  ADD (state, user) {
    state.users.push(user)
  },
  DELETE (state, userId) {
    state.users = state.users.filter(u => u.id !== userId)
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
  async delete ({ commit }, user) {
    const response = await this.$axios.delete(`/users/${user.id}`)
    if (response.status === 200 || response.status === 204) {
      commit('DELETE', user.id)
    }
    return response
  },
  async create ({ commit }, user) {
    const response = await this.$axios.post('/users', user)
    let savedUser = response.data.data
    savedUser = { id: savedUser.id, ...savedUser }
    deserializeUsers([savedUser])
    commit('ADD', savedUser.attributes)
    return savedUser.attributes
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
