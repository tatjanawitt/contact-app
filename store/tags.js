'use strict'
import { getData, deserializeTags } from '@/utils/store-utils'

export const state = () => ({
  tags: []
})

export const mutations = {
  SET_TAGS (state, tags) {
    state.tags = tags
  },
  CREATE_TAG (state, { tag }) {
    state.tags = state.tags.concat(tag)
  },
  UPDATE_TAG_NAME (state, { tag }) {
    const tagToUpdate = state.tags.find(t => t.id === tag.id)
    tagToUpdate.name = tag.name
  },
  DELETE_TAG (state, { tag }) {
    state.tags = state.tags.filter(t => t.id !== tag.id)
  },
  CONNECT_TAG_TO_CONTACT (state, { contact, tag }) {
    contact.tag_ids = contact.tag_ids.concat(tag.id.toString())
    tag.contact_ids = tag.contact_ids.concat(contact.id.toString())
  },
  DISCONNECT_TAG_FROM_CONTACT (state, { contact, tag }) {
    contact.tag_ids = contact.tag_ids.filter(tId => tId !== tag.id)
    tag.contact_ids = tag.contact_ids.filter(vId => vId !== contact.id)
  }
}

export const actions = {
  async loadAll ({ commit, dispatch }) {
    const { data: tags } = await getData('/tags', this.$axios)
    deserializeTags(tags)
    commit('SET_TAGS', tags.map(t => t.attributes))
  },
  connectTocontact ({ commit }, { contact, tag }) {
    this.$axios.post('/contact_tags', {
      contact_id: contact.id,
      tag_id: tag.id
    })
    commit('CONNECT_TAG_TO_CONTACT', { contact, tag })
  },
  disconnectTagFromContact ({ commit }, { contact, tag }) {
    this.$axios.post('contact_tags/delete', {
      contact_id: contact.id,
      tag_id: tag.id
    })
    commit('DISCONNECT_TAG_FROM_CONTACT', { contact, tag })
  },
  async create ({ commit }, { name }) {
    const response = await this.$axios.post('/tags', { name })
    const createdTag = response.data.data.attributes
    createdTag.id = response.data.data.id
    createdTag.contact_ids = []
    commit('CREATE_TAG', { tag: createdTag })
    return createdTag
  },
  async updateName ({ commit }, { tag }) {
    await this.$axios.put(`/tags/${tag.id}`, tag)
    commit('UPDATE_TAG_NAME', { tag })
  },
  delete ({ commit }, { tag }) {
    this.$axios.delete(`/tags/${tag.id}`)
    commit('DELETE_TAG', { tag })
  }
}

export const getters = {
  get: state => (id) => {
    return state.tags.find(t => t.id === id)
  }
}
