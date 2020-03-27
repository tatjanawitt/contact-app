/* eslint-disable import/no-named-as-default-member */
'use strict'
import RSVP from 'rsvp'

export default async function ({ store }) {
  if (!store.state.isLoaded) {
    await RSVP.all([
      store.dispatch('contacts/loadAll'),
      store.dispatch('tags/loadAll')
    ])
    store.commit('FINISH_LOADING')
  }
}
