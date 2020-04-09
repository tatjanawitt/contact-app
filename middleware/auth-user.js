'use strict'
export default async ({ $auth, redirect, store }) => {
  const user = await $auth.user
  if (user) {
    // let the user in
  } else {
    store.dispatch('snackbar/create', {
      color: 'error',
      text: 'Für diesen Bereich musst Du angemeldet sein.'
    })
    redirect('/')
  }
}
