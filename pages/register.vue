<template>
  <v-container>
    <div class="display-2 ma-4 d-flex justify-center">
      Register
    </div>
    <UserAuthForm button-text="Register"
                  icon-type="mdi-account-box-outline"
                  :submit-form="registerUser"
                  :has-name="true"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/user-auth-form'
export default {
  components: { UserAuthForm },
  methods: {
    async registerUser (registrationInfo) {
      try {
        await this.$axios.post('/users', registrationInfo)
        await this.$auth.loginWith('local', {
          data: registrationInfo
        })
        this.$store.dispatch('snackbar/create', {
          text: `Deine Registrierung war erfolgreich, ${this.$auth.user.name}`
        })
        this.$router.push('/birthdays')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'Die Registrierung ging schief. Bitte versuche es nochmal.'
        })
      }
    }
  }
}
</script>
