'use strict'

import Vue from 'vue'
import UIDGenerator from 'uid-generator'
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
  EDIT (state, newUser) {
    const cIndex = state.users.findIndex(u => u.id === newUser.id)
    Vue.set(state.users, cIndex, newUser)
  },
  ADD_CONTACT_TO_USER (state, { contactId, userId }) {
    const uIndex = state.users.findIndex(u => u.id === userId)
    const uToUpdate = state.users[uIndex]
    uToUpdate.contact_ids.push(contactId)
    Vue.set(state.users, uIndex, uToUpdate)
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
    user.token = new UIDGenerator().generateSync() // dummi for login
    user.admin = false
    const response = await this.$axios.post('/users', user)
    let savedUser = response.data.data
    savedUser = { id: savedUser.id, ...savedUser }
    deserializeUsers([savedUser])
    commit('ADD', savedUser.attributes)
    return savedUser.attributes
  },
  async edit ({ commit }, user) {
    const response = await this.$axios.put(`/users/${user.id}`, user)
    const newUser = response.data.data
    deserializeUsers([newUser])
    commit('EDIT', newUser.attributes)
    return newUser.attributes
  },
  async addContactToUser ({ commit, rootState }, { contactId, userId }) {
    const res = await this.$axios.patch(`/users/${userId}/contacts`, { contactId })
    if (res.status === 200 || res.status === 201) {
      commit('ADD_CONTACT_TO_USER', { contactId, userId })
    }
    return res
  }
}

export const getters = {
  get: state => (id) => {
    return state.users.find(u => u.id === id) || {}
  }
}
