<template>
  <v-container>
    <div class="display-2 ma-4 d-flex justify-center">
      Login
    </div>
    <UserAuthForm button-text="Login"
                  icon-type="mdi-login-variant"
                  :submit-form="loginUser"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/user-auth-form'
export default {
  components: { UserAuthForm },
  methods: {
    async loginUser (loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo
        })
        this.$store.dispatch('snackbar/create', {
          text: `Dein Login war erfolgreich, ${this.$auth.user.name}`
        })
        this.$router.push('/birthdays')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'Das Login ging schief. Bitte versuche es nochmal.'
        })
      }
    }
  }
}
</script>
