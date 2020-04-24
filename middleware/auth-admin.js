/* eslint-disable import/no-named-as-default-member */
'use strict'
export default async ({ $auth, redirect, store }) => {
  const user = await $auth.user
  if (user && user.admin) {
  } else {
    store.dispatch('snackbar/create', {
      color: 'error',
      text: '!!! Administration Aeara !!! Du brauchst Admin-Rechte / You need admin rights !!!'
    })
    redirect('/')
  }
}
