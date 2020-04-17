<template>
  <v-container>
    <UserAuthForm :button-text="$t('userInfo.register')"
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
        await this.$axios.post('/register', registrationInfo)
        await this.$store.dispatch('users/create', registrationInfo)
        await this.$auth.loginWith('local', {
          data: registrationInfo
        })
        this.$store.dispatch('snackbar/create', {
          text: this.$t('userInfo.regSuccess') + this.$auth.user.name
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'error',
          text: this.$t('userInfo.regError')
        })
      }
    }
  }
}
</script>
