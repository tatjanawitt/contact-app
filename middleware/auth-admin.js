export default async ({ $auth, redirect, store }) => {
  const user = await $auth.user
  if (user && user.admin) {
    // let the user in
  } else {
    store.dispatch('snackbar/create', {
      color: 'error',
      text: 'Für diesen Bereich werden Admin-Rechte benötigt.'
    })
    redirect('/')
  }
}
