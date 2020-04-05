<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm
      button-text="Login"
      icon-type="mdi-login-variant"
      :submit-form="loginUser"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/user-auth-form'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser (loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo
        })
        this.$store.dispatch('snackbar/create', {
          text: `Thanks for signing in, ${this.$auth.user.name}`
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'There was an issue signing in. Please try again.'
        })
      }
    }
  }
}
</script>
