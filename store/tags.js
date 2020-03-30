'use strict'
import { getData, deserializeTags } from '@/utils/store-utils'

export const state = () => ({
  tags: []
})

export const mutations = {
  SET (state, tags) {
    state.tags = tags
  },
  CREATE (state, { tag }) {
    state.tags = state.tags.push(tag)
  },
  UPDATE (state, { tag }) {
    const tagToUpdate = state.tags.find(t => t.id === tag.id)
    tagToUpdate.name = tag.name
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
  async update ({ commit }, { tag }) {
    await this.$axios.put(`/tags/${tag.id}`, tag)
    commit('UPDATE', { tag })
  },
  delete ({ commit }, { tag }) {
    this.$axios.delete(`/tags/${tag.id}`)
    commit('DELETE', { tag })
  }
}

export const getters = {
  get: state => (id) => {
    return state.tags.find(t => t.id === id)
  }
}
