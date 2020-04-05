<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm
      button-text="Register"
      icon-type="mdi-account-box-outline"
      :submit-form="registerUser"
      :has-name="true"
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
    async registerUser (registrationInfo) {
      try {
        await this.$axios.post('/users', registrationInfo)
        await this.$auth.loginWith('local', {
          data: registrationInfo
        })
        this.$store.dispatch('snackbar/create', {
          text: `Thanks for signing up, ${this.$auth.user.name}`
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'There was an issue signing up. Please try again.'
        })
      }
    }
  }
}
</script>
