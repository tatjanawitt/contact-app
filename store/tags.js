'use strict'

import Vue from 'vue'
import { getData, deserializeTags } from '@/utils/store-utils'

export const state = () => ({
  tags: []
})

export const mutations = {
  SET (state, tags) {
    state.tags = tags
  },
  CREATE (state, { tag }) {
    state.tags = state.tags.concat(tag)
  },
  UPDATE (state, { editTag }) {
    const tIndex = state.tags.findIndex(t => t.id === editTag.id)
    Vue.set(state.tags, tIndex, editTag)
  },
  DELETE (state, { tag }) {
    state.tags = state.tags.filter(t => t.id !== tag.id)
  },
  CONNECT_TO_CONTACT (state, { contact, tag }) {
    contact.tag_ids = contact.tag_ids.concat(tag.id.toString())
    tag.contact_ids = tag.contact_ids.concat(contact.id.toString())
  },
  DISCONNECT_FROM_CONTACT (state, { contact, tag }) {
    contact.tag_ids = contact.tag_ids.filter(tId => tId !== tag.id)
    tag.contact_ids = tag.contact_ids.filter(vId => vId !== contact.id)
  }
}

export const actions = {
  reset ({ commit }) {
    commit('SET', [])
  },
  async loadAll ({ commit, dispatch }) {
    const { data: tags } = await getData('/tags', this.$axios)
    deserializeTags(tags)
    commit('SET', tags.map(t => t.attributes))
  },
  connectToContact ({ commit }, { contact, tag }) {
    this.$axios.post('/contact_tags', {
      contact_id: contact.id,
      tag_id: tag.id
    })
    commit('CONNECT_TO_CONTACT', { contact, tag })
  },
  disconnectFromContact ({ commit }, { contact, tag }) {
    this.$axios.post('contact_tags/delete', {
      contact_id: contact.id,
      tag_id: tag.id
    })
    commit('DISCONNECT_FROM_CONTACT', { contact, tag })
  },
  async create ({ commit }, { name }) {
    const response = await this.$axios.post('/tags', { name })
    const createdTag = response.data.data.attributes
    createdTag.id = response.data.data.id
    createdTag.contact_ids = []
    commit('CREATE', { tag: createdTag })
    return createdTag
  },
  async update ({ commit }, { editTag }) {
    const response = await this.$axios.put(`/tags/${editTag.id}`, editTag)
    const updatedTag = response.data.data
    deserializeTags([updatedTag])
    commit('UPDATE', { editTag: updatedTag.attributes })
    return updatedTag.attributes
  },
  async delete ({ commit }, { tag }) {
    const response = await this.$axios.delete(`/tags/${tag.id}`)
    if (response.status === 200 || response.status === 204) {
      commit('DELETE', { tag })
    }
    return response
  }
}

export const getters = {
  get: state => (id) => {
    return state.tags.find(t => t.id === id)
  }
}
