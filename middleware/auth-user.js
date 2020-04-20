/* eslint-disable import/no-named-as-default-member */
'use strict'
import RSVP from 'rsvp'
export default async ({ $auth, redirect, store }) => {
  const user = await $auth.user
  if (user && user.admin) {
    if (!store.state.isLoaded) {
      await RSVP.all([
        store.dispatch('users/loadAll'),
        store.dispatch('contacts/loadAll'),
        store.dispatch('tags/loadAll')
      ])
      store.commit('FINISH_LOADING')
    }
  } else if (user) {
    if (!store.state.isLoaded) {
      await RSVP.all([
        store.dispatch('contacts/loadAll'),
        store.dispatch('tags/loadAll')
      ])
      store.commit('FINISH_LOADING')
    }
  } else {
    store.dispatch('snackbar/create', {
      color: 'error',
      text: 'Bitte melde Dich an / Please login !'
    })
    redirect('/')
  }
}
